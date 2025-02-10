import React, { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import utility_section_data from "../../../../utilities/utility_section_data";
import Time from "../../../../assets/time.svg";
import Image from "next/image";

const PaymentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showallData, setshowallData] = useState(false);

  const itemsPerPage = 5;
  const filteredData = useMemo(() => {
    return utility_section_data.filter(
      (item:any) =>
        item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
            <th>#</th>
            <th>Date Initiated</th>
            <th>Date cleared</th>
            <th>Payment method</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item: any, index: any) => (
            <tr key={index} className={styles.tableRows}>
              <td className={styles.navigateLink}>
                {index+1}.
              </td>
              <td className={styles.navigateLink}>MM/DD/YYYY</td>
              <td className={styles.navigateLink}>MM/DD/YYYY</td>
              <td className={styles.navigateLink}>Credit Card</td>
              <td className={styles.navigateLink}>
               $9999.99
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {
        !showallData && <div className={styles.history} onClick={()=>{setshowallData(true)}}><Image src={Time} width={15} height={15} alt="none"/><p>VIEW ENTIRE HISTORY</p></div>
      }

      {
        showallData && 
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
      }
    </div>
  );
};

export default PaymentTable;
