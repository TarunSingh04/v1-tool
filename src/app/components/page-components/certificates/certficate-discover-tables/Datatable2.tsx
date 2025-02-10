import React, { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import linksTab from "../../../assets/linksbtn.svg";
import Image from "next/image";
import DataTableLogo from "../../../assets/dataTablelogo.svg";

interface DataTable2Props {
  certificates: any;
}

const DataTable2: React.FC<DataTable2Props> = ({ certificates }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return certificates.slice(startIndex, startIndex + itemsPerPage);
  }, [certificates, currentPage]);

  const totalPages = Math.ceil(certificates.length / itemsPerPage);

  return (
    <div className={styles.dataTableContainer}>
      <table className={styles.dataTable}>
        <thead className={styles.theadUtility}>
          <tr>
            <th>Certificate Logo</th>
            <th>Certificate Name</th>
            <th style={{ paddingLeft: "50px" }}>Price</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {certificates.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.noDataMessage}>
                No certificates available
              </td>
            </tr>
          ) : (
            paginatedData.map((item: any, index: number) => (
              <tr key={index} className={styles.tableRows}>
                <td className={styles.navigateLink3}>
                  <Image
                    src={DataTableLogo}
                    width={40}
                    height={40}
                    alt="Certificate Logo"
                    style={{paddingLeft:"15px"}}
                  />
                </td>
                <td className={styles.navigateLink}>{item.Name}</td>
                <td className={styles.navigateLink2}>€{item.Price}</td>
                <td className={styles.navigateLink}>
                  <a
                    style={{ cursor: "pointer" }}
                    href={item.Website}
                    target="_blank"
                    className={styles.utilityTableLinks}
                    rel="noopener noreferrer"
                  >
                    <p>impakter.com</p>
                    <Image src={linksTab} width={12} height={12} alt="Link" />
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {certificates.length > 0 && (
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
      )}
    </div>
  );
};

export default DataTable2;
