// "use client";
// import React, { useState } from "react";
// import styles from "./styles.module.scss";
// import Scorecardmain from "./scorecard-main/Scorecardmain";
// import Scorecardmetrics from "./scorecard-metrics/Scorecardmetrics";
// import Scorecardarchieve from "./scorecard-archieve/Scorecardarchieve";
// import ESGScoreBars from "./scorecard-scrollbar/Scrollbar";
// import Image from "next/image";
// import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";

// const Scorecard = React.memo(() => {
//   const [companyName, setcompanyName] = useState("Apple");
//   const [companyLocation, setcompanyLocation] = useState("Germany");
//   const [overallScore, setoverallScore] = useState(60);
//   const [scorenavigateNumber, setscorenavigateNumber] = useState(1);

//   const scoreContentChange = (scoreNum: any) => {
//     setscorenavigateNumber(scoreNum);
//   };
//   const scores = [
//     {
//       label: "E",
//       percentage: 75,
//       color: "#4ADE80", // green
//     },
//     {
//       label: "S",
//       percentage: 30,
//       color: "#FB923C", // orange
//     },
//     {
//       label: "G",
//       percentage: 40,
//       color: "#3B82F6", // blue
//     },
//   ];

//   return (
//     <div className={styles.scorecard}>
//       <div className={styles.sectionHeader}>
//         <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
//         <p>
//           <span>/</span>Scorecard
//         </p>
//       </div>

//       <div className={styles.mytasksubHeader}>
//         <div className={styles.headerbox1}>
//           <h2>Scorecard</h2>
//           <p>Your Gateway to Sustainable Innovation and Global Change !</p>
//         </div>
//       </div>

//       <div className={styles.scorecardBody}>
//         {/* <h2>My Scorecard</h2> */}
//         <div className={styles.scorecardsubcontbar}>
//           <p
//             onClick={() => {
//               scoreContentChange(1);
//             }}
//             className={
//               scorenavigateNumber === 1
//                 ? styles.boldScoreSection
//                 : styles.normalScoreSection
//             }
//           >
//             Scorecard
//           </p>
//           <p
//             onClick={() => {
//               scoreContentChange(2);
//             }}
//             className={
//               scorenavigateNumber === 2
//                 ? styles.boldScoreSection
//                 : styles.normalScoreSection
//             }
//           >
//             Metrics
//           </p>
//           <p
//             onClick={() => {
//               scoreContentChange(3);
//             }}
//             className={
//               scorenavigateNumber === 3
//                 ? styles.boldScoreSection
//                 : styles.normalScoreSection
//             }
//           >
//             Archieve
//           </p>
//         </div>
//         <div className={styles.scorecardBodyContent}>
//           {scorenavigateNumber===1 && <Scorecardmain/>}
//           {scorenavigateNumber === 2 && <Scorecardmetrics />}
//           {scorenavigateNumber === 3 && <Scorecardarchieve />}
//         </div>
//       </div>
//     </div>
//   );
// });

// export default Scorecard;
"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Scorecardmain from "./scorecard-main/Scorecardmain";
import Scorecardmetrics from "./scorecard-metrics/Scorecardmetrics";
import Scorecardarchieve from "./scorecard-archieve/Scorecardarchieve";
import ESGScoreBars from "./scorecard-scrollbar/Scrollbar";
import Image from "next/image";
import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";

const Scorecard = React.memo(() => {
  const [companyName, setcompanyName] = useState("Apple");
  const [companyLocation, setcompanyLocation] = useState("Germany");
  const [overallScore, setoverallScore] = useState(60);
  const [scorenavigateNumber, setscorenavigateNumber] = useState(1);

  const scoreContentChange = (scoreNum: number) => {
    setscorenavigateNumber(scoreNum);
  };

  const scores = [
    {
      label: "E",
      percentage: 75,
      color: "#4ADE80", // green
    },
    {
      label: "S",
      percentage: 30,
      color: "#FB923C", // orange
    },
    {
      label: "G",
      percentage: 40,
      color: "#3B82F6", // blue
    },
  ];

  return (
    <div className={styles.scorecard}>
      <div className={styles.sectionHeader}>
        <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
        <p>
          <span>/</span>Scorecard
        </p>
      </div>

      <div className={styles.mytasksubHeader}>
        <div className={styles.headerbox1}>
          <h2>Scorecard</h2>
          <p>Your Gateway to Sustainable Innovation and Global Change !</p>
        </div>
      </div>

      <div className={styles.scorecardBody}>
        <div className={styles.scorecardsubcontbar}>
          <p
            onClick={() => scoreContentChange(1)}
            className={
              scorenavigateNumber === 1
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            Scorecard
          </p>
          <p
            onClick={() => scoreContentChange(2)}
            className={
              scorenavigateNumber === 2
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            Metrics
          </p>
          <p
            onClick={() => scoreContentChange(3)}
            className={
              scorenavigateNumber === 3
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            Archieve
          </p>
        </div>
        <div className={styles.scorecardBodyContent}>
          {scorenavigateNumber === 1 && <Scorecardmain />}
          {scorenavigateNumber === 2 && <Scorecardmetrics />}
          {scorenavigateNumber === 3 && <Scorecardarchieve />}
        </div>
      </div>
    </div>
  );
});

// Fix: Assign a display name to the memoized component
Scorecard.displayName = "Scorecard";

export default Scorecard;
