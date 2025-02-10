import React, { useMemo, useState } from "react";
import styles from "./styles.module.scss";

const Metrics_data = [
  {
    ScorecardName: "Old Score",
    eScore: "60",
    sScore: "40",
    gScore: "60",
    overallScore: "50",
  },
  {
    ScorecardName: "New Score",
    eScore: "90",
    sScore: "50",
    gScore: "40",
    overallScore: "80",
  },
];

interface MetricsDataProps {
  previous?: {
    eScore: any;
    sScore: any;
    gScore: any;
    overallScore: any;
  };
  current?: {
    eScore: any;
    sScore: any;
    gScore: any;
    overallScore: any;
  };
}

const Metricsdatatable: React.FC<MetricsDataProps> = ({
  previous,
  current,
}) => {
  const Metrics_data = [
    {
      ScorecardName: "Old Score",
      eScore: previous?.eScore || 0,
      sScore: previous?.sScore || 0,
      gScore: previous?.gScore || 0,
      overallScore: previous?.overallScore || 0,
    },
    {
      ScorecardName: "New Score",
      eScore: current?.eScore || 0,
      sScore: current?.sScore || 0,
      gScore: current?.gScore || 0,
      overallScore: current?.overallScore || 0,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const itemsPerPage = 10;

  const sortedData = useMemo(() => {
    if (!sortColumn) return Metrics_data;

    return [...Metrics_data].sort((a: any, b: any) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortColumn, sortDirection]);

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
        <div className={styles.dataTableHeader}>
          {/* <h3>Metrics Datasets</h3> */}
          <div></div>
        </div>
        <table className={styles.dataTable}>
          <thead className={styles.theadUtility}>
            <tr>
              <th>Scorecard Name</th>
              <th
                onClick={() => handleSort("publicationDate")}
                className={styles.sortable}
              >
                E-score{" "}
                {sortColumn === "publicationDate" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("validUntil")}
                className={styles.sortable}
              >
                S-score{" "}
                {sortColumn === "validUntil" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => handleSort("score")}
                className={styles.sortable}
              >
                G-score{" "}
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
            {paginatedData.map((item: any, index: any) => (
              <tr key={index} className={styles.tableRows}>
                <td>{item.ScorecardName}</td>
                <td>{Math.round(item.eScore)}</td>
                <td>{Math.round(item.sScore)}</td>
                <td>{Math.round(item.gScore)}</td>
                <td>{Math.round(item.overallScore)}</td>
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

export default Metricsdatatable;
