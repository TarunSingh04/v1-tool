import React, { useState, useMemo, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import verifiedLogo from "../../../assets/Verified.svg";
import pendingLogo from "../../../assets/Pending.svg";
import verifiedLogo2 from "../../../assets/vv.svg";
import pendingLogo2 from "../../../assets/pp.svg";
import noteligibleLogo2 from "../../../assets/ne.svg";
import Dot from "../../../assets/scoredot.svg";
import LocationImg from "../../../assets/locationImg.svg";
import country_data from "@/app/components/utilities/country_data";

const Sustainabilitydatatable: React.FC<any> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [scoresData, setScoresData] = useState<any>();
  const badgeRef = useRef<HTMLDivElement>(null);

  const getLogo = (rating: any) => {
    if (rating === "A" || rating === "B") {
      return verifiedLogo2;
    } else if (rating === "C") {
      return pendingLogo2;
    } else {
      return noteligibleLogo2;
    }
  };

  const getRating = (overallScore: number) => {
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

  // const [Sustainability_data, setSustainability_data] = useState([
  //   {
  //     publicationDate: new Date().toLocaleDateString(), // Current date in dd/mm/yyyy format
  //     validUntil: new Date(
  //       new Date().setFullYear(new Date().getFullYear() + 1)
  //     ).toLocaleDateString(), // Current date + 1 year
  //     score: getRating(),
  //     overallScore: overallScore,
  //   },
  // ]);

  const itemsPerPage = 10;

  const sortedData = useMemo(() => {
    if (!sortColumn) return scoresData;

    return [...scoresData].sort((a: any, b: any) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [scoresData, sortColumn, sortDirection]);

  const paginatedData = useMemo(() => {
    return sortedData;
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok && data) {
        setCompanyName(data.onboarding.companyName);
        setCountry(data.onboarding.selectedCountry);
      } else {
        console.error(
          "Failed to fetch user data:",
          data?.error ?? "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

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

  return (
    <div className="Tablecontainer">
      <div className={styles.dataTableContainer}>
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
              {country_data.find((item) => item.value === country)?.label ||
                "Unknown"}
            </p>
          </div>
        </div>
        <table className={styles.dataTable}>
          <thead className={styles.theadUtility}>
            <tr>
              <th>Badge</th>
              <th
                onClick={() => handleSort("publicationDate")}
                className={styles.sortable}
              >
                Publication{" "}
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
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item: any, index: any) => {
              const publicationDate = new Date(
                item.calculated_at
              ).toLocaleDateString();
              const validUntilDate = new Date(item.calculated_at);
              validUntilDate.setFullYear(validUntilDate.getFullYear() + 1);
              const validUntil = validUntilDate.toLocaleDateString();

              return (
                <tr key={index} className={styles.tableRows}>
                  <td className={styles.parentContainer}>
                    <div className={styles.parentContainer} ref={badgeRef}>
                      <Image
                        src={getLogo(
                          item.onboarding_score
                            ? `${getRating(item.onboarding_score.toFixed(2))}`
                            : `${getRating(item.total_score.toFixed(2))}`
                        )}
                        width={120}
                        height={120}
                        alt="none"
                      />
                      {(item.onboarding_score
                        ? getRating(Number(item.onboarding_score.toFixed(2)))
                        : getRating(Number(item.total_score.toFixed(2)))) !==
                        "D" &&
                        (item.onboarding_score
                          ? getRating(Number(item.onboarding_score.toFixed(2)))
                          : getRating(Number(item.total_score.toFixed(2)))) !==
                          "F" && (
                          <div className={styles.childContainer2}>
                            {new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() + 1
                              )
                            )
                              .toLocaleString("en-US", {
                                month: "short",
                                year: "numeric",
                              })
                              .toUpperCase()}
                          </div>
                        )}
                    </div>

                    {(item.onboarding_score ?? item.total_score) > 74 && (
                      <div className={styles.childContainer}>
                        {new Date(
                          new Date().setFullYear(new Date().getFullYear() + 1)
                        )
                          .toLocaleString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                          .toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td>{publicationDate}</td>
                  <td>{validUntil}</td>
                  <td>
                    {item.onboarding_score
                      ? `${getRating(item.onboarding_score.toFixed(2))}`
                      : `${getRating(item.total_score.toFixed(2))}`}
                  </td>
                  <td>
                    {Math.ceil(item.onboarding_score ?? item.total_score)}%
                  </td>
                </tr>
              );
            })}
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

export default Sustainabilitydatatable;
