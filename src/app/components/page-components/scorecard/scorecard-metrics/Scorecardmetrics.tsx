import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Barmetrics from "./bar-metrics/Barmetrics";
import Linemetrics from "./line-metrics/Linemetrics";
import Metricsdatatable from "./metrics-datatable/Metricsdatatable";
import LocationImg from "../../../assets/locationImg.svg";
import Dot from "../../../assets/scoredot.svg";
import Image from "next/image";
import country_data from "@/app/components/utilities/country_data";

const Scorecardmetrics = () => {
  const [companyName, setCompanyName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [currentData, setCurrentData] = useState<any>();
  const [previousData, setPreviousData] = useState<any>();

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

  useEffect(() => {
    const fetchScoreData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/scorecard`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const data = await response.json();
        setCurrentData(data.current);
        setPreviousData(data.previous);
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchScoreData();
  }, []);

  return (
    <div className={styles.Metrics}>
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
            {country_data.find((item) => item.value === countryCode)?.label ||
              "Unknown"}
          </p>
        </div>
      </div>
      <div className={styles.graphcont}>
        <div className={styles.graph}>
          <div className={styles.scorecardLabelcont}>
            <h2>Scorecard Comparison</h2>
            <div className={styles.subheader}>Overall Score</div>
            <div className={styles.scoregraph}>
              <div className={styles.submaingraph}>
                {currentData ? (
                  <Barmetrics
                    previousData={previousData || null} // Pass `null` if previousData is undefined
                    currentData={currentData}
                  />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.graph}>
          <div className={styles.scorecardLabelcont}>
            <h2>Scorecard Analytics</h2>
            <div className={styles.subheader}>Overall Score</div>
            <div className={styles.scoregraph}>
              <div className={styles.submaingraph}>
                {currentData ? (
                  <Linemetrics currentData={currentData} />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.DataCont}>
        <h2>Metric Cumulative Comparison</h2>
        <p className={styles.subtitle}>Metric Cumulative Comparison</p>
        <div className={styles.dataTablecont}>
          {currentData ? (
            <Metricsdatatable
              previous={{
                eScore: previousData?.mean_e_score ?? 0,
                sScore: previousData?.mean_s_score ?? 0,
                gScore: previousData?.mean_g_score ?? 0,
                overallScore: previousData?.onboarding_score ?? 0,
              }}
              current={{
                eScore:
                  currentData?.total_e_score ?? currentData?.mean_e_score ?? 0,
                sScore:
                  currentData?.total_s_score ?? currentData?.mean_s_score ?? 0,
                gScore:
                  currentData?.total_g_score ?? currentData?.mean_g_score ?? 0,
                overallScore:
                  currentData?.total_score ??
                  currentData?.onboarding_score ??
                  0,
              }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scorecardmetrics;
