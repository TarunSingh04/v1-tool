"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import styles from "./styles.module.scss";
import EsgScorecard from "./esg-score-card/EsgScoreCard";
import Esgnews from "./esg-news/Esgnews";
import Taskmanger from "./task-manager/Taskmanger";
import Finance from "./finance/Finance";
import Esgscore from "./esg-score/Esgscore";
import Questionaire from "./questionaire/Questionaire";
import Certificate from "./certificate/Certificate";
import Ultilitysupplier from "./utilities-supplier/Ultilitysupplier";
import Marketplace from "./marketplace/Marketplace";
import AIassistant from "./ai-assistant/AIassistant";
import dashboardStatusStore from "../../../store/dashboarsStatusStore";
import Image from "next/image";
import sectionHeaderIcon from "../../../assets/sectionNameIcon.svg";
import AIBtn from "../../../assets/AiBtn.svg";
import DataIcon from "../../../assets/calendarIcon.svg";
import AIDotIcon from "../../../assets/AIBtndotIcon.svg";
import FreePack from "./free-pack/FreePack";
import ScoreAssest from "./score-assests/ScoreAssest";
import useDashboardStatusStore from "../../../store/dashboarsStatusStore";

const DashboardContent = () => {
  const [overallScore, setoverallScore] = useState(0);
  const [name, setName] = useState("");
  const [dashboardNavigateNum, setDashboardNavigateNum] = useState(1);

  const { dashboardStatus, fetchSubscriptionPlan, updateSubscriptionPlan } =
    useDashboardStatusStore();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json();
  
      if (response.ok && data) {
        console.log(data)
        setName(data.name);
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

  // Fetch data when component loads
  useEffect(() => {
    fetchUserData();
    fetchSubscriptionPlan();
  }, []);

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
        setoverallScore(Math.round(data.onboarding_score));
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchScore();
  }, []);

  // Access Zustand state and action separately
  // const dashboardStatus = dashboardStatusStore(
  //   (state) => state.dashboardStatus
  // );
  // const setDashboardStatus = dashboardStatusStore(
  //   (state) => state.setDashboardStatus
  // );

  const dashboardContentChange = (scoreNum: any) => {
    setDashboardNavigateNum(scoreNum);
  };

  const getStatusColor = (status: any) => {
    if (status === "Free" || status === "Basic") {
      return "#E8B500";
    } else {
      return "#1492EF";
    }
  };
  const getBackgroundStatusColor = (status: any) => {
    if (status === "Free" || status === "Basic") {
      return "#FFFAE5";
    } else {
      return "#EBF2FF";
    }
  };

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.sectionHeader}>
        <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
        <p>
          <span>/</span>Dashboard
        </p>
      </div>
      <div
        className={
          dashboardStatus === "Free"
            ? styles.sectionsubHeader
            : styles.sectionsubHeader2
        }
      >
        <div className={styles.leftsubcont}>
          <div className={styles.leftsubbox}>
            <p>
              Welcome, <span>{name}</span> 👋{" "}
            </p>
            <div className={styles.datecont}>
              <div className={styles.dateIconcont}>
                <Image
                  src={DataIcon}
                  width={18}
                  height={18}
                  alt="none"
                  className={styles.dateIcon}
                />
              </div>
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div
              className={styles.dashboardStatus}
              style={{
                color: getStatusColor("Free"),
                background: getBackgroundStatusColor("Free"),
              }}
            >
              {dashboardStatus} Account
            </div>
          </div>
          <span>
            AI powered ESG software, that saves the hundreds of Euros in CSRD
            reporting.
          </span>
        </div>
      </div>
      {dashboardStatus === "Free" && (
        <div className={styles.FreeCont}>
          <FreePack />
        </div>
      )}
      {dashboardStatus !== "Free" && (
        <div className={styles.scorecardBody}>
          <div className={styles.scorecardsubcontbar}>
            <p
              onClick={() => dashboardContentChange(1)}
              className={
                dashboardNavigateNum === 1
                  ? styles.boldScoreSection
                  : styles.normalScoreSection
              }
            >
              overview
            </p>
            <p
              onClick={() => dashboardContentChange(2)}
              className={
                dashboardNavigateNum === 2
                  ? styles.boldScoreSection
                  : styles.normalScoreSection
              }
            >
              Actions
            </p>
            <p
              onClick={() => dashboardContentChange(3)}
              className={
                dashboardNavigateNum === 3
                  ? styles.boldScoreSection
                  : styles.normalScoreSection
              }
            >
              Marketplace
            </p>
          </div>
          <div className={styles.scorecardBodyContent}>
            {dashboardNavigateNum === 1 && (
              <div className={styles.DashboardBoxcont}>
                <div className={styles.DashboardBox1}>
                  <Esgscore percentage={60} />
                  <Questionaire />
                </div>
                <div className={styles.DashboardBox1}>
                  <EsgScorecard />
                  <ScoreAssest />
                </div>
                {dashboardStatus === "Standard" && (
                  <div className={styles.DashboardBox1}>
                    <Esgnews />
                  </div>
                )}
              </div>
            )}
            {dashboardNavigateNum === 2 && (
              <div className={styles.DashboardBoxcont}>
                <div className={styles.DashboardBox2}>
                  <Taskmanger />
                  <Certificate />
                </div>
                <div className={styles.DashboardBox2}>
                  {/* <Finance /> */}
                  <Ultilitysupplier />
                </div>
              </div>
            )}
            {dashboardNavigateNum === 3 && <Marketplace />}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
