import React, { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import certificate_3rd from "../../../utilities/certificate_3rd";
import certificate_ISO from "../../../utilities/certificate_Iso";
import certificate_others from "../../../utilities/certificate_others";
import Image from "next/image";
import certificate_datas from "../../../utilities/certificate_data";
import ScoreDot from "../../../assets/scoredot.svg";

interface DataTableProps {
  certificates: any[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  certificates,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const [selectedCertificate, setselectedCertificate] = useState<any>(null);

  const handleCardClick = () => {
    setselectedCertificate(1);
  };

  const closePopup = () => {
    setselectedCertificate(null);
  };

  const getstatusbgcol = (status: string) => {
    if (status === "COMPLETED") {
      return "#E7FFFC";
    } else if (status === "NOT STARTED") {
      return "#FFFAE5";
    } else {
      return "#FFF6E9";
    }
  };

  const getstatuscol = (status: string) => {
    if (status === "COMPLETED") {
      return "#017C2E";
    } else if (status === "NOT STARTED") {
      return "#FF9951";
    } else {
      return "#E8B500";
    }
  };

  const getprioritybgcol = (priority: string) => {
    if (priority === "HIGH") {
      return "#FFE9EC";
    } else if (priority === "MEDIUM") {
      return "#FFFAE5";
    } else {
      return "#FFFAE5";
    }
  };

  const getprioritycol = (priority: string) => {
    if (priority === "HIGH") {
      return "#FF5151";
    } else if (priority === "MEDIUM") {
      return "#E8B500";
    } else {
      return "#E8B500";
    }
  };

  return (
    <div className={styles.Tablecontainer}>
      <div className={styles.Tablesubcontainer}>
        <div className={styles.dataTableContainer}>
          <table className={styles.dataTable}>
            <thead className={styles.theadUtility}>
              <tr>
                <th>Certificate Name</th>
                <th>Category</th>
                <th>Focus (ESG)</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Completion Date</th>
                <th>Renewal Due Date</th>
              </tr>
            </thead>
            <tbody>
              {certificates.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.noDataMessage}>
                    No certificates available
                  </td>
                </tr>
              ) : (
                certificates.map((item: any, index: any) => (
                  <tr key={index} className={styles.tableRows}>
                    <td className={styles.navigateLink}>
                      {item.certificateName ?? item.label}
                    </td>
                    <td className={styles.navigateLink}>{item.category}</td>
                    <td className={styles.navigateLink}>
                      {!item.E && !item.S && !item.G ? (
                        <p>Review Needed</p>
                      ) : (
                        <p>
                          E: {item.e_percentage || `${item.E}%` || "0%"}
                          <Image
                            src={ScoreDot}
                            width={6}
                            height={6}
                            alt="none"
                          />{" "}
                          S: {item.s_percentage || `${item.S}%` || "0%"}
                          <Image
                            src={ScoreDot}
                            width={6}
                            height={6}
                            alt="none"
                          />{" "}
                          G: {item.g_percentage || `${item.G}%` || "0%"}
                        </p>
                      )}
                    </td>
                    <td className={styles.navigateLink3}>
                      <span
                        style={{
                          background: getstatusbgcol(
                            item.status.toUpperCase()
                          ),
                          color: getstatuscol(item.status.toUpperCase()),
                          textTransform: "uppercase",
                        }}
                        className={styles.status}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className={styles.navigateLink3}>
                      <span
                        style={{
                          background: getprioritybgcol(
                            item.priority.toUpperCase()
                          ),
                          color: getprioritycol(item.priority.toUpperCase()),
                        }}
                        className={styles.status}
                      >
                        {item.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className={styles.navigateLink}>
                      {item.completion_date || "N/A"}
                    </td>
                    <td className={styles.navigateLink}>
                      {item.renewal_due_date || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {certificates.length > 0 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={styles.nextbtn}
          >
            NEXT PAGE <span>{">"}</span>
          </button>
        </div>
      )}
        </div>
      </div>

      {/* {certificates.length > 0 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={styles.nextbtn}
          >
            NEXT PAGE <span>{">"}</span>
          </button>
        </div>
      )} */}
    </div>
  );
};

export default DataTable;
