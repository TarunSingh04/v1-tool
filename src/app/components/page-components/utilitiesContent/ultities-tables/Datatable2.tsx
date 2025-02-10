import React, { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import linksTab from "../../../assets/linksbtn.svg";
import Image from "next/image";
import DataTableLogo from "../../../assets/dataTablelogo.svg";
import Dot from "../../../assets/dot.svg";
import { MdClose } from "react-icons/md";
import LinkPdfImg from "../../../assets/pdfImg.svg";
import country_data from "@/app/components/utilities/country_data";

interface DataTableProps {
  SelectedUtility: any;
  setSelectedUtility: React.Dispatch<React.SetStateAction<any>>;
  utility_section_data: any;
  searchQuery: string;
}

const DataTable2: React.FC<DataTableProps> = ({
  SelectedUtility,
  setSelectedUtility,
  utility_section_data,
  searchQuery,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const closePopup = () => {
    setSelectedUtility(null);
  };

  const handleCardClick = (utility: any) => {
    setSelectedUtility(utility);
    console.log(utility);
  };
  const itemsPerPage = 10;

  // Filter data based on search query
  const filteredData = useMemo(() => {
    return utility_section_data.filter(
      (item: any) =>
        item.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sector?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, utility_section_data]);

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

  const getCountryLabelByCode = (countryCode: string): string | null => {
    const country = country_data.find(
      (item: any) => item.value === countryCode
    );
    return country ? country.label : null; // Returns null if no match is found
  };

  const getbackgroundColor = (rating: any) => {
    if (rating === "A") {
      return "#6F8C60";
    } else if (rating === "B") {
      return "#A6C496";
    } else if (rating === "C") {
      return "#F1D02C";
    } else if (rating === "D") {
      return "#F18E2C";
    } else {
      return "#F25555";
    }
  };

  return (
    <div className={styles.dataTableContainer}>
      <table className={styles.dataTable}>
        <thead className={styles.theadUtility}>
          <tr>
            <th>Company Name</th>
            <th>Sector</th>
            <th>Country</th>
            <th
              onClick={() => handleSort("rating")}
              className={styles.sortable}
            >
              Score{" "}
              {sortColumn === "rating" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("revenues")}
              className={styles.sortable}
            >
              Website
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.length > 0 ? (
            paginatedData.map((item: any, index: any) => (
              <tr key={index} className={styles.tableRows}>
                <td className={styles.companyNameBolder}>
                  <Image
                    src={DataTableLogo}
                    width={40}
                    height={40}
                    alt="none"
                  />
                  <p onClick={() => handleCardClick(item)}>
                    {item.companyName}
                  </p>
                </td>
                <td className={styles.navigateLink}>{item.sector}</td>
                <td className={styles.navigateLink3}>
                  {getCountryLabelByCode(item.country)}
                </td>
                <td className={styles.navigateLink2}>
                  <p style={{ background: getbackgroundColor(item.rating) }}>
                    <span>{item.rating}</span>
                    <Image src={Dot} width={5} height={5} alt="none" />
                  </p>
                </td>
                <td className={styles.navigateLink}>
                  <a
                    href={item.websiteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.utilityTableLinks}
                  >
                    <p>impakter.com</p>
                    <Image src={linksTab} width={12} height={12} alt="none" />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr className={styles.noDataMessage}>
              <td colSpan={5} style={{padding:"20px",textAlign:"center",fontWeight:"500",fontSize:"16px"}}>
                No utilities available
              </td>
            </tr>
          )}
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
      {SelectedUtility && (
        <div className={styles.container}>
          <div className={styles.boxCont1}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose className={styles.closeIcon} onClick={closePopup} />
              </div>
              <h2 className={styles.title}>Company Details</h2>
              <p className={styles.description}>
                Please view the company details here below
              </p>
              <div className={styles.buttoncontpopup}>
                <div
                  className={styles.scoredisplay}
                  style={{
                    background: getbackgroundColor(SelectedUtility.rating),
                  }}
                >
                  <p>{SelectedUtility.rating}</p>
                  <Image src={Dot} width={5} height={5} alt="none" />
                </div>
              </div>
              <div className={styles.buttoncontpopup}>
                <p className={styles.companyNames}>
                  {SelectedUtility.companyName}
                </p>
              </div>
              <div className={styles.buttoncontpopup}>
                <p className={styles.companydescription}>
                  This is company&apos;s description This is company&apos;s
                  descriptionThis is company&apos;s descriptionThis is
                  company&apos;s descriptionThis is company&apos;s description
                </p>
              </div>

              <div className={styles.buttoncontpopup}>
                <div className={styles.certificateCont}>
                  <Image src={LinkPdfImg} width={48} height={48} alt="none" />
                  <div className={styles.certificateInfo}>
                    <p className={styles.certificateName}>Certificate name</p>
                    <span className={styles.certificateURL}>Website Url</span>
                  </div>
                </div>
              </div>

              <div className={styles.buttoncontpopup}>
                <a
                  href={SelectedUtility.websiteURL}
                  target="_blank"
                  className={styles.utilityTableLinks1}
                >
                  <p>Company link</p>
                  <Image src={linksTab} width={12} height={12} alt="none" />
                </a>
              </div>

              <div className={styles.buttoncontpopup}>
                <button className={styles.button1} onClick={closePopup}>
                  GO BACK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable2;
