"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Label } from "recharts";
import styles from "./styles.module.scss";
import { IoInformationCircleOutline } from "react-icons/io5";
import Gauge from "./score-gauge/ScoreGauge";
import { GoDotFill } from "react-icons/go";
import scorearrow from "../../../../assets/ScoreArrow.svg";
import Image from "next/image";

interface EsgScoreProps {
  percentage?: number;
}

const Esgscore: React.FC<EsgScoreProps> = ({ percentage }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State to control hover

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/score`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const data = await response.json();
        setCurrentPercentage(Math.round(data.onboarding_score));
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchScore();
  }, []);

  const getColor = () => {
    if (currentPercentage >= 90) {
      return "#6F8C60";
    } else if (currentPercentage >= 75) {
      return "#A6C496";
    } else if (currentPercentage >= 55) {
      return "#F1D02C";
    } else if (currentPercentage >= 25) {
      return "#F18E2C";
    } else {
      return "#F25555";
    }
  };

  const getRating = () => {
    if (currentPercentage >= 90) {
      return "a";
    } else if (currentPercentage >= 75) {
      return "b";
    } else if (currentPercentage >= 55) {
      return "c";
    } else if (currentPercentage >= 25) {
      return "d";
    } else {
      return "f";
    }
  };

  // useEffect(() => {
  //   let start = 0;
  //   const interval = setInterval(() => {
  //     setCurrentPercentage((prev) => {
  //       if (prev < currentPercentage) {
  //         return prev + 1;
  //       } else {
  //         clearInterval(interval);
  //         return prev;
  //       }
  //     });
  //   }, 15);
  // }, [percentage]);

  const data = [
    { name: "Progress", value: currentPercentage },
    { name: "Remaining", value: 100 - currentPercentage },
  ];

  return (
    <div className={styles.container}>
      {/* <h4>Overall Sustainability Score</h4>
      <div className={styles.subcontainer}>
        <div className={styles.progressRingWrapper}>
          <PieChart width={250} height={250}> */}
      {/* <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={110}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              dataKey="value"
              animationDuration={500}
              animationEasing="ease-out"
            >
              <Cell key="progress" fill={getColor()} />
              <Cell key="remaining" fill="#e6e6e6" />
            </Pie>
          </PieChart> */}

      {/* <div className={styles.percentageText}>
            <p>{getGrade()}</p>
            <p className={styles.percentageCovered}>{currentPercentage}%</p>
          </div>
        </div>

        <div className={styles.note}>
          <p>{getProductInfo()}</p>
        </div>
      </div> */}

      <p className={styles.cardheader}>Your initial score</p>
      <p className={styles.cardDescription}>
        Great job! You&apos;ve earned the <span>Sustainability Badge.</span>
      </p>
      <p className={styles.cardscore}>
        <span className={styles.coldotIcon} style={{ color: getColor() }}>
          <GoDotFill />
        </span>{" "}
        <span>Your score</span>
      </p>
      <Gauge value={currentPercentage} color={getColor()} label={getRating()} />
      <div className={styles.scordisplaycont}>
        <div className={styles.scoreoverall}>Overall Score</div>
        <div className={styles.scoreoverall}>
          <Image
            src={scorearrow}
            alt="none"
            width={18}
            height={18}
            className={styles.arrowIcon}
          />
          <p>
            <span>{currentPercentage}</span>/100
          </p>
        </div>
      </div>
    </div>
  );
};

export default Esgscore;
