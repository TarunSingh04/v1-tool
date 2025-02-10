import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Esgscore from "../dashboard/dashboardContent/esg-score/Esgscore";
import Sustainabilitydatatable from "./sustainability-datatable/Sustainabilitydatatable";
import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";
import verifiedLogo from "../../assets/Verified.svg";
import pendingLogo from "../../assets/Pending.svg";
import verifiedLogo2 from "../../assets/vv.svg";
import pendingLogo2 from "../../assets/pp.svg";
import noteligibleLogo2 from "../../assets/ne.svg";
import scorearrow from "../../assets/ScoreArrow.svg";
import Dot from "../../assets/scoredot.svg";
import LocationImg from "../../assets/locationImg.svg";
import Download from "../../assets/downloadIcon.svg";
import DownloadWhite from "../../assets/DownloadWhite.svg";
import { GoDotFill } from "react-icons/go";
import Gauge from "../dashboard/dashboardContent/esg-score/score-gauge/ScoreGauge";
import country_data from "../../utilities/country_data";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Sustainability = () => {
  const [overallScore, setoverallScore] = useState(0);
  const [sustainabilitynavigate, setsustainabilitynavigate] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const badgeRef = useRef<HTMLDivElement>(null);

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
        setCompanyName(data.onboarding.companyName);
        setCountry(data.onboarding.selectedCountry);
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
  useEffect(() => {
    fetchUserData();
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

  const downloadAsPDF = async () => {
    if (!badgeRef.current) return;

    const canvas = await html2canvas(badgeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("sustainability_badge.pdf");
  };
  
  const downloadAsJPEG = async () => {
    if (!badgeRef.current) return;

    const canvas = await html2canvas(badgeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "sustainability_badge.jpeg";
    link.click();
  };
  

  const getColor = () => {
    if (overallScore >= 90) {
      return "#6F8C60";
    } else if (overallScore >= 75) {
      return "#A6C496";
    } else if (overallScore >= 55) {
      return "#F1D02C";
    } else if (overallScore >= 25) {
      return "#F18E2C";
    } else {
      return "#F25555";
    }
  };

  const getLogo = () => {
    const rating = getRating();

    if (rating === "a" || rating === "b") {
      return verifiedLogo2;
    } else if (rating === "c") {
      return pendingLogo2;
    } else {
      return noteligibleLogo2;
    }
  };

  const getRatingMessage = () => {
    const rating = getRating();

    switch (rating) {
      case "a":
        return `Congratulations! Let’s Lead Sustainability. You’ve reached the pinnacle of sustainability with your impressive A rating and earned the Impakter Pro Badge of Approval! We are proud to partner with you to propel you to even greater heights.`;
      case "b":
        return `Impressive Progress! You're on the Path to Leadership. You’ve earned a B score and the Impakter Pro Badge of Approval! Your initial score demonstrates significant progress toward sustainability leadership. Impakter Pro can help you to reach your full potential and advance to the next level.`;
      case "c":
        return `Great Start! Let's Accelerate. You’ve earned a C score! You've established a strong foundation in sustainability practices and have been awarded the Impakter Pro Pending Badge, signifying your progress in sustainability. This is an excellent beginning! We're here to help you advance further and achieve sustainability leadership.`;
      case "d":
        return `You're on the Right Path! Let's Accelerate Sustainability. You've Earned a D score. Your decision to become sustainable is commendable. The initial score simply indicates room for growth. We're here to guide you every step of the way, turning your commitment into meaningful progress.`;
      case "f":
        return `Let's Make a Positive Change Together! You’ve earned an F score. Taking the first step towards sustainability is commendable! The initial score is just a starting point. We understand this might seem overwhelming, but Impakter Pro is here to be your guide every step of the way.`;
      default:
        return `Rating not available.`;
    }
  };

  const getRating = () => {
    if (overallScore >= 90) {
      return "a";
    } else if (overallScore >= 75) {
      return "b";
    } else if (overallScore >= 55) {
      return "c";
    } else if (overallScore >= 25) {
      return "d";
    } else {
      return "f";
    }
  };

  const sustainabiltiyContentChange: any = (scoreNum: any) => {
    setsustainabilitynavigate(scoreNum);
  };

  return (
    <div className={styles.Sustainability}>
      <div className={styles.sectionHeader}>
        <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
        <p>
          <span>/</span>Sustainability Badge
        </p>
      </div>

      <div className={styles.mytasksubHeader}>
        <div className={styles.headerbox1}>
          <h2>Sustainability Badge</h2>
          <p>Your Roadmap to Sustainability</p>
        </div>

        <div className={styles.headerbox2}>
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
                <span>{overallScore}</span>/100
              </p>
            </div>
          </div>
          <div className={styles.parentContainer} ref={badgeRef}>
            <Image src={getLogo()} width={120} height={120} alt="none" />
            {getRating() !== "d" &&
              getRating() !== "f" && ( // Conditionally render the date
                <div className={styles.childContainer}>
                  {new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1)
                  )
                    .toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                    .toUpperCase()}
                </div>
              )}
          </div>
        </div>
      </div>

      <div className={styles.scorecardBody}>
        <div className={styles.scorecardsubcontbar}>
          <p
            onClick={() => {
              sustainabiltiyContentChange(1);
            }}
            className={
              sustainabilitynavigate === 1
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            Badge
          </p>
          <p
            onClick={() => {
              sustainabiltiyContentChange(2);
            }}
            className={
              sustainabilitynavigate === 2
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            Archive
          </p>
        </div>
        <div className={styles.scorecardBodyContent}>
          {sustainabilitynavigate === 1 && (
            <div className={styles.BadgeBody}>
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
                    {country_data.find((item) => item.value === country)
                      ?.label || "Unknown"}
                  </p>
                </div>
              </div>
              <div className={styles.badgecontent}>
                <div className={styles.BadgeBodyInfo}>
                  <div className={styles.upperpart}>
                    <h2>Your Hard Work Has Paid Off!</h2>
                    <p>
                      The IMPAKTER PRO Verified Badge is a testament to your
                      sustainability efforts. Showcase your achievement with
                      pride!
                    </p>
                    <p>
                      Share your impact and let stakeholders know you`re leading
                      the way in sustainability.
                    </p>
                    <p>
                      Maximize visibility by adding your badge to your website,
                      products, events, webinar materials, and digital channels.
                    </p>
                  </div>
                  <div className={styles.lowerpart}>
                    <p>
                      <GoDotFill className={styles.dotIcon} />
                      <span>Download Badge here :</span>
                    </p>
                    <div className={styles.lowerbtn}>
                      <button className={styles.downloadbtn1} onClick={downloadAsPDF} style={{cursor:"pointer"}}>
                        <Image
                          src={DownloadWhite}
                          height={15}
                          width={15}
                          alt="none"
                          className={styles.downloadIcon}
                        />
                        Download PDF
                      </button>
                      <button className={styles.downloadbtn2} onClick={downloadAsJPEG} style={{cursor:"pointer"}}>
                        <Image
                          src={Download}
                          height={15}
                          width={15}
                          alt="none"
                          className={styles.downloadIcon}
                        />
                        download jpeg
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.BadgeBodyInfo2}>
                  <div className={styles.upperpart}>
                    <h2>Overall Sustainability Score</h2>
                    <p>{getRatingMessage()}</p>
                    <Gauge
                      value={overallScore}
                      color={getColor()}
                      label={getRating()}
                      size={160}
                      fontsz={85}
                    />
                  </div>
                  <div className={styles.lowerpart2}>
                    <div className={styles.scordisplaycont2}>
                      <div className={styles.scoreoverall}>
                        <Image
                          src={scorearrow}
                          alt="none"
                          width={18}
                          height={18}
                          className={styles.arrowIcon}
                        />
                        <p>
                          <span>{overallScore}</span>/100
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {sustainabilitynavigate === 2 && (
            <Sustainabilitydatatable />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
