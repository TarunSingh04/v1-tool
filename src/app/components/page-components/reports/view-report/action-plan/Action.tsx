import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BsPlus, BsDash } from "react-icons/bs";

interface ESGItem {
  ESGtitle: string;
  ESGdescription: string[];
  ESGId: number;
}

export interface QuestionnaireData {
  _id: string;
  user_id: string;
  actionType: string;
  Environment: Record<string, any>; // You can replace `any` with a more detailed type if needed
  Social: Record<string, any>;
  Governance: Record<string, any>;
  sdg: Array<{ Sdgname: string; Description: string }>;
  Environment_Total: number;
  Social_Total: number;
  Governance_Total: number;
  Questionnaire_Score: number;
  CompletionStatus: number;
  created_at: string;
}

interface ActionProps {
  questionnaireData: QuestionnaireData | null;
}

const Action: React.FC<ActionProps> = ({ questionnaireData }) => {
  console.log("questionnaireData ==> ", questionnaireData);
  const [environmentData, setEnvironmentData] = useState<any>();
  const [governmentData, setGovernmentData] = useState<any>();
  const [socialData, setSocialData] = useState<any>();

  const filteredEnvironmentalMeasures: string[] = [];
  const filteredSocialMeasures: string[] = [];
  const filteredGovernanceMeasures: string[] = [];

  const [ESGData, setESGData] = useState<any>([]);

  const defaultPercentage: any = {
    High: 50,
    Moderate: 30,
    Low: 10
  };

  useEffect(() => {
    setEnvironmentData(questionnaireData?.Environment);
    setGovernmentData(questionnaireData?.Governance);
    setSocialData(questionnaireData?.Social);

    const environmentalData = questionnaireData?.Environment;
    const socialData = questionnaireData?.Social;
    const governanceData = questionnaireData?.Governance;

    const environmentalMeasures: any = [
      "● GHG Emissions/ Carbon footprint reduction: >>> to avoid as much as possible coal and fossil fuels as energy sources, make agreements for using renewable energy providers in all possible areas of operation",
      "● Alternative energy sources: >>> Additional renewable energy sources should be exploited as appropriate, including readily available sources such as solar power and biofuels, that are the least costly and within local parameters and regulations (including assistance from subsidies). [Name of SME] could consider expanding its reliance on [name source of energy, eg. solar panels] since it is presently furnishing its lowest percentage of total energy, or turn to an additional source.",
      "● Energy efficiency: >>> to avoid costly waste in production, service provision, and infrastructure operation, where appropriate and to the extent possible, apply for and use the EU energy efficiency labeling system that ranges from A (the most efficient) to G (the least efficient).",
      "● Water management: >>>  water quantity and quality issues caused by the utility provider, [insert name of utility] require remedial measures from the local administration.",
      "● Alternative water sources:  add only if the client says its water is of “insufficient” quality/quantity: >>> to satisfy a need for more and better quality water, alternative water sources should be identified, including the possibility of harvesting rainwater, reclaimed wastewater, greywater (treated and recycled), captured condensate (from air conditioners etc), desalinated water (if applicable) or more.",
      "● Wastewater management: >>> it is the responsibility of [insert name of wastewater utility] and since  [Name of SME] is not satisfied with how wastewater is treated, sanitary regulations will need corrective measures",
      "● Water discharge issues and pollution prevention",
      ">>> to address these issues, consideration should be given to adopting pollution prevention or pollution reduction methods, including (but not limited to) pre-treatment systems (including filters, screens, and clarifiers), wastewater treatment (including biological processes, chemical treatment, or a combination of both) and microplastics filtration.",
      "● Waste and product management in a circular economy: To keep products and materials in use longer throughout the economy, methods that allow for water treatment, recycling used materials to create new products, and/or convert them into new energy are at the core of the circular economy and key for manufacturers and food producers. To align with best practices for a circular economy, the following measures should be considered:",
      ">>> among possible water treatment methods, consideration should be given to using less hazardous chemicals and/or material substitution (using non-toxic or less toxic alternatives for chemicals or materials used in production), optimising water usage (eg. using water meters and water leaks detector kits, water-saving appliances, water-efficient fixtures like low-flow toilets, etc.) and implementing closed-loop systems that recycle water within the business",
      ">>> to achieve waste reduction, consideration should be given to the possibility of applying one or more of the following methods:  product redesign for reuse/ remanufacturing (i.e. closed loop system), organic waste processed for composting, re-using construction debris for new products, Using alternative materials, promoting recycling, and designing products for circularity (as per proposed EU Packaging and Packaging Waste Directive that should lead to a Packaging Reusability Label), contributing the company’s organic waste to a plant that extracts energy (eg. biogas or electricity through anaerobic digestion or other technologies)",
      ">>> consideration should also be given to establishing or expanding partnerships for the circular economy involving collaborating with business partners or manufacturers to design products that are easier to disassemble, repair, and reuse. ensuring that second-hand merchandise is sellable and does not end up in landfills",
    ];

    filteredEnvironmentalMeasures.push(environmentalMeasures[0]);

    if (environmentalData?.Q3?.answer === 0) {
        // Extract energy sources and their percentages
        const parseEnergyValue = (value: string): number => {
          return defaultPercentage[value] !== undefined 
              ? defaultPercentage[value] 
              : (parseFloat(value) || 0);
        };

        const energySources: any = {
          solar: parseEnergyValue(environmentalData.Q3.solar),
          wind: parseEnergyValue(environmentalData.Q3.wind),
          biofuels: parseEnergyValue(environmentalData.Q3.biofuels),
          hydropower: parseEnergyValue(environmentalData.Q3.hydropower)
        };
    
        // Find the source with the lowest percentage
        const lowestSource = Object.keys(energySources).reduce((a, b) => 
            energySources[a] < energySources[b] ? a : b
        );
    
        // Create the recommendation
        const recommendation = `[Name of SME] could consider expanding its reliance on ${lowestSource} since it is presently furnishing its lowest percentage of total energy, or turn to an additional source.`;
    
        // Push the recommendation to filteredEnvironmentalMeasures
        filteredEnvironmentalMeasures.push({
            ...environmentalMeasures[1],
            recommendation
        });
    }

    filteredEnvironmentalMeasures.push(environmentalMeasures[2]);
    filteredEnvironmentalMeasures.push(environmentalMeasures[3]);
    filteredEnvironmentalMeasures.push(environmentalMeasures[4]);

    if (environmentalData?.Q9?.answer === 0){
      filteredEnvironmentalMeasures.push(environmentalMeasures[5]);
    }

    filteredEnvironmentalMeasures.push(environmentalMeasures[6]);
    filteredEnvironmentalMeasures.push(environmentalMeasures[7]);
    filteredEnvironmentalMeasures.push(environmentalMeasures[8]);
    filteredEnvironmentalMeasures.push(environmentalMeasures[9]);

    if (environmentalData?.Q11?.answer === 0){
      filteredEnvironmentalMeasures.push(environmentalMeasures[10]);
    }
    
    if (environmentalData?.Q12?.answer === 0){
      filteredEnvironmentalMeasures.push(environmentalMeasures[11]);
    }

    const socialDataMeasures = [
      "● Work dignity and equal compensation: Looking beyond wages, i.e. the various forms of monetary and non-monetary rewards provided to employees in exchange for their work,",
      ">>> Financial Compensation:  it would be desirable to consider including one or more of the following that the Name of SME still does not offer: bonuses ( Performance-based bonuses, sign-on bonuses, referral bonuses, holiday bonuses), profit-sharing opportunities (distribution of a percentage of company profits to employees) or stock options (the right to purchase company shares at a predetermined price), commissions (percentage-based rewards for sales or services rendered), tuition reimbursement (financial assistance for employees' education or training).",
      ">>> Lifestyle Benefits Compensation:  it would be desirable to consider including flexible working hours (ability to adjust work schedule for better work-life balance), remote work options (working from home or other locations outside the traditional office), gym memberships or wellness programs (subsidised or free access to fitness facilities or health initiatives), childcare support (on-site childcare facilities, financial assistance for childcare expenses),  employee discounts (reduced prices on company products or services, or partner offerings), meal vouchers or subsidised meals (discounted or free meals at company cafeterias or conventions with local restaurants), company-sponsored events (social gatherings, team-building activities, or holiday parties), relocation assistance (support for employees moving for work purposes).",
      ">>> Other Benefits:  it would be desirable to consider including disability insurance (coverage for income loss due to illness or injury), Life insurance (payment to beneficiaries upon an employee's death), employee assistance programs or EAPs (confidential counseling or support services for personal or work-related issues), professional development opportunities (conferences, training courses, or mentorship programs), sabbaticals or paid leave for personal projects (extended periods of paid leave for personal or professional growth), commuter benefits (subsidized public transportation passes, parking, or company shuttles), opportunities for professional growth (individual professional training or group training)",
      ">>> Collective bargaining with trade unions: In case the level and scope of employees’ compensation (wages and non-wage compensation benefits) are not in line with local union demands, consideration should be given to address this situation",
      "● Equity issues: Equal compensation for equal work is the overriding goal to achieve equity for employees and  Name of SME should consider making additional efforts to reach it, with a need to pay particular attention to:",
      ">>> Gender parity",
      ">>> Immigrants and other vulnerable groups",
      ">>> Persons with disabilities",
      ">>> Work stability: full-time vs. part-time employment and/or permanent vs. temporary staff positions",
      "● Work conditions: They  include a broad range of aspects, such as work flexibility, work safety and protection from environmental and bio-hazards as well as worker health. Considering the benefits are numerous —including a boost in staff morale, increased productivity and job satisfaction, more services for customers, reduction in staff absenteeism and savings on the costs of staff absenteeism and recruitment— consideration should be given to provision of:",
      ">>> Flexible working time",
      ">>> Improved safety and health measures",
      ">>> Worker family health requirements (eg. for mothers and fathers at the moment of birth, care for the sickness of a close relative)",
      ">>> Establishing measures against violence and sexual harassment in the workplace (following guidance from the ILO Violence and Harassment Convention, 2019) in line with the goals of a fair and sustainable work environment; they include implementing clear policies, providing training, and establishing reporting and response procedures",
      "● Community engagement with business partners and customers: As this is an opportunity for the company to establish its presence as a reliable business partner and improve its reputation as a responsible “citizen” engaged in civic activities, it should not be passed up, including:",
      ">>> Product Stewardship to promote the circular economy, for example, participating in Extended Producer Responsibility (EPR) programmes making producers financially responsible for the collection and recycling of their products at the end of their lifespan):",
      ">>> Partnerships with the local community (for example, partnerships with food banks, local schools, shelters, green spaces, or participation in community events)",
    ];

    const availableFinancialCompensations: Record<string, string> = {
      bonuses:
        "bonuses (Performance-based bonuses, sign-on bonuses, referral bonuses, holiday bonuses)",
      profit_sharing:
        "profit-sharing opportunities (distribution of a percentage of company profits to employees)",
      stock_options:
        "stock options (the right to purchase company shares at a predetermined price)",
      commissions:
        "commissions (percentage-based rewards for sales or services rendered)",
      tuition_reimbursement:
        "tuition reimbursement (financial assistance for employees' education or training)",
    };

    const availableLifestyleCompensations: Record<string, string> = {
      flexible_working_hours:
        "flexible working hours (ability to adjust work schedule for better work-life balance), remote work options (working from home or other locations outside the traditional office)",
      gym_memberships:
        "gym memberships or wellness programs (subsidised or free access to fitness facilities or health initiatives)",
      childcare_support:
        "childcare support (on-site childcare facilities, financial assistance for childcare expenses)",
      employee_discounts:
        "employee discounts (reduced prices on company products or services, or partner offerings)",
      meal_vouchers:
        "meal vouchers or subsidised meals (discounted or free meals at company cafeterias or conventions with local restaurants)",
      company_sponsored:
        "company-sponsored events (social gatherings, team-building activities, or holiday parties),",
      relocation_assistance:
        "relocation assistance (support for employees moving for work purposes)",
    };

    const availableOtherBenefits: Record<string, string> = {
      disability_insurance:
        "disability insurance (coverage for income loss due to illness or injury)",
      life_insurance:
        "life insurance (payment to beneficiaries upon an employee's death)",
      employee_assistance:
        "employee assistance programs or EAPs (confidential counseling or support services for personal or work-related issues)",
      professional_development:
        "professional development opportunities (conferences, training courses, or mentorship programs)",
      sabbaticals:
        "sabbaticals or paid leave for personal projects (extended periods of paid leave for personal or professional growth)",
      commuter_benefits:
        "commuter benefits (subsidized public transportation passes, parking, or company shuttles)",
      opportunities_for_professional_growth:
        "opportunities for professional growth (individual professional training or group training)",
    };

    const checkedCompensations1 = socialData?.Q1?.boxes || [];

    // Identify missing compensations with descriptions
    const missingCompensations1 = Object.keys(
      availableFinancialCompensations
    ).filter((comp) => !checkedCompensations1.includes(comp));

    const missingItemsText1 = missingCompensations1
      .map(
        (comp) =>
          availableFinancialCompensations[
            comp as keyof typeof availableFinancialCompensations
          ]
      )
      .join(", ");

    filteredSocialMeasures.push(socialDataMeasures[0]);
    if (
      missingCompensations1.length ===
      Object.keys(availableFinancialCompensations).length
    ) {
      filteredSocialMeasures.push(socialDataMeasures[1]);
    } else if (missingCompensations1.length > 0) {
      filteredSocialMeasures.push(
        `>>> Financial Compensation: It would be desirable to consider including one or more of the following that the Name of SME still does not offer: ${missingItemsText1}.`
      );
    }

    const checkedCompensations2 = socialData?.Q2?.boxes || [];

    // Identify missing compensations with descriptions
    const missingCompensations2 = Object.keys(
      availableLifestyleCompensations
    ).filter((comp) => !checkedCompensations2.includes(comp));

    const missingItemsText2 = missingCompensations2
      .map(
        (comp) =>
          availableLifestyleCompensations[
            comp as keyof typeof availableLifestyleCompensations
          ]
      )
      .join(", ");

    if (
      missingCompensations2.length ===
      Object.keys(availableLifestyleCompensations).length
    ) {
      filteredSocialMeasures.push(socialDataMeasures[2]);
    } else if (missingCompensations2.length > 0) {
      filteredSocialMeasures.push(
        `>>> Lifestyle Benefits Compensation:  it would be desirable to consider including ${missingItemsText2}.`
      );
    }

    const checkedCompensations3 = socialData?.Q3?.boxes || [];

    // Identify missing compensations with descriptions
    const missingCompensations3 = Object.keys(availableOtherBenefits).filter(
      (comp) => !checkedCompensations3.includes(comp)
    );

    const missingItemsText3 = missingCompensations3
      .map(
        (comp) =>
          availableOtherBenefits[comp as keyof typeof availableOtherBenefits]
      )
      .join(", ");

    if (
      missingCompensations3.length ===
      Object.keys(availableOtherBenefits).length
    ) {
      filteredSocialMeasures.push(socialDataMeasures[3]);
    } else if (missingCompensations3.length > 0) {
      filteredSocialMeasures.push(
        `>>> Other Benefits: it would be desirable to consider including ${missingItemsText3}.`
      );
    }

    if (socialData?.Q4?.answer) {
      filteredSocialMeasures.push(socialDataMeasures[4]);
    }

    filteredSocialMeasures.push(socialDataMeasures[5]);

    if (socialData?.Q5?.value === 0) {
      filteredSocialMeasures.push(socialDataMeasures[6]);
    }

    if (socialData?.Q6?.value === 0) {
      filteredSocialMeasures.push(socialDataMeasures[7]);
    }

    if (socialData?.Q7?.answer === 0) {
      filteredSocialMeasures.push(socialDataMeasures[8]);
    }

    if (socialData?.Q8?.answer === 0) {
      filteredSocialMeasures.push(socialDataMeasures[9]);
    }

    filteredSocialMeasures.push(socialDataMeasures[10]);

    if (socialData?.Q10?.answer === 0) {
      filteredSocialMeasures.push(socialDataMeasures[11]);
    }

    if (socialData?.Q11?.answer === 0) {
      filteredSocialMeasures.push(socialDataMeasures[12]);
    }

    if (socialData?.Q13?.answer === 0) {
      filteredSocialMeasures.push(socialDataMeasures[13]);
    }

    if (socialData?.Q14?.answer === 0) {
      filteredSocialMeasures.push(socialDataMeasures[14]);
    }

    filteredSocialMeasures.push(socialDataMeasures[15]);

    if (socialData?.Q15?.answer === 0) {
      filteredSocialMeasures.push(socialDataMeasures[16]);
    }

    if (socialData?.Q16?.answer === 0) {
      filteredSocialMeasures.push(socialDataMeasures[17]);
    }

    // Base Governance Measures
    const governanceMeasures = [
      "● Transparency and anti-corruption: >>> ISO Standard 37001 - anti-bribery management systems - is meant for organizations that want to prevent, detect, and address bribery. It's applicable to any organization, public or private, regardless of size or industry and it is a tool to manage the risk of bribery, not a seal that a firm is free from bribery.  But it is recommended to obtain ISO 37001 certification since it helps establish a culture of integrity, transparency, and compliance within an organization.",
      "● Ethical fund-raising and charitable activities: >>> Name of SME should give consideration to following the general ethical principles set by organisations like the European Fundraising Association (EFA) that are focused on transparency, accountability, and actively working toward obtaining fair tax treatment of charity work",
      "● Carbon offset schemes and other compensation methods:  Name of SME should give consideration to offering its customers a carbon credit or offset scheme or other form of compensation for CO2 emissions, taking however into account the effectiveness and suitability of such schemes as they vary depending on several factors, including the industry, target audience, and the credibility of the chosen compensation mechanism. Such schemes have been found to make sense for:",
      ">>> companies involved in transportation, delivery, or logistics services where carbon offsets may be offered to compensate for emissions generated during transit.",
      ">>> Travel agencies, airlines, and hotels can integrate carbon offset programs into their booking processes, allowing customers to offset the emissions associated with their trips.",
      ">>> Energy providers can offer customers the option to purchase renewable energy credits or invest in carbon offset projects to compensate for the emissions from their energy consumption.",
      ">>> Companies involved in manufacturing or production processes can calculate and disclose the carbon footprint of their products and offer customers the option to offset these emissions at the point of purchase.",
      ">>> Businesses in the agricultural sector can develop carbon offset programs to address emissions from farming practices, such as those related to livestock or fertilizer use.",
      "● Quality management and customer satisfaction:  Since ISO 9001 certificate covers the establishment of quality management systems (QMS) and is one of two cornerstones of several key aspects of sustainable management (the other one being ISO Standard 31000 that specifically covers risk management), it is recommended that Name of SME consider as soon as possible obtaining this ISO certification that calls for taking all the necessary measures to implement, maintain and continually improve its QMS",
      "● Risk Management: Since Name of SME is not yet addressing risk management which is one of two cornerstones of sustainable management (the other one being quality management systems covered by ISO Standard 9001) and as this requires establishing risk planning and control, including environmental control, supply chain risk management, and occupational safety and health management, it is recommended that consideration be given to obtain ISO 31000 certification that calls for taking all the necessary measures as soon as possible.",
    ];

    // Filter points based on the condition (answer === 0 for Governance Q1)
    if (governanceData?.Q1?.answer === 0) {
      filteredGovernanceMeasures.push(governanceMeasures[0]); // Include the first point
    }

    if (governanceData?.Q2?.answer === 0) {
      filteredGovernanceMeasures.push(governanceMeasures[1]); // Include the first point
    }

    if (governanceData?.Q3?.answer === 0) {
      filteredGovernanceMeasures.push(governanceMeasures[3]);
      filteredGovernanceMeasures.push(governanceMeasures[4]);
      filteredGovernanceMeasures.push(governanceMeasures[5]);
      filteredGovernanceMeasures.push(governanceMeasures[6]);
      filteredGovernanceMeasures.push(governanceMeasures[7]);
    }

    if (governanceData?.Q4?.answer === 0) {
      filteredGovernanceMeasures.push(governanceMeasures[8]); // Include the first point
    }

    if (governanceData?.Q5?.answer === 0) {
      filteredGovernanceMeasures.push(governanceMeasures[9]); // Include the first point
    }

    // Add remaining points
    filteredGovernanceMeasures.push(...governanceMeasures.slice(1));

    setESGData([
      {
        ESGtitle: "Environmental Measures",
        ESGdescription: [
          "● GHG Emissions/ Carbon footprint reduction: >>> to avoid as much as possible coal and fossil fuels as energy sources, make agreements for using renewable energy providers in all possible areas of operation",
          "● Alternative energy sources: >>> Additional renewable energy sources should be exploited as appropriate, including readily available sources such as solar power and biofuels, that are the least costly and within local parameters and regulations (including assistance from subsidies). [Name of SME] could consider expanding its reliance on [name source of energy, eg. solar panels] since it is presently furnishing its lowest percentage of total energy, or turn to an additional source.",
          "● Energy efficiency: >>> to avoid costly waste in production, service provision, and infrastructure operation, where appropriate and to the extent possible, apply for and use the EU energy efficiency labeling system that ranges from A (the most efficient) to G (the least efficient).",
          "● Water management: >>>  water quantity and quality issues caused by the utility provider, [insert name of utility] require remedial measures from the local administration.",
          "● Alternative water sources:  add only if the client says its water is of “insufficient” quality/quantity: >>> to satisfy a need for more and better quality water, alternative water sources should be identified, including the possibility of harvesting rainwater, reclaimed wastewater, greywater (treated and recycled), captured condensate (from air conditioners etc), desalinated water (if applicable) or more.",
          "● Wastewater management: >>> it is the responsibility of [insert name of wastewater utility] and since  [Name of SME] is not satisfied with how wastewater is treated, sanitary regulations will need corrective measures",
          "● Water discharge issues and pollution prevention",
          ">>> to address these issues, consideration should be given to adopting pollution prevention or pollution reduction methods, including (but not limited to) pre-treatment systems (including filters, screens, and clarifiers), wastewater treatment (including biological processes, chemical treatment, or a combination of both) and microplastics filtration.",
          "● Waste and product management in a circular economy: To keep products and materials in use longer throughout the economy, methods that allow for water treatment, recycling used materials to create new products, and/or convert them into new energy are at the core of the circular economy and key for manufacturers and food producers. To align with best practices for a circular economy, the following measures should be considered:",
          ">>> among possible water treatment methods, consideration should be given to using less hazardous chemicals and/or material substitution (using non-toxic or less toxic alternatives for chemicals or materials used in production), optimising water usage (eg. using water meters and water leaks detector kits, water-saving appliances, water-efficient fixtures like low-flow toilets, etc.) and implementing closed-loop systems that recycle water within the business",
          ">>> to achieve waste reduction, consideration should be given to the possibility of applying one or more of the following methods:  product redesign for reuse/ remanufacturing (i.e. closed loop system), organic waste processed for composting, re-using construction debris for new products, Using alternative materials, promoting recycling, and designing products for circularity (as per proposed EU Packaging and Packaging Waste Directive that should lead to a Packaging Reusability Label), contributing the company’s organic waste to a plant that extracts energy (eg. biogas or electricity through anaerobic digestion or other technologies)",
          ">>> consideration should also be given to establishing or expanding partnerships for the circular economy involving collaborating with business partners or manufacturers to design products that are easier to disassemble, repair, and reuse. ensuring that second-hand merchandise is sellable and does not end up in landfills",
        ],
        ESGId: 1,
      },
      {
        ESGtitle: "Social Measures",
        ESGdescription: filteredSocialMeasures,
        ESGId: 2,
      },
      {
        ESGtitle: "Governance Measures",
        ESGdescription: filteredGovernanceMeasures,
        ESGId: 3,
      },
    ]);
  }, [questionnaireData]);

  // State to manage the open state of each item
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number): void => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific item's state
    }));
  };

  return (
    <div className={styles.Actions}>
      <div className={styles.taskcont}>
        <div className={styles.taskHeader}>
          <p className={styles.headtxt}>
            Action Plan: Recommended Measures to Achieve Sustainability in the
            Most Cost Effective Way
          </p>
          <p className={styles.desctxt}>
            The table below provides a description of suggested, cost effective
            measures Impakter Pro recommends on the basis of the analysis and
            findings reported in the preceding section. They are presented here
            in a descending order of priority and separated for each category,
            E, S and G, with the most important ones on top of the list:
          </p>
        </div>
        <li className={styles.headertitle}>
          Recommended Measures (descending order of priority)
        </li>
        <div className={styles.actionslist}>
          {ESGData.map((item: any, index: any) => (
            <div className={styles.measuresBox} key={item.ESGId}>
              <div
                className={styles.measureBoxHeader}
                onClick={() => toggleItem(index)}
                style={{ cursor: "pointer" }}
              >
                <p>{item.ESGtitle}</p>
                {openItems[index] ? (
                  <BsDash className={styles.measuresIcon} />
                ) : (
                  <BsPlus className={styles.measuresIcon} />
                )}
              </div>
              {openItems[index] && (
                <>
                  <div className={styles.dividerline}></div>
                  <div className={styles.measuredescription}>
                    {Array.isArray(item.ESGdescription) ? (
                      item.ESGdescription.map((desc: any, idx: any) => (
                        <p key={idx}>{desc}</p> // Render each string as a paragraph
                      ))
                    ) : (
                      <p>{item.ESGdescription}</p> // Fallback for single string
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Action;
