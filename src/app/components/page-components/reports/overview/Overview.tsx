"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import LocationImg from "../../../assets/locationImg.svg";
import Dot from "../../../assets/scoredot.svg";
import Image from "next/image";
import reportView from "../../../assets/reportView.svg";
import downloadIcon from "../../../assets/DownloadWhite.svg";
import Overviewdatatable from "./overview-datatable/Overviewdatatable";

interface OverviewProps {
  companyName: string;
  country: string;
  eScore: string;
  sScore: string;
  gScore: string;
}

const Overview: React.FC<OverviewProps> = ({
  companyName,
  country,
  eScore,
  sScore,
  gScore,
}) => {
  const [activeTab, setActiveTab] = useState<string>("Achievement");

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.overViewHeader}>
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
            <p>{country}</p>
          </div>
        </div>
        {/* <div className={styles.reportbtncont}>
          <button className={styles.reportbtn1}>
            <Image src={reportView} width={16} height={13} alt="none" />
            <p>view report</p>
          </button>
          <button className={styles.reportbtn2}>
            <Image src={downloadIcon} width={16} height={13} alt="none" />
            <p>Download report</p>
          </button>
        </div> */}
      </div>

      <div className={styles.overviewcontent}>
        <Overviewdatatable eScore={eScore} sScore={sScore} gScore={gScore} />
      </div>
    </div>
  );
};

export default Overview;
