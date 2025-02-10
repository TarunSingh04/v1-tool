"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Dot from "../../../../assets/scoredot.svg";
import LocationImg from "../../../../assets/locationImg.svg";
import scoreCardLogo from "../../../../assets/ImpaktercorecardLogo.svg";
import environmentLogo from "../../../../assets/environmentLogo.svg";
import Circlescroll from "../../../scorecard/scorecard-main/scorecard-circle-scrollbar/Circlescroll";
import { ScoreBar } from "../../../scorecard/scorecard-scrollbar/Scrollbar";
import socialLogo from "../../../../assets/socialLogo.svg";
import { BsPlus, BsDash } from "react-icons/bs";
import sdgIcon from "../../../../assets/sdgIcon.svg";
import country_data from "@/app/components/utilities/country_data";
import { QuestionnaireData } from "../action-plan/Action";

interface CollapseContainerItem {
  measurementName: string;
  collapseData1: JSX.Element;
  collapseData2: JSX.Element;
}

interface ActionProps {
  questionnaireData: QuestionnaireData | null;
}

const Measurement: React.FC<ActionProps> = ({ questionnaireData }) => {
  
  console.log("questionnaireData ==> ", questionnaireData);
  const [environmentData, setEnvironmentData] = useState<any>();
  const [governmentData, setGovernmentData] = useState<any>();
  const [socialData, setSocialData] = useState<any>();

  useEffect(() => {
    setEnvironmentData(questionnaireData?.Environment);
    setGovernmentData(questionnaireData?.Governance);
    setSocialData(questionnaireData?.Social);
  }, [questionnaireData]);

  // const [scorePercentage, setscorePercentage] = useState<number>(46);
  // const [environmentScorePercent, setenvironmentScorePercent] =
  //   useState<number>(75);
  // const [socialScorePercent, setsocialScorePercent] = useState<number>(45);
  // const [governanceScorePercent, setgovernanceScorePercent] =
  //   useState<number>(55);
  const [countryCode, setCountryCode] = useState("");
  const [scorenavigateNumber, setscorenavigateNumber] = useState<number>(1);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [companyName, setcompanyName] = useState("");
  const [scorePercentage, setscorePercentage] = useState(0);
  const [environmentScorePercent, setenvironmentScorePercent] = useState(0);
  const [socialScorePercent, setsocialScorePercent] = useState(0);
  const [governanceScorePercent, setgovernanceScorePercent] = useState(0);

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
        setcompanyName(data?.onboarding?.companyName);
        setCountryCode(data?.onboarding?.selectedCountry);
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchUser();
  }, []);

  const toggleSection = (index: number, section: "AorB" | "CorD") => {
    setOpenSections((prev) => ({
      ...Object.keys(prev).reduce((acc: any, key) => {
        // Close all sections except the one being toggled
        if (key.startsWith(`${index}-`)) {
          acc[key] = prev[key];
        }
        return acc;
      }, {}),
      [`${index}-${section}`]: !prev[`${index}-${section}`],
    }));
  };

  const collapseContainer: CollapseContainerItem[] = [
    {
      measurementName: "Environment",
      collapseData1: (
        <div className={styles.collapsecont}>
          <p>
            Name of SME has reported the following estimate of GHG emissions:
            [Insert GHG Emissions report results here] <br /> <br />
            For its energy demands,[Name of SME] utilizes [name of utility
            provider].
            <br /> <br />
            Alternative energy sources: To improve energy management and make it
            more sustainable, the following renewable energy sources are in use:
            [insert checked answers, e.g. solar power amounting to [insert %] of
            the total energy used, and biofuels amounting to [insert %]. Include
            as many as are checked] <br /> <br />
            Energy efficiency: To avoid costly waste in production, service
            provision, and infrastructure operation, the EU has implemented an
            energy efficiency labeling system that ranges from A (the most
            efficient) to G (the least efficient). Name of SME has obtained the
            following from the EU energy efficiency labeling system: [include
            only info given in checked boxes] Label [insert checked letter]
            covering over 80% of total energy used by the company <br /> <br />
            Water management: Name of SME considers that the water it receives
            from its utility provider, [insert name of utility] is plentiful and
            of good quality/ insufficient and of poor quality, and remedial
            measures from the local administration are needed.
            <br /> <br />
            Wastewater management: it is the responsibility of [insert name of
            wastewater utility] and Name of SME is satisfied with how wastewater
            is treated and believes that sanitary regulations are correctly
            followed / not satisfied with how wastewater is treated and believes
            that sanitary regulations need corrective measures. <br /> <br />
            Alternative water sources: Name of SME uses the following
            alternative water sources, as needed, to satisfy needs: [list here
            all the sources that have been checked and provide the rating,
            following this model for static text:] Harvested rainwater which
            provides …% [insert %] of total water consumption and is considered
            water of insufficient/sufficient/good quality. <br /> <br />
            To address water discharge issues, Name of SME has adopted the
            following pollution prevention method(s): [list methods as many as
            checked in the table] The above method(s) has/have proved to be a
            good solution to solve the problem. <br /> <br />
            Pollution may be prevented or reduced by adopting a new process of
            production or modifying an existing one. Name of SME applies the
            following modifications to its production process: [list as many as
            checked] <br /> <br />
            Waste management: This involves keeping products and materials in
            use longer, recycling for new products, and converting them into new
            energy. Name of SME has successfully achieved waste reduction
            through the following methods: [list all methods that are checked]{" "}
            <br /> <br />
            Partnerships for the circular economy: This involves collaborating
            with business partners or manufacturers to design products that are
            easier to disassemble, repair, and reuse. ensuring that second-hand
            merchandise is sellable and does not end up in landfills. <br />{" "}
            <br />
            Name of the SME is currently engaged in partnerships for the
            circular economy. It collaborates with business partners to better
            design its products so that it can successfully enter second-hand
            markets with a resale value. Successful examples of partnerships
            include………………..…..[enter text as given here by respondent]
          </p>
        </div>
      ),
      collapseData2: (
        <div className={styles.collapsecont}>
          <p>
            Name of SME has reported the following estimate of GHG emissions:
            [Insert GHG Emissions report results here] <br /> <br />
            For its energy demands,[Name of SME] utilizes [name of utility
            provider].
            <br /> <br />
            Alternative energy sources: No renewable energy sources are used for
            energy management, and no attempts have been made to make it more
            sustainable so far. <br /> <br />
            Energy efficiency: To avoid costly waste in production, service
            provision, and infrastructure operation, the EU has implemented an
            energy efficiency labeling system that ranges from A (the most
            efficient) to G (the least efficient). Name of SME has not yet
            obtained any labels from the EU energy efficiency labeling system.{" "}
            <br /> <br />
            Up to now, no energy audit or the implementation of any measures to
            address energy efficiency has been undertaken. <br /> <br />
            Water management: Name of SME considers that the water it receives
            from its utility provider, [insert name of utility] is plentiful and
            of good quality/ insufficient and of poor quality, and remedial
            measures from the local administration are needed. <br /> <br />
            Wastewater management: it is the responsibility of [insert name of
            wastewater utility] and Name of SME is is satisfied with how
            wastewater is treated and believes that sanitary regulations are
            correctly followed / not satisfied with how wastewater is treated
            and believes that sanitary regulations need corrective measures.{" "}
            <br /> <br />
            Alternative water sources: Name of SME does not rely on any
            alternative water sources/ relies partly on alternative sources, up
            to %...of total.
            <br /> <br />
            With regard to wastewater discharge issues caused by a number of
            pollutants, including chemicals and plastics, Name of SME has not
            reported any problem. <br /> <br />
            Pollution prevention and/or reduction: Name of SME reports it has
            made no attempts to address this issue/ has only started to address
            this issue and will report results later when they are confirmed.{" "}
            <br /> <br />
            Waste management: This involves keeping products and materials in
            use longer, recycling for new products, and converting them into new
            energy. Name of SME is not currently engaged in waste reduction but
            is considering various possible solutions. <br /> <br />
            Partnerships for the circular economy: This involves collaborating
            with business partners or manufacturers to design products that are
            easier to disassemble, repair, and reuse. ensuring that second-hand
            merchandise is sellable and does not end up in landfills. Currently,
            Name of SME is not engaged in partnerships for the circular economy.
          </p>
        </div>
      ),
    },
    {
      measurementName: "Social",
      collapseData1: (
        <div className={styles.collapsecont}>
          <p>
            Work dignity and equal compensation: With respect to wages and
            compensation, including monetary and non-monetary rewards provided
            to employees in exchange for their work, Name of SME has included
            the following compensations: [include as many as checked] <br />{" "}
            <br />
            Likewise, the lifestyle benefits on offer for its employees include:
            [include as many as checked] <br /> <br />
            In addition, there are other benefits for employees not listed above
            and that include: [include as many as checked - if none are checked,
            no static text is required) <br /> <br />
            Attitude toward collective bargaining with trade unions is a marker
            of a company’s engagement toward its employers, and positive
            relations contribute to cost-saving in the long run. Aware of this,
            Name of SME is engaged in collective bargaining with trade unions
            regarding work conditions, as needed. <br /> <br />
            Equity issues are a concern for Name of SME, and it fully
            supports/supports the goal of equal compensation for equal work,
            regardless of gender, sexual orientation, status, or country of
            origin, whether an immigrant of the first or second generation or
            belonging to a vulnerable group or ethnic or religious minority.{" "}
            <br /> <br />
            Regarding gender parity, Name of SME currently addresses this set of
            compensation issues by giving women and men equal compensation for
            equal work. <br /> <br />
            With respect to immigrants and vulnerable groups, the goal is full
            integration for immigrants and vulnerable groups. Here is how the
            company reports its position on this issue: [include text of
            answers, as above for 6.5] <br /> <br />
            As regards work stability, whether part-time personnel is treated at
            the same level for the work provided as full-time staff or whether
            temporary staff positions entail a lower compensation level compared
            to permanent positions, Name of SME applies the same level of
            compensation to everyone for the same work done. <br /> <br />
            Likewise, increasing the percentage of persons with disabilities is
            not only a desirable goal but it is also a human resources policy of
            the company that proudly applies it, compensating persons with
            disabilities at the same level for equal work as the rest of the
            workforce. <br /> <br />
            Name of SME provides its staff with the following opportunities for
            professional growth: [insert text as appropriate]
            <br /> <br />
            Work conditions include a broad range of aspects, such as work
            flexibility, work safety and protection from environmental and
            bio-hazards as well as worker health. The benefits of flexible
            working hours include: a possible boost in staff morale and
            motivation levels, increased productivity and job satisfaction,
            potential to increase flexibility for customers (e.g. increased
            contact hours), reduction in staff absenteeism and savings on the
            costs of staff absenteeism and recruitment. And, aware of the
            benefits, Name of SME offers flexible working time. <br /> <br />
            With regards to worker safety and health measures, holding the ISO
            45001 or SO8000 is generally considered proof that proper safety and
            health measures are in place. Name of SME has obtained the following
            certificates: [give name - if they do not match ISO 45001 or SO8000
            then this must be said] <br /> <br />
            Worker safety and health measures: The following measures are in
            place:............ [insert answer] <br /> <br />
            With regard to worker family health requirements, such as for
            mothers and fathers at the moment of birth or for sickness of a
            close relative, Name of SME has reported that it has in place the
            following specific measures: ……………..[insert answer] <br /> <br />
            Regarding violence and sexual harassment in the workplace,
            businesses can rely on guidance and measures such as those provided
            by the ILO Violence and Harassment Convention and Collaboration
            between employers, employees, and unions. These are in line with the
            goals of a fair and sustainable work environment. They include
            implementing clear policies, providing training, and establishing
            reporting and response procedures. With respect to measures against
            violence and sexual harassment in the workplace, Name of SME has put
            in place the following: ………………………………[insert text] <br /> <br />
            Participating in Extended Producer Responsibility (EPR) programmes
            that hold producers as financially responsible for the collection
            and recycling of their products at the end of their lifespan is an
            opportunity for business to participate as an active agent in the
            circular economy, ensuring that product life is extended, thus
            minimizing carbon footprint and pollution. Name of SME is presently
            engaged in product stewardship and circular economy programme
            activities, as follows: [indicate programme] <br /> <br />
            Partnerships with the local community—for example, partnerships with
            food banks, local schools, shelters, green spaces, or participation
            in community events—are a great opportunity for business looking to
            improve their presence in the community, increase their social value
            and enhance their reputation as a “good citizen”. At the present
            time, Name of SME reported that it is actively participating in
            local community partnerships, as follows……………………. [insert text]
          </p>
        </div>
      ),
      collapseData2: (
        <div className={styles.collapsecont}>
          <p>
            Work dignity and equal compensation: With respect to wages and
            compensation, including monetary and non-monetary rewards provided
            to employees in exchange for their work, Name of SME has no
            financial compensations or other lifestyle benefits on offer. / Name
            of SME has generally no financial compensations or other lifestyle
            benefits on offer, except for: List benefits mentioned in the
            answers (likely to be few) <br /> <br />
            Attitude toward collective bargaining with trade unions is a marker
            of a company&apos;s engagement toward its employers, and positive
            relations contribute to cost-saving in the long run. This said, Name
            of SME is not engaged in collective bargaining with trade unions
            regarding work conditions. <br /> <br />
            Equity issues are a general concern and Name of SME is aware that
            the goal is equal compensation for equal work, regardless of gender,
            sexual orientation, status, or country of origin, whether an
            immigrant of the first or second generation or belonging to a
            vulnerable group or ethnic or religious minority. <br /> <br />
            Regarding gender parity, the Name of SME does not currently
            compensate women and men equally for equal work. <br /> <br />
            With respect to immigrants and vulnerable groups, the goal is full
            integration for immigrants and vulnerable groups. Here is how the
            company reports its position on this issue: [include text of
            answers, as above for 6.5] <br /> <br />
            Regarding work stability, Name of SME applies a lower level of
            compensation to part-time personnel and temporary staff positions
            than to full-time and permanent staff.
            <br /> <br />
            Likewise, while increasing the percentage of persons with
            disabilities is a desirable goal, it is not the company&apos;s current
            human resources policy. <br /> <br />
            Name of SME does not provide its staff with opportunities for
            professional growth. <br /> <br />
            Work conditions include a broad range of aspects, such as work
            flexibility, work safety and protection from environmental and
            bio-hazards as well as worker health. <br /> <br />
            The benefits of flexible working hours include: a possible boost in
            staff morale and motivation levels, increased productivity and job
            satisfaction, potential to increase flexibility for customers (e.g.
            increased contact hours), reduction in staff absenteeism and savings
            on the costs of staff absenteeism and recruitment. However Name of
            SME does not at present offer flexible working time. <br /> <br />
            With regards to worker safety and health measures, holding the ISO
            45001 or SO8000 is generally considered proof that proper safety and
            health measures are in place.At present, the company has not yet
            obtained any such certificate. <br /> <br />
            Worker safety and health measures: There are no safety or health
            measures currently in place. <br /> <br />
            With respect to worker family health requirements, such as for
            mothers and fathers at the moment of birth or for sickness of a
            close relative, Name of SME has reported that it has not yet put in
            place special measures in this regard. <br /> <br />
            Regarding violence and sexual harassment in the workplace,
            businesses can rely on guidance and measures such as those provided
            by the ILO Violence and Harassment Convention and Collaboration
            between employers, employees, and unions. These are in line with the
            goals of a fair and sustainable work environment. They include
            implementing clear policies, providing training, and establishing
            reporting and response procedures. No particular measures have yet
            been taken by Name of SME against violence and sexual harassment in
            the workplace.
            <br /> <br />
            Participating in Extended Producer Responsibility (EPR) programmes
            that hold producers as financially responsible for the collection
            and recycling of their products at the end of their lifespan is an
            opportunity for business to participate as an active agent in the
            circular economy, ensuring that product life is extended, thus
            minimizing carbon footprint and pollution. However Name of SME is
            not presently engaged Product Stewardship or similar activities
            intended to promote the circular economy <br /> <br />
            Partnerships with the local community—for example, partnerships with
            food banks, local schools, shelters, green spaces, or participation
            in community events—are a great opportunity for business looking to
            improve their presence in the community, increase their social value
            and enhance their reputation as a “good citizen”. At the present
            time, Name of SME reported that it is not actively participating in
            any local community partnerships.
          </p>
        </div>
      ),
    },
    {
      measurementName: "Governance",
      collapseData1: (
        <div className={styles.collapsecont}>
          <p>
            Transparency and anti-corruption: NAME OF SME is certified with the
            ISO 37001 standard for anti-fraud and anti-money laundering
            activities. It is in line with and fully following the general
            ethical principles set by organisations like the European
            Fundraising Association (EFA) that are focused on transparency,
            accountability, and respectful treatment of donors. <br />
            <br />
            Carbon credit schemes or other forms of compensation for CO2
            emissions are on offer to customers, in particular: ……[insert
            text=name of the scheme mentioned] <br />
            <br />
            Both ISO 9001 and ISO 31000 certificates—the former covering quality
            and the latter risk— are the cornerstones of several aspects of
            sustainable management and risk planning and control, including
            environmental control, supply chain risk management, and
            occupational safety and health management. The ISO quality
            management certificate ISO 9001 was obtained in [insert year]. The
            risk management guidelines and practices set out in certificate ISO
            31000 are followed. <br />
            <br />
            Other special guidelines/practices for risk reduction that are
            followed by [Name of SME] and they include: [insert text provided by
            respondent]
            <br />
            <br />
            Compliance with the General Data Protection Regulation (GDPR), a
            regulation enforced by the EU to ensure legal compliance with a
            focus on individual rights, has been achieved. <br />
            <br />
            The ISO 27001 certificate provides a framework for best practices in
            information security: The guidance provided by ISO 27001 is
            followed.
          </p>
        </div>
      ),
      collapseData2: (
        <div className={styles.collapsecont}>
          <p>
            Transparency and anti-corruption: NAME OF SME is not certified with
            the ISO 37001 standard for anti-fraud and anti-money laundering
            activities. It has yet to follow the general ethical principles set
            by organisations like the European Fundraising Association (EFA)
            that are focused on transparency, accountability, and respectful
            treatment of donors. <br />
            <br />
            Carbon credit schemes or other forms of compensation for CO2
            emissions are not on offer to customers <br />
            <br />
            Both ISO 9001 and ISO 31000 certificates—the former covering quality
            and the latter risk— are the cornerstones of several aspects of
            sustainable management and risk planning and control, including
            environmental control, supply chain risk management, and
            occupational safety and health management. The ISO quality
            management certificate ISO 9001 was not obtained and the risk
            management guidelines and practices set out in certificate ISO 31000
            are not followed. No other special guidelines or practices for risk
            reduction are contemplated for now. <br /><br />Compliance with the General Data
            Protection Regulation (GDPR), a regulation enforced by the EU to
            ensure legal compliance with a focus on individual rights, has yet
            to be achieved. <br /><br />The ISO 27001 certificate provides a framework for
            best practices in information security: The guidance provided by ISO
            27001, has yet to be followed. The guidance provided by ISO 27001 is
            followed.
          </p>
        </div>
      ),
    },
  ];

  const scoreContentChange = (scoreNum: number) => {
    setscorenavigateNumber(scoreNum);
  };

  const getbackgroundColor = (rating: number): string => {
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

  const getColor = (rating: string): string => {
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

  return (
    <div className={styles.Measurement}>
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
      <div className={styles.taskcont}>
        <div className={styles.scorecardBody}>
          <div className={styles.scorecardsubcontbar}>
            <p
              onClick={() => {
                scoreContentChange(1);
              }}
              className={
                scorenavigateNumber === 1
                  ? styles.boldScoreSection
                  : styles.normalScoreSection
              }
            >
              Environment
            </p>
            <p
              onClick={() => {
                scoreContentChange(2);
              }}
              className={
                scorenavigateNumber === 2
                  ? styles.boldScoreSection
                  : styles.normalScoreSection
              }
            >
              Social
            </p>
            <p
              onClick={() => {
                scoreContentChange(3);
              }}
              className={
                scorenavigateNumber === 3
                  ? styles.boldScoreSection
                  : styles.normalScoreSection
              }
            >
              Governance
            </p>
          </div>
          {collapseContainer.map((items, index) => {
            return (
              scorenavigateNumber === index + 1 && (
                <p className={styles.sectionHeader} key={index}>
                  {items.measurementName}
                </p>
              )
            );
          })}
          <div className={styles.scorecardBodyContent}>
            {collapseContainer.map(
              (item, index) =>
                scorenavigateNumber === index + 1 && (
                  <div key={index} className={styles.dataContent}>
                    <div className={styles.measureBoxHeader}>
                      <div className={styles.companyHeader}>
                        <p className={styles.companyContentHeader}>
                          Companies rated A or B:
                        </p>
                        {openSections[`${index}-AorB`] ? (
                          <BsDash
                            className={styles.measuresIcon}
                            onClick={() => toggleSection(index, "AorB")}
                          />
                        ) : (
                          <BsPlus
                            className={styles.measuresIcon}
                            onClick={() => toggleSection(index, "AorB")}
                          />
                        )}
                      </div>
                      {openSections[`${index}-AorB`] && (
                        <>
                          <div className={styles.dividerline}></div>
                          <div className={styles.measuredescription}>
                            {item.collapseData1}
                          </div>
                        </>
                      )}
                    </div>
                    <div className={styles.measureBoxHeader}>
                      <div className={styles.companyHeader}>
                        <p className={styles.companyContentHeader}>
                          Companies rated C, D, or F:
                        </p>
                        {openSections[`${index}-CorD`] ? (
                          <BsDash
                            className={styles.measuresIcon}
                            onClick={() => toggleSection(index, "CorD")}
                          />
                        ) : (
                          <BsPlus
                            className={styles.measuresIcon}
                            onClick={() => toggleSection(index, "CorD")}
                          />
                        )}
                      </div>
                      {openSections[`${index}-CorD`] && (
                        <>
                          <div className={styles.dividerline}></div>
                          <div className={styles.measuredescription}>
                            {item.collapseData2}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
          <div className={styles.scorecardBodyContentTitle}>SDGs</div>
          <div className={styles.sdgBox}>
            <div className={styles.sdgcont}>
              <Image src={sdgIcon} width={48} height={48} alt="none" />
              <div className={styles.sdgtextInfo}>
                <p className={styles.sdgtitle}>SDG</p>
                <p className={styles.sdgdesc}>Sustainable development goals</p>
              </div>
            </div>
            <div className={styles.sdgcont}>
              <Image src={sdgIcon} width={48} height={48} alt="none" />
              <div className={styles.sdgtextInfo}>
                <p className={styles.sdgtitle}>SDG</p>
                <p className={styles.sdgdesc}>Sustainable development goals</p>
              </div>
            </div>
            <div className={styles.sdgcont}>
              <Image src={sdgIcon} width={48} height={48} alt="none" />
              <div className={styles.sdgtextInfo}>
                <p className={styles.sdgtitle}>SDG</p>
                <p className={styles.sdgdesc}>Sustainable development goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Measurement;
