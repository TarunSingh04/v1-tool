"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import LocationImg from "../../../../assets/locationImg.svg";
import Dot from "../../../../assets/scoredot.svg";
import Circlescroll from "../scorecard-circle-scrollbar/Circlescroll";
import scoreCardLogo from "../../../../assets/ImpaktercorecardLogo.svg";
import environmentLogo from "../../../../assets/environmentLogo.svg";
import socialLogo from "../../../../assets/socialLogo.svg";
import governenceLogo from "../../../../assets/governenceLogo.svg";
import { ScoreBar } from "../../scorecard-scrollbar/Scrollbar";
import environmentFooter from "../../../../assets/environmentFooter.svg";
import sdgFoot from "../../../../assets/sdgFoot.svg";
import scanner from "../../../../assets/Scanner.svg";
import country_data from "@/app/components/utilities/country_data";

const Maincard = () => {
  const [scorePercentage, setscorePercentage] = useState(0);
  const [environmentScorePercent, setenvironmentScorePercent] = useState(0);
  const [socialScorePercent, setsocialScorePercent] = useState(0);
  const [governanceScorePercent, setgovernanceScorePercent] = useState(0);

  const [companyName, setCompanyName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/score`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const data = await response.json();
        setenvironmentScorePercent(Math.round(data.mean_e_score));
        setsocialScorePercent(Math.round(data.mean_s_score));
        setgovernanceScorePercent(Math.round(data.mean_g_score));
        setscorePercentage(Math.round(data.onboarding_score));
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchScore();
  }, []);

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
        setCertificates(data?.onboarding?.certificates);
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchUser();
  }, []);

  const getbackgroundColor = (rating: any) => {
    if (rating > 80) {
      return "#6F8C60";
    } else if (rating > 70) {
      return "#A6C496";
    } else if (rating > 50) {
      return "#F1D02C";
    } else if (rating > 30) {
      return "#F18E2C";
    } else {
      return "#F25555";
    }
  };
  const getText = (rating: any) => {
    if (rating > 80) {
      return "A";
    } else if (rating > 70) {
      return "B";
    } else if (rating > 50) {
      return "C";
    } else if (rating > 30) {
      return "D";
    } else {
      return "F";
    }
  };
  const getColor = (rating: any) => {
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

  const getMessage = (score: string, companyName: string) => {
    switch (score) {
      case "A":
        return `${companyName} achieved an A rating on the Impakter Pro sustainability scale, showcasing an outstanding commitment to environmental, social, and governance standards.`;
      case "B":
        return `${companyName} achieved a B rating on the Impakter Pro sustainability scale, showcasing their dedicated commitment to environmental, social, and governance standards.`;
      case "C":
        return `${companyName} achieved a C rating on the Impakter Pro sustainability scale, showcasing their intent to commit to environmental, social, and governance standards and their first successful efforts, although more needs to be done.`;
      case "D":
        return `${companyName} achieved a D rating on the Impakter Pro sustainability scale, showcasing their intent to commit to environmental, social, and governance standards, but all the necessary measures still need to be taken.`;
      case "F":
        return `${companyName} achieved an F rating on the Impakter Pro sustainability scale, showcasing the fact that commitment to environmental standards is impossible since production is entirely fossil-fuels based, even if progress can be made on meeting social and governance standards.`;
      default:
        return "No rating available.";
    }
  };

  const getCertificateMessage = (score: number, companyName: string) => {
    if (score >= 80) {
      return `With a score of ${score}% on certificates and standards obtained, ${companyName} is poised to achieve full transparency and compliance through third-party verified standards.`;
    } else if (score > 50 && score < 80) {
      return `With a score of ${score}% on certificates and standards obtained, ${companyName} is on the verge of achieving full transparency and compliance through third-party verified standards but is engaged in taking more measures to demonstrate sustainability, including shedding certificates that are not third-party verified as this will save money.`;
    } else {
      return `With a score of ${score}% on certificates and standards obtained, ${companyName} is in the process of taking the necessary measures to improve transparency and compliance through third-party verified standards and shedding any other certificate in order to save money.`;
    }
  };

  const getEnergySourceMessage = (score: number, companyName: string) => {
    if (score >= 80) {
      return `With ${score}% of energy derived from local utilities using fossil fuels as their source, ${companyName} needs to consider alternative sources of energy such as solar panels or wind power.`;
    } else if (score > 50 && score < 80) {
      return `With ${score}% of energy derived from local utilities using fossil fuels as their main source, ${companyName} needs to consider alternative sources of energy such as solar panels or wind power to improve its score.`;
    } else {
      return `With less than ${score}% of energy derived from local utilities using fossil fuels as their main source, ${companyName} is well placed to improve its energy use score by turning to alternative energy source for its remaining needs.`;
    }
  };

  const getEnergyEfficiencyMessage = (score: number, companyName: string) => {
    if (score >= 80) {
      return `With an energy use score of ${score}% as labeled by the EU system (from A to G), ${companyName} is poised to achieve full efficiency in its energy use.`;
    } else if (score > 50 && score < 80) {
      return `With an energy use score of ${score}% as labeled by the EU system (from A to G), ${companyName} is on its way to achieving efficiency in its energy use, but more still needs to be done to demonstrate sustainability.`;
    } else {
      return `With an energy use score of ${score}% as labeled by the EU system (from A to G), ${companyName} still needs to take all the necessary measures to improve its energy efficiency in line with EU regulations.`;
    }
  };

  const formatDate = (date: any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.maincard}>
      <div className={styles.section2} id="section1">
        <div className={styles.headerdata}>
          <div className={styles.headerleftcont}>
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
                  {country_data.find((item) => item.value === countryCode)
                    ?.label || "Unknown"}
                </p>
              </div>
            </div>
            <div className={styles.headerdesc}>
              <p>{getMessage(getText(scorePercentage), companyName)}</p>
              {/* Since 2010 Greenscape is one of Italy&apos;s leading property
              consultancy firms. Prelios specialises in property advice and
              intermediation. It offers a complete range of services through
              teams organized by market segments and client types. */}
            </div>
          </div>
          <div className={styles.headerrightcont}>
            <div className={styles.headerrighttxt}>Your Score is</div>
            <div className={styles.ScoreText}>
              {scorePercentage > 30 && (
                <span style={{ color: getColor("F") }}>F</span>
              )}
              {scorePercentage < 30 && (
                <span
                  style={{ background: getColor("F") }}
                  className={styles.backgroundcol}
                >
                  F
                </span>
              )}

              {(scorePercentage <= 30 || scorePercentage > 50) && (
                <span style={{ color: getColor("D") }}>D</span>
              )}
              {scorePercentage > 30 && scorePercentage <= 50 && (
                <span
                  style={{ background: getColor("D") }}
                  className={styles.backgroundcol}
                >
                  D
                </span>
              )}

              {(scorePercentage <= 50 || scorePercentage > 70) && (
                <span style={{ color: getColor("C") }}>C</span>
              )}
              {scorePercentage > 50 && scorePercentage <= 70 && (
                <span
                  style={{ background: getColor("C") }}
                  className={styles.backgroundcol}
                >
                  C
                </span>
              )}

              {(scorePercentage <= 70 || scorePercentage > 80) && (
                <span style={{ color: getColor("B") }}>B</span>
              )}
              {scorePercentage > 70 && scorePercentage <= 80 && (
                <span
                  style={{ background: getColor("B") }}
                  className={styles.backgroundcol}
                >
                  B
                </span>
              )}

              {scorePercentage <= 80 && (
                <span style={{ color: getColor("A") }}>A</span>
              )}
              {scorePercentage > 80 && (
                <span
                  style={{ background: getColor("A") }}
                  className={styles.backgroundcol}
                >
                  A
                </span>
              )}
            </div>
            <Circlescroll
              progress={scorePercentage}
              color={getbackgroundColor(scorePercentage)}
            />
          </div>
        </div>

        <div className={styles.scorecardbodysection1}>
          <div className={styles.scorecardbodys1left}>
            <p>How&apos;s My Score?</p>
            <div className={styles.dates}>
              Your ESG scorecard is valid till: <span>01/09/2024</span>
            </div>
          </div>
          <Image src={scoreCardLogo} height={38} width={125} alt="none" />
        </div>
        <div className={styles.cardcont}>
          <div className={styles.cards}>
            <div className={styles.leftcardbox}>
              <Image src={environmentLogo} height={75} width={75} alt="none" />
              <p>Environmental</p>
            </div>
            <p>{environmentScorePercent}%</p>
          </div>
          <div className={styles.cards}>
            <div className={styles.leftcardbox}>
              <Image src={socialLogo} height={75} width={75} alt="none" />
              <p>Social</p>
            </div>
            <p>{socialScorePercent}%</p>
          </div>
          <div className={styles.cards}>
            <div className={styles.leftcardbox}>
              <Image src={environmentLogo} height={75} width={75} alt="none" />
              <p>Governance</p>
            </div>
            <p>{governanceScorePercent}%</p>
          </div>
        </div>
        <ScoreBar
          label="E"
          percentage={environmentScorePercent}
          color="#DAF9DA"
        />
        <ScoreBar label="S" percentage={socialScorePercent} color="#FAECD8" />
        <ScoreBar
          label="G"
          percentage={governanceScorePercent}
          color="#D7E0F5"
        />
      </div>

      <div className={styles.section2} id="section2">
        <div className={styles.section2header}>
          <div className={styles.section2HeaderBox}>
            <p>{companyName || "Greenscape"}</p>
            <Image src={scoreCardLogo} height={38} width={125} alt="none" />
          </div>
          <p>{getMessage(getText(scorePercentage), companyName)}</p>
          {/* <p>
            {comapnyName} achieved a{" "}
            <span>{getText(scorePercentage)}</span> rating on the Impakter Pro
            sustainability scale, showcasing their dedicated commitment to
            environmental, social, and governance standards/
          </p> */}
        </div>

        <p className={styles.sectiontext}>
          The data presented in the {companyName} scorecard is based on the
          Impakter Pro methodology, which considers various factors, including
          the company&apos;s performance in achieving ESG clusters, the
          Materiality of sustainability efforts, Sustainability Management,
          Certifications, and Company Information.
        </p>
        <p className={styles.sectiontext}>
          The comprehensive sustainability analysis to identify gaps and provide
          express solutions aligned with EU regulations and market standards.
        </p>
        <p className={styles.sectiontext2}>
          Following are the {companyName}&apos; <span>areas of progress:</span>
        </p>

        <p className={styles.sectiontexthead}>
          <span>Environmental</span>
        </p>
        <p className={styles.sectiontext3}>
          <span>Certificates Obtained:</span>{" "}
          {certificates?.map((cert: any) => cert.label).join(", ")}
        </p>
        <p className={styles.sectiontext4}>
          {getCertificateMessage(environmentScorePercent, companyName)}
        </p>
        {/* <p className={styles.sectiontext4}>
          {" "}
          With a score of [80% +] on certificates and standards obtained, [name
          of SME] is poised to achieve full transparency and compliance through
          third-party verified standards./
        </p>
        <p className={styles.sectiontext3}>
          With a score of [50 to 80%] on certificates and standards obtained,
          [name of SME] is on the verge of achieving full transparency and
          compliance through third-party verified standards but is engaged in
          taking more measures to demonstrate sustainability, including shedding
          certificates that are not third-party verified as this will save
          money./
        </p>
        <p className={styles.sectiontext3}>
          With a score of [below 50%] on certificates and standards obtained,
          [name of SME] is in the process of taking the necessary measures to
          improve transparency and compliance through third-party verified
          standards and shedding any other certificate in order to save money./
        </p> */}
        <div className={styles.environmentfoot}>
          <Image src={environmentFooter} height={55} width={245} alt="none" />
        </div>
        <p className={styles.sectiontext3}>
          <span>Energy Use</span>
        </p>
        <p className={styles.sectiontext3}>
          <span>Energy Source:</span>
        </p>
        <p className={styles.sectiontext4}>
          {getEnergySourceMessage(environmentScorePercent, companyName)}
        </p>
        <p className={styles.sectiontext3}>
          <span>Energy efficiency:</span>
        </p>
        <p className={styles.sectiontext4}>
          {getEnergyEfficiencyMessage(environmentScorePercent, companyName)}
        </p>
        {/* <p className={styles.sectiontexthead}>
          <span>SDGs Achieved Targets</span>
        </p>
        <p className={styles.sectiontext4}>
          The SDG clusters fulfilled above 60% by the company according to the
          Impakter methodology are:{" "}
        </p>
        <p className={styles.sectiontext4}>
          SDG 8: Promote sustained, inclusive economic growth, full and
          productive employment and decent work for all.
        </p>
        <p className={styles.sectiontext4}>
          SDG 11: Make cities and human settlements inclusive, safe, resilient
          and sustainable.{" "}
        </p>
        <p className={styles.sectiontext4}>
          SDG 13: Take urgent action to combat climate change and its impacts
        </p>
        <Image
          src={sdgFoot}
          height={60}
          width={180}
          alt="none"
          className={styles.sdgIcon}
        />
        <Image
          src={scanner}
          height={111}
          width={121}
          alt="none"
          className={styles.scannerIcon}
        /> */}
      </div>

      <div className={styles.section2} id="section3">
        <div className={styles.section2header}>
          <div className={styles.section2HeaderBox}>
            <p>Social:</p>
            <Image src={scoreCardLogo} height={38} width={125} alt="none" />
          </div>
          <p>
            <span>Capital Dimension:</span> {companyName} has demonstrated
            commitment in the social capital dimension with a score of{" "}
            {scorePercentage}%.
          </p>
        </div>
        <p className={styles.sectiontext5}>
          <span>Human Capital Dimension:</span> Human capital encompasses all
          facets of a business that can impact workers and stakeholders at an
          operational level. {companyName} has achieved a score of{" "}
          {scorePercentage}%.
          {companyName} has taken steps and is proceeding in the right
          direction, especially concerning [add relevant response from
          questionnaire]
        </p>
        <p className={styles.sectiontext3}>
          {companyName} shows a {scorePercentage}% rating in the business model
          and innovation dimension. This rating evaluates the company&apos;s
          ability to align products and services with stakeholder demands and
          sustainability requirements. , including product design, climate
          adaptation, and responsible material sourcing for real estate.
        </p>
        <p className={styles.sectiontext5}>
          <span>Governance:</span> {companyName} scores {scorePercentage}% in{" "}
          <span>leadership and governance,</span> which evaluates factors
          affecting long-term strategy and decision-making. A strong performance
          in this dimension indicates strong leadership and organizational
          structure vital for sustainable growth. [if applicable depending on
          response in the questionnaire, add:] {companyName} prioritizes
          transparency and integrity in its sector.
        </p>

        <p className={styles.sectiontexthead}>
          <span>SDGs Achieved Targets</span>
        </p>
        <p className={styles.sectiontext4}>
          The SDG clusters fulfilled above 60% by the company according to the
          Impakter methodology are:{" "}
        </p>
        <p className={styles.sectiontext4}>
          SDG 8: Promote sustained, inclusive economic growth, full and
          productive employment and decent work for all.
        </p>
        <p className={styles.sectiontext4}>
          SDG 11: Make cities and human settlements inclusive, safe, resilient
          and sustainable.{" "}
        </p>
        <p className={styles.sectiontext4}>
          SDG 13: Take urgent action to combat climate change and its impacts
        </p>
        <Image
          src={sdgFoot}
          height={60}
          width={180}
          alt="none"
          className={styles.sdgIcon}
        />
        <Image
          src={scanner}
          height={111}
          width={121}
          alt="none"
          className={styles.scannerIcon}
        />

        <div className={styles.endmessagecont}>
          <div className={styles.section3HeaderBox}>
            <p>{companyName} POWERED BY IMPAKTER</p>
          </div>
          <p className={styles.greet}>
            THANK YOU FOR TRUSTING US AND JOINING THE CHANGE!
          </p>
          <div className={styles.section4HeaderBox}>
            Date of completion of Scorecard:{" "}
            <span>{formatDate(new Date())}</span>
          </div>
          <div className={styles.section5HeaderBox}>Contact Us</div>
        </div>
        <div className={styles.footcont}>
          <p>
            Copyright © 2023 Impakter l.t.d., 32 Lots Road, London, United
            Kingdom, SW10 0QF. All rights reserved. Any illegal reproduction or
            distribution of this content will result in immediate legal action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maincard;
