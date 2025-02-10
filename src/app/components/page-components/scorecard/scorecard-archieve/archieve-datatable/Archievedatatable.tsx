import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Dot from "../../../../assets/scoredot.svg";
import searchIcon from "../../../../assets/searchIcon.svg";
import LocationImg from "../../../../assets/locationImg.svg";
import Download from "../../../../assets/downloadIcon.svg";
import country_data from "@/app/components/utilities/country_data";

const Archieve_data = [
  {
    ScorecardName: "Score1",
    publicationDate: "26/07/2024",
    validUntil: "26/07/2030",
    score: "C",
    overallScore: "60%",
  },
  {
    ScorecardName: "Score2",
    publicationDate: "29/20/2006",
    validUntil: "28/11/2010",
    score: "A",
    overallScore: "75%",
  },
];

const Archievedatatable = () => {
  const [companyName, setCompanyName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [scoresData, setScoresData] = useState<any>();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchScoreData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/all-scores`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const data = await response.json();
        setScoresData(data.scores);
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchScoreData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const data = await response.json();
        setCompanyName(data?.onboarding?.companyName);
        setCountryCode(data?.onboarding?.selectedCountry);
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchUser();
  }, []);

  // const filteredData = useMemo(() => {
  //   return Archieve_data.filter((item) =>
  //     item.ScorecardName.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }, [searchTerm]);

  const getRating = (overallScore: any) => {
    if (overallScore >= 90) {
      return "A";
    } else if (overallScore >= 75) {
      return "B";
    } else if (overallScore >= 55) {
      return "C";
    } else if (overallScore >= 25) {
      return "D";
    } else {
      return "F";
    }
  };

  // Prepare data for display
  const filteredData = useMemo(() => {
    if (!scoresData) return [];

    return scoresData
      .filter((item: any) =>
        item.type === "onboarding"
          ? "Onboarding Score".toLowerCase().includes(searchTerm.toLowerCase())
          : item.type === "total"
            ? `Score - ${item.calculated_at}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            : false
      )
      .map((item: any) => {
        const publicationDate = new Date(
          item.calculated_at
        ).toLocaleDateString();
        const validUntilDate = new Date(item.calculated_at);
        validUntilDate.setFullYear(validUntilDate.getFullYear() + 1);
        const validUntil = validUntilDate.toLocaleDateString();

        return {
          ScorecardName:
            item.type === "onboarding"
              ? "Onboarding Score"
              : `Score - ${publicationDate}`,
          publicationDate: publicationDate,
          validUntil: validUntil,
          overallScore: item.onboarding_score
            ? `${Math.ceil(item.onboarding_score)}`
            : `${Math.ceil(item.total_score)}`,
          score: item.onboarding_score
            ? `${getRating(item.onboarding_score.toFixed(2))}`
            : `${getRating(item.total_score.toFixed(2))}`,
        };
      });
  }, [scoresData, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a: any, b: any) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="Tablecontainer">
      <div className={styles.dataTableContainer}>
        <div className={styles.archieveheader}>
          <div className={styles.companyHeader}>
            <p>{companyName}</p>
            <Image
              src={Dot}
              width={6}
              height={6}
              alt="none"
              className={styles.dotIcon}
            />
            <div className={styles.Location}>
              <Image src={LocationImg} width={16} height={16} alt="none" />
              <p>
                {country_data.find((item) => item.value === countryCode)
                  ?.label || "Unknown"}
              </p>
            </div>
          </div>
          <div className={styles.searchbar}>
            <Image
              src={searchIcon}
              width={26}
              height={26}
              alt="none"
              className={styles.searchIcon}
            />
            <input type="text" placeholder="Search anything" />
          </div>
        </div>
        <table className={styles.dataTable}>
          <thead className={styles.theadUtility}>
            <tr>
              <th>Scorecard Name</th>
              <th
                onClick={() => handleSort("publicationDate")}
                className={styles.sortable}
              >
                Publication Date{" "}
                {sortColumn === "publicationDate" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("validUntil")}
                className={styles.sortable}
              >
                Valid Until{" "}
                {sortColumn === "validUntil" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("score")}
                className={styles.sortable}
              >
                Score{" "}
                {sortColumn === "score" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("overallScore")}
                className={styles.sortable}
              >
                Overall%{" "}
                {sortColumn === "overallScore" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: any, index: any) => (
              <tr key={index} className={styles.tableRows}>
                <td>{item.ScorecardName}</td>
                <td>{item.publicationDate}</td>
                <td>{item.validUntil}</td>
                <td>{item.score}</td>
                <td>{item.overallScore}</td>
                <td>
                  <button className={styles.downloadBtn}>
                    <Image
                      src={Download}
                      width={16}
                      height={16}
                      alt="none"
                      className={styles.downLoadIcon}
                    />{" "}
                    download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.prevbtn}
          >
            <span>{"<"}</span> PREVIOUS
          </button>
          <span className={styles.pageDisplay}>
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={styles.nextbtn}
          >
            NEXT PAGE <span>{">"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Archievedatatable;
