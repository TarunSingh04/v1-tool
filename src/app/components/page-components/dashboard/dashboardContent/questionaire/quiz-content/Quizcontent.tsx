"use client";
import React, { FC, useState } from "react";
import styles from "./styles.module.scss";
import DragFile from "@/app/components/page-components/onboarding-questionaires/questionaire-content/drag-and-drop/Dragfile";

const Quizcontainer1 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [file, setFile] = useState<any>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const onFileChange = (files: any) => {
    console.log(files);
    setFile(files);
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Your carbon footprint and sustainability certificates{" "}
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Have you obtained a measure of your GHG emissions (scope 1, 2) to
          assess the carbon footprint resulting from your activities?
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="ghgEmission"
            onChange={handleOptionChange}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="ghgEmission"
            onChange={handleOptionChange}
          />
          <span>
            {" "}
            No - in this case, you can obtain an estimate of your GHG emissions
            by using our PRO online carbon accounting app
          </span>
        </label>
        <div className={styles.addfile}>
          <p> Upload your GHG Emissions report here:</p>
          <DragFile onFileChange={(files) => onFileChange(files)} fileState={file}/>
        </div>
        <div className={styles.InputWrap}>
          <p>Date Obtained:</p>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            className={styles.dateInput}
          />
        </div>
      </div>
    </>
  );
};

const Quizcontainer2 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Energy source: fossil fuels or green?
      </div>
      <div className={styles.InputSelectWrap}>
        <p>Do you have an energy utility provider?</p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"} // Controlled radio button
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"} // Controlled radio button
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>If Yes, Please Indicate name.</p>
            <input type="text" />
          </div>
        )}
      </div>

      <div className={styles.InputSelectWrap}>
        <p> Do you use any renewable energy sources?</p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "yes"} // Controlled radio button
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "no"} // Controlled radio button
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption2 === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>
              {" "}
              Please indicate your sources, click every box that applies and
              provide the percentage (%) of the total energy you received from
              that source:
            </p>
            <label>
              <input type="radio" value="solar panels" />
              <span>solar panels</span>
              <input type="text" placeholder="%" />
            </label>
            <br />
            <label>
              <input type="radio" value="wind power" />
              <span>wind power</span>
              <input type="text" placeholder="%" />
            </label>
            <br />
            <label>
              <input type="radio" value="biofuels " />
              <span>biofuels </span>
              <input type="text" placeholder="%" />
            </label>
            <br />
            <label>
              <input type="radio" value="hydropower" />
              <span>hydropower</span>
              <input type="text" placeholder="%" />
            </label>
            <br />
          </div>
        )}
      </div>
    </>
  );
};

const Quizcontainer3 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");

  const [selectedOption3, setSelectedOption3] = useState<string>("");
  const [selectedOption4, setSelectedOption4] = useState<string>("");
  const [selectedOption5, setSelectedOption5] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption2(event.target.value);
  };
  const handleOptionChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption3(event.target.value);
  };
  const handleOptionChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption4(event.target.value);
  };
  const handleOptionChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption5(event.target.value);
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Energy efficiency: How to avoid costly waste in production or in
        provision of services and in operating infrastructure
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          {" "}
          Have you obtained an EU energy efficiency label for any part or the
          whole of the products you provide and/or the infrastructure or
          properties you operate in:{" "}
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"} // Controlled radio button
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"} // Controlled radio button
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>
              {" "}
              please indicate % of your total energy use covered by each label
              you have obtained:{" "}
            </p>
            <div className={styles.checkboxcoverage}>
              <h5>Covers less than 50%</h5>
              <label>
                <input
                  type="radio"
                  value="A"
                  name="coverage1"
                  onChange={handleOptionChange3}
                  checked={selectedOption3 === "A"} // Controlled radio button
                />
                <span>A</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="B"
                  name="coverage1"
                  onChange={handleOptionChange3}
                  checked={selectedOption3 === "B"} // Controlled radio button
                />
                <span>B</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="C"
                  name="coverage1"
                  onChange={handleOptionChange3}
                  checked={selectedOption3 === "C"} // Controlled radio button
                />
                <span>C</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="D"
                  name="coverage1"
                  onChange={handleOptionChange3}
                  checked={selectedOption3 === "D"} // Controlled radio button
                />
                <span>D</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="E"
                  name="coverage1"
                  onChange={handleOptionChange3}
                  checked={selectedOption3 === "E"} // Controlled radio button
                />
                <span>E</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="F"
                  name="coverage1"
                  onChange={handleOptionChange3}
                  checked={selectedOption3 === "F"} // Controlled radio button
                />
                <span>F</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="G"
                  name="coverage1"
                  onChange={handleOptionChange3}
                  checked={selectedOption3 === "G"} // Controlled radio button
                />
                <span>G</span>
              </label>
            </div>
            <div className={styles.checkboxcoverage}>
              <h5>Covers from 50% to 80%:</h5>
              <label>
                <input
                  type="radio"
                  value="A"
                  name="coverage2"
                  onChange={handleOptionChange4}
                  checked={selectedOption4 === "A"} // Controlled radio button
                />
                <span>A</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="B"
                  name="coverage2"
                  onChange={handleOptionChange4}
                  checked={selectedOption4 === "B"} // Controlled radio button
                />
                <span>B</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="C"
                  name="coverage2"
                  onChange={handleOptionChange4}
                  checked={selectedOption4 === "C"} // Controlled radio button
                />
                <span>C</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="D"
                  name="coverage2"
                  onChange={handleOptionChange4}
                  checked={selectedOption4 === "D"} // Controlled radio button
                />
                <span>D</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="E"
                  name="coverage2"
                  onChange={handleOptionChange4}
                  checked={selectedOption4 === "E"} // Controlled radio button
                />
                <span>E</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="F"
                  name="coverage2"
                  onChange={handleOptionChange4}
                  checked={selectedOption4 === "F"} // Controlled radio button
                />
                <span>F</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="G"
                  name="coverage2"
                  onChange={handleOptionChange4}
                  checked={selectedOption4 === "G"} // Controlled radio button
                />
                <span>G</span>
              </label>
            </div>
            <div className={styles.checkboxcoverage}>
              <h5>Covers over 80%: </h5>
              <div className={styles.inputcheckcover}>
                <label>
                  <input
                    type="radio"
                    value="A"
                    name="coverage3"
                    onChange={handleOptionChange5}
                    checked={selectedOption5 === "A"} // Controlled radio button
                  />
                  <span>A</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="B"
                    name="coverage3"
                    onChange={handleOptionChange5}
                    checked={selectedOption5 === "B"} // Controlled radio button
                  />
                  <span>B</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="C"
                    name="coverage3"
                    onChange={handleOptionChange5}
                    checked={selectedOption5 === "C"} // Controlled radio button
                  />
                  <span>C</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="D"
                    name="coverage3"
                    onChange={handleOptionChange5}
                    checked={selectedOption5 === "D"} // Controlled radio button
                  />
                  <span>D</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="E"
                    name="coverage3"
                    onChange={handleOptionChange5}
                    checked={selectedOption5 === "E"} // Controlled radio button
                  />
                  <span>E</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="F"
                    name="coverage3"
                    onChange={handleOptionChange5}
                    checked={selectedOption5 === "F"} // Controlled radio button
                  />
                  <span>F</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="G"
                    name="coverage3"
                    onChange={handleOptionChange5}
                    checked={selectedOption5 === "G"} // Controlled radio button
                  />
                  <span>G</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.InputSelectWrap}>
        <p>
          {" "}
          If you haven’t yet obtained any label for energy efficiency or if you
          plan to improve your level of efficiency to obtain a higher label,
          will you carry out an energy audit and implement measures to improve
          energy efficiency within the next 24 months:{" "}
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "yes"} // Controlled radio button
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "no"} // Controlled radio button
          />
          <span>No</span>
        </label>
      </div>
    </>
  );
};

const Quizcontainer4 = () => {
  const [waterRating, setWaterRating] = useState<string>("");
  const [providerName, setProviderName] = useState<string>("");
  const [wasteWaterRating, setWasteWaterRating] = useState<string>("");
  const [wasteWaterProvider, setWasteWaterProvider] = useState<string>("");
  const [pollutionPreventionMethods, setPollutionPreventionMethods] = useState<string[]>([]);
  const [otherMethodDescription, setOtherMethodDescription] = useState<string>("");
  const [noneChecked, setNoneChecked] = useState<boolean>(false);

  const handleWaterRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWaterRating(event.target.value);
  };

  const handleProviderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProviderName(event.target.value);
  };

  const handleWasteWaterRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWasteWaterRating(event.target.value);
  };

  const handleWasteWaterProviderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWasteWaterProvider(event.target.value);
  };

  const handlePollutionPreventionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPollutionPreventionMethods((prev) =>
      prev.includes(value) ? prev.filter((method) => method !== value) : [...prev, value]
    );
  };

  const handleOtherMethodDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherMethodDescription(event.target.value);
  };

  const handleNoneCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoneChecked(event.target.checked);
    if (event.target.checked) {
      setPollutionPreventionMethods([]);
    }
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Energy source: fossil fuels or green?
      </div>

      {/* Water Utility Rating */}
      <div className={styles.InputSelectWrap}>
        <p>Rate your water utility provider: In your opinion, regarding the water you receive:</p>

        <label>
          <input
            type="radio"
            name="waterRating"
            value="Good"
            checked={waterRating === "Good"}
            onChange={handleWaterRatingChange}
          />
          <span>Good</span>
        </label>

        <label>
          <input
            type="radio"
            name="waterRating"
            value="Sufficient"
            checked={waterRating === "Sufficient"}
            onChange={handleWaterRatingChange}
          />
          <span>Sufficient</span>
        </label>

        <label>
          <input
            type="radio"
            name="waterRating"
            value="Insufficient"
            checked={waterRating === "Insufficient"}
            onChange={handleWaterRatingChange}
          />
          <span>Insufficient</span>
        </label>

        <div className={styles.yesInputWrap}>
          <p>Indicate the name of your water utility provider</p>
          <input
            type="text"
            value={providerName}
            onChange={handleProviderNameChange}
            placeholder="Enter provider name"
          />
        </div>
      </div>

      {/* Wastewater Utility Rating */}
      <div className={styles.InputSelectWrap}>
        <p>
        Rate your wastewater utility services: In your opinion, is
          wastewater in your community appropriately treated, following sanitary
          regulations?
        </p>

        <label>
          <input
            type="radio"
            name="wasteWaterRating"
            value="No"
            checked={wasteWaterRating === "No"}
            onChange={handleWasteWaterRatingChange}
          />
          <span>No</span>
        </label>

        <label>
          <input
            type="radio"
            name="wasteWaterRating"
            value="Yes"
            checked={wasteWaterRating === "Yes"}
            onChange={handleWasteWaterRatingChange}
          />
          <span>Yes</span>
        </label>

        <label>
          <input
            type="radio"
            name="wasteWaterRating"
            value="Don’t know"
            checked={wasteWaterRating === "Don’t know"}
            onChange={handleWasteWaterRatingChange}
          />
          <span>Don’t know</span>
        </label>

        <div className={styles.yesInputWrap}>
          <p>Indicate the name of your wastewater utility provider</p>
          <input
            type="text"
            value={wasteWaterProvider}
            onChange={handleWasteWaterProviderChange}
            placeholder="Enter provider name"
          />
        </div>
      </div>

      {/* Pollution Prevention Methods */}
      <div className={styles.InputSelectWrap}>
        <p>Pollution prevention or reduction through production process modification:</p>
        
        <label>
          <input
            type="checkbox"
            value="using less hazardous chemicals"
            checked={pollutionPreventionMethods.includes("using less hazardous chemicals")}
            onChange={handlePollutionPreventionChange}
            disabled={noneChecked}
          />
          <span>Using less hazardous chemicals and/or material substitution</span>
        </label>

        <label>
          <input
            type="checkbox"
            value="optimising water usage"
            checked={pollutionPreventionMethods.includes("optimising water usage")}
            onChange={handlePollutionPreventionChange}
            disabled={noneChecked}
          />
          <span>Optimising water usage</span>
        </label>

        <label>
          <input
            type="checkbox"
            value="implementing closed-loop systems"
            checked={pollutionPreventionMethods.includes("implementing closed-loop systems")}
            onChange={handlePollutionPreventionChange}
            disabled={noneChecked}
          />
          <span>Implementing closed-loop systems that recycle water within the business</span>
        </label>

        <label>
          <input
            type="checkbox"
            value="Other"
            checked={pollutionPreventionMethods.includes("Other")}
            onChange={handlePollutionPreventionChange}
            disabled={noneChecked}
          />
          <span>Other (please describe below)</span>
        </label>

        {pollutionPreventionMethods.includes("Other") && (
          <div className={styles.yesInputWrap}>
            <input
              type="text"
              value={otherMethodDescription}
              onChange={handleOtherMethodDescriptionChange}
              placeholder="Describe other method"
            />
          </div>
        )}

        <label>
          <input
            type="checkbox"
            value="None"
            checked={noneChecked}
            onChange={handleNoneCheckedChange}
          />
          <span>If you apply none of the above methods, check here</span>
        </label>
      </div>
    </>
  );
};

const Quizcontainer5 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const [wasteReductionMethods, setWasteReductionMethods] = useState<string[]>(
    []
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption2(event.target.value);
  };

  // Handle multiselect for waste reduction methods
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (wasteReductionMethods.includes(value)) {
      // If already selected, remove it
      setWasteReductionMethods(
        wasteReductionMethods.filter((method) => method !== value)
      );
    } else {
      // Otherwise, add it
      setWasteReductionMethods([...wasteReductionMethods, value]);
    }
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Waste management: Keeping products and materials in use longer,
        recycling for new products, converting into new energy
      </div>
      <div className={styles.InputSelectWrap}>
        <p> Are you actively engaged in waste reduction:</p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"} // Controlled radio button
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"} // Controlled radio button
          />
          <span>No</span>
        </label>

        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>
              {" "}
              Please indicate how you have achieved waste reduction (check all
              of the following methods you use):
            </p>
            <label>
              <input
                type="checkbox"
                value="product redesign for reuse/remanufacturing"
                onChange={handleCheckboxChange}
                checked={wasteReductionMethods.includes(
                  "product redesign for reuse/remanufacturing"
                )}
              />
              <span>
                Product redesign for reuse/remanufacturing (i.e. closed loop
                system)
              </span>
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="organic waste processed for composting"
                onChange={handleCheckboxChange}
                checked={wasteReductionMethods.includes(
                  "organic waste processed for composting"
                )}
              />
              <span>Organic waste processed for composting</span>
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="re-using construction debris for new products"
                onChange={handleCheckboxChange}
                checked={wasteReductionMethods.includes(
                  "re-using construction debris for new products"
                )}
              />
              <span>Re-using construction debris for new products</span>
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="using alternative materials for circularity"
                onChange={handleCheckboxChange}
                checked={wasteReductionMethods.includes(
                  "using alternative materials for circularity"
                )}
              />
              <span>
                Using alternative materials, promoting recycling, and designing
                products for circularity
              </span>
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="contributing organic waste for energy extraction"
                onChange={handleCheckboxChange}
                checked={wasteReductionMethods.includes(
                  "contributing organic waste for energy extraction"
                )}
              />
              <span>
                Contributing your organic waste to a plant that extracts energy
              </span>
            </label>
          </div>
        )}
      </div>

      <div className={styles.InputSelectWrap}>
        <p>
          {" "}
          Partnerships for the circular economy: This involves collaborating
          with business partners or manufacturers to design products that are
          easier to disassemble, repair, and reuse, ensuring that second-hand
          merchandise is sellable and does not end up in landfills. Are you
          engaged in such partnerships:
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "yes"} // Controlled radio button
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "no"} // Controlled radio button
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption2 === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>
              {" "}
              If desired, give one or more example(s) of successful
              partnership(s) you have achieved:{" "}
            </p>
            <input type="text" />
          </div>
        )}
      </div>
    </>
  );
};
const Quizcontainer6 = () => {
  const [compensations, setCompensations] = useState({
    bonuses: false,
    profitSharing: false,
    stockOptions: false,
    commission: false,
    tuitionReimbursement: false,
    other: false,
    otherDescription: "",
  });

  const [lifestyle, setlifestyle] = useState({
    flexibleWorking: false,
    remoteWork: false,
    gymMembership: false,
    commission2: false,
    childSupport: false,
    employeeDiscount: false,
    mealVouchers: false,
    companySponsoredEvents:false,
    relocationAssistance:false,
    other2: false,
    otherLifeStyle:"",
  });

  const [otherBenefits, setotherBenefits] = useState({
    disabilityInsurance: false,
    lifeInsurance: false,
    eaps: false,
    professionalDevlopment: false,
    paidLeaveforPersonalprojects: false,
    commuterBenefits: false,
    other3: false,
    otherBenefitProvided:"",
  });

  const [genderCompensation, setGenderCompensation] = useState({
    equalCompensation: false,
    someEqualCompensation: false,
    noEqualCompensation: false,
    percentWomenCompensated: "",
    percentWomenCLevel: "",
  });

  const [selectedBargaining, setselectedBargaining] = useState<string>("");
  const [selectedlowPartime, setselectedlowPartime] = useState<string>("");
  const [selectedincreaseDisability, setselectedincreaseDisability] = useState<string>("");
  const [selecteddisabilityCompensated, setselecteddisabilityCompensated] = useState<string>("");
  const [immigrantCompensation, setImmigrantCompensation] = useState({
    equalCompensation: false,
    someEqualCompensation: false,
    noEqualCompensation: false,
    percentImmigrantsCompensated: "",
  });




  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setselectedBargaining(event.target.value);
  };

  const handlelowPartime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setselectedlowPartime(event.target.value);
  };

  const handledisabilityIncrease = (event: React.ChangeEvent<HTMLInputElement>) => {
    setselectedincreaseDisability(event.target.value);
  };

  const handledisabilityCompensated = (event: React.ChangeEvent<HTMLInputElement>) => {
    setselecteddisabilityCompensated(event.target.value);
  };

  const [professionalGrowth, setProfessionalGrowth] = useState({
    noGrowth: false,
    yesGrowth: false,
    individualTraining: false,
    groupTraining: false,
    otherGrowth: false,
    otherGrowthDescription: "",
  });

  const handleProfessionalGrowthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfessionalGrowth((prevState) => ({
      ...prevState,
      noGrowth: value === "noGrowth",
      yesGrowth: value === "yesGrowth",
      individualTraining: value === "yesGrowth" ? prevState.individualTraining : false,
      groupTraining: value === "yesGrowth" ? prevState.groupTraining : false,
      otherGrowth: value === "yesGrowth" ? prevState.otherGrowth : false,
      otherGrowthDescription: value === "yesGrowth" ? prevState.otherGrowthDescription : "",
    }));
  };

  const handleGrowthInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfessionalGrowth((prevState) => ({
      ...prevState,
      otherGrowthDescription: event.target.value,
    }));
  };
  const handleCheckboxChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setProfessionalGrowth((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setCompensations({
      ...compensations,
      [name]: checked,
    });
  };

  const handleInputChange = (event: any) => {
    setCompensations({
      ...compensations,
      otherDescription: event.target.value,
    });
  };

  const handleCheckboxChange2 = (event: any) => {
    const { name, checked } = event.target;
    setlifestyle({
      ...lifestyle,
      [name]: checked,
    });
  };
  const handleInputChange2 = (event: any) => {
    setlifestyle({
      ...lifestyle,
      otherLifeStyle: event.target.value,
    });
  };
  const handleCheckboxChange3 = (event: any) => {
    const { name, checked } = event.target;
    setotherBenefits({
      ...otherBenefits,
      [name]: checked,
    });
  };
  const handleInputChange3 = (event: any) => {
    setotherBenefits({
      ...otherBenefits,
      otherBenefitProvided: event.target.value,
    });
  };

  const handleGenderCompensationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setGenderCompensation({
      ...genderCompensation,
      [name]: checked,
    });
  };

  const handlePercentageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGenderCompensation({
      ...genderCompensation,
      [name]: value,
    });
  };

  const handleImmigrantCompensationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setImmigrantCompensation({
      ...immigrantCompensation,
      [name]: checked,
    });
  };

  const handleImmigrantPercentageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setImmigrantCompensation({
      ...immigrantCompensation,
      [name]: value,
    });
  };



  return (
    <>
      <div className={styles.questionsubHeader}>
        Work dignity and equal compensation
      </div>

      <div className={styles.InputSelectWrap}>
        <p>
          Financial Compensation Beyond wages, the term includes various forms
          of monetary non-monetary rewards provided to employees in exchange for
          their work.What do you include in the range of compensations you offer
          your employees (check all relevant boxes):
        </p>
        <label>
          <input
            type="checkbox"
            name="bonuses"
            checked={compensations.bonuses}
            onChange={handleCheckboxChange}
          />
          Bonuses: Performance-based bonuses, sign-on bonuses, referral bonuses,
          holiday bonuses.
        </label>

        <label>
          <input
            type="checkbox"
            name="profitSharing"
            checked={compensations.profitSharing}
            onChange={handleCheckboxChange}
          />
          Profit-sharing: Distribution of a percentage of company profits to
          employees.
        </label>

        <label>
          <input
            type="checkbox"
            name="stockOptions"
            checked={compensations.stockOptions}
            onChange={handleCheckboxChange}
          />
          Stock options: The right to purchase company shares at a predetermined
          price.
        </label>

        <label>
          <input
            type="checkbox"
            name="commission"
            checked={compensations.commission}
            onChange={handleCheckboxChange}
          />
          Commission: Percentage-based rewards for sales or services rendered.
        </label>

        <label>
          <input
            type="checkbox"
            name="tuitionReimbursement"
            checked={compensations.tuitionReimbursement}
            onChange={handleCheckboxChange}
          />
          Tuition reimbursement: Financial assistance for employees&apos;
          education or training.
        </label>

        <label>
          <input
            type="checkbox"
            name="other"
            checked={compensations.other}
            onChange={handleCheckboxChange}
          />
          Other financial compensations
        </label>

        {compensations.other && (
          <div className={styles.yesInputWrap}>
            <label>If other, please describe briefly:</label>
            <input
              type="text"
              value={compensations.otherDescription}
              onChange={handleInputChange}
              placeholder="Describe other compensation"
            />
          </div>
        )}
      </div>

      <div className={styles.InputSelectWrap}>
        <p>
        Lifestyle Benefits Compensation:
        </p>
        <label>
          <input
            type="checkbox"
            name="flexibleWorking"
            checked={lifestyle.flexibleWorking}
            onChange={handleCheckboxChange2}
          />
          Flexible working hours: Ability to adjust work schedule for better work-life balance.
        </label>

        <label>
          <input
            type="checkbox"
            name="remoteWork"
            checked={lifestyle.remoteWork}
            onChange={handleCheckboxChange2}
          />
          Remote work options: Working from home or other locations outside the traditional office.
        </label>

        <label>
          <input
            type="checkbox"
            name="gymMembership"
            checked={lifestyle.gymMembership}
            onChange={handleCheckboxChange2}
          />
          Gym memberships or wellness programs: Subsidised or free access to fitness facilities or health initiatives.
        </label>

        <label>
          <input
            type="checkbox"
            name="commission2"
            checked={lifestyle.commission2}
            onChange={handleCheckboxChange2}
          />
          Commission: Percentage-based rewards for sales or services rendered.
        </label>

        <label>
          <input
            type="checkbox"
            name="childSupport"
            checked={lifestyle.childSupport}
            onChange={handleCheckboxChange2}
          />
          Childcare support: On-site childcare facilities, financial assistance for childcare expenses.
        </label>
        <label>
          <input
            type="checkbox"
            name="employeeDiscount"
            checked={lifestyle.employeeDiscount}
            onChange={handleCheckboxChange2}
          />
          Employee discounts: Reduced prices on company products or services, or partner offerings.
        </label>
        <label>
          <input
            type="checkbox"
            name="mealVouchers"
            checked={lifestyle.mealVouchers}
            onChange={handleCheckboxChange2}
          />
          Meal vouchers or subsidised meals: Discounted or free meals at company cafeterias or restaurants.
        </label>
        <label>
          <input
            type="checkbox"
            name="companySponsoredEvents"
            checked={lifestyle.companySponsoredEvents}
            onChange={handleCheckboxChange2}
          />
          Company-sponsored events: Social gatherings, team-building activities, or holiday parties.
        </label>
        <label>
          <input
            type="checkbox"
            name="relocationAssistance"
            checked={lifestyle.relocationAssistance}
            onChange={handleCheckboxChange2}
          />
          Relocation assistance: Support for employees moving for work purposes.
        </label>

        <label>
          <input
            type="checkbox"
            name="other2"
            checked={lifestyle.other2}
            onChange={handleCheckboxChange2}
          />
         Other life-style benefits.
        </label>

        {lifestyle.other2 && (
          <div className={styles.yesInputWrap}>
            <label>If other life-style benefit not listed here, please describe briefly:</label>
            <input
              type="text"
              value={lifestyle.otherLifeStyle}
              onChange={handleInputChange2}
              placeholder="Describe other compensation"
            />
          </div>
        )}
      </div>

      <div className={styles.InputSelectWrap}>
        <p>
        Other Benefits for Compensation:
        </p>
        <label>
          <input
            type="checkbox"
            name="disabilityInsurance"
            checked={otherBenefits.disabilityInsurance}
            onChange={handleCheckboxChange3}
          />
           Disability insurance: Coverage for income loss due to illness or injury.
        </label>

        <label>
          <input
            type="checkbox"
            name="lifeInsurance"
            checked={otherBenefits.lifeInsurance}
            onChange={handleCheckboxChange3}
          />
           Life insurance: Payment to beneficiaries upon an employee&apos;s death.
        </label>

        <label>
          <input
            type="checkbox"
            name="eaps"
            checked={otherBenefits.eaps}
            onChange={handleCheckboxChange3}
          />
          Employee assistance programs (EAPs): Confidential counseling or support services for personal or work-related issues.
        </label>

        <label>
          <input
            type="checkbox"
            name="professionalDevlopment"
            checked={otherBenefits.professionalDevlopment}
            onChange={handleCheckboxChange3}
          />
          Professional development opportunities: Conferences, training courses, or mentorship programs.
        </label>

        <label>
          <input
            type="checkbox"
            name="paidLeaveforPersonalprojects"
            checked={otherBenefits.paidLeaveforPersonalprojects}
            onChange={handleCheckboxChange3}
          />
          Sabbaticals or paid leave for personal projects: Extended periods of paid leave for personal or professional growth.
        </label>

        <label>
          <input
            type="checkbox"
            name="commuterBenefits"
            checked={otherBenefits.commuterBenefits}
            onChange={handleCheckboxChange3}
          />
           Commuter benefits: Subsidized public transportation passes, parking, or company shuttles.
        </label>

        <label>
          <input
            type="checkbox"
            name="other3"
            checked={otherBenefits.other3}
            onChange={handleCheckboxChange3}
          />
          Other financial compensations
        </label>

        {otherBenefits.other3 && (
          <div className={styles.yesInputWrap}>
            <label>If other, please describe briefly:</label>
            <input
              type="text"
              value={otherBenefits.otherBenefitProvided}
              onChange={handleInputChange3}
              placeholder="Describe other compensation"
            />
          </div>
        )}
      </div>

      <div className={styles.InputSelectWrap}>
        <p>
        Collective bargaining with trade unions: Is the level and scope of your employees’ compensation (wages and non-wage compensation benefits) in line with local union demands?  
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="bargain"
            onChange={handleOptionChange}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="bargain"
            onChange={handleOptionChange}
          />
          <span>
            {" "}
            No
          </span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="bargain"
            onChange={handleOptionChange}
          />
          <span>
            {" "}
            Not applicable (no trade union) 
          </span>
        </label>
      </div>

      <div className={styles.InputSelectWrap}>
        <p>Gender parity: Equal compensation for equal work is the goal to achieve gender parity. How far is your company from achieving that goal (check the appropriate box and provide % as needed):</p>

        <label>
          <input
            type="checkbox"
            name="equalCompensation"
            checked={genderCompensation.equalCompensation}
            onChange={handleGenderCompensationChange}
          />
          Women and men are compensated equally for equal work
        </label>

        <label>
          <input
            type="checkbox"
            name="someEqualCompensation"
            checked={genderCompensation.someEqualCompensation}
            onChange={handleGenderCompensationChange}
          />
          Some women are compensated at the same level as men for equal work
        </label>

        {genderCompensation.someEqualCompensation && (
          <div className={styles.yesInputWrap}>
            <label>
              Percentage of women so compensated out of the total female workforce:
            </label>
            <input
              type="number"
              name="percentWomenCompensated"
              value={genderCompensation.percentWomenCompensated}
              onChange={handlePercentageChange}
              placeholder="%"
            />
            <label>
              Percentage of women at C-level (managers) out of total at that level:
            </label>
            <input
              type="number"
              name="percentWomenCLevel"
              value={genderCompensation.percentWomenCLevel}
              onChange={handlePercentageChange}
              placeholder="%"
            />
          </div>
        )}

        <label>
          <input
            type="checkbox"
            name="noEqualCompensation"
            checked={genderCompensation.noEqualCompensation}
            onChange={handleGenderCompensationChange}
          />
          No woman is compensated at the same level as men for equal work
        </label>
      </div>

      <div className={styles.InputSelectWrap}>
        <p>Equal compensation for equal work is the goal to achieve full integration for immigrants and vulnerable groups. How far is your company from achieving that goal (check the appropriate box and provide % as needed):</p>

        <label>
          <input
            type="checkbox"
            name="equalCompensation"
            checked={immigrantCompensation.equalCompensation}
            onChange={handleImmigrantCompensationChange}
          />
           Immigrants/vulnerable groups are compensated equally for equal work
        </label>

        <label>
          <input
            type="checkbox"
            name="someEqualCompensation"
            checked={immigrantCompensation.someEqualCompensation}
            onChange={handleImmigrantCompensationChange}
          />
           Some immigrants/vulnerable groups are compensated at the same level for equal work
        </label>

        {immigrantCompensation.someEqualCompensation && (
          <div className={styles.yesInputWrap}>
            <label>
              Percentage of immigrants compensated out of the total group:
            </label>
            <input
              type="number"
              name="(%) is compensated at the same level for equal work "
              value={immigrantCompensation.percentImmigrantsCompensated}
              onChange={handleImmigrantPercentageChange}
              placeholder="%"
            />
          </div>
        )}

        <label>
          <input
            type="checkbox"
            name="noEqualCompensation"
            checked={immigrantCompensation.noEqualCompensation}
            onChange={handleImmigrantCompensationChange}
          />
          No immigrants/vulnerable groups are compensated at the same level for equal work 
        </label>
      </div>

      <div className={styles.InputSelectWrap}>
        <p>
        Collective bargaining with trade unions: Is the level and scope of your employees’ compensation (wages and non-wage compensation benefits) in line with local union demands?  
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="lowPartime"
            onChange={handlelowPartime}
          />
          <span>Yes it is lower</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="lowPartime"
            onChange={handlelowPartime}
          />
          <span>
            {" "}
            No, it is at the same level 
          </span>
        </label>
      </div>

      <div className={styles.InputSelectWrap}>
        <h4> Persons with disabilities: </h4>
        <p>
          a. Is increasing % of persons with disabilities a goal for your company? 
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="increasedisability"
            onChange={handledisabilityIncrease}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="increasedisability"
            onChange={handledisabilityIncrease}
          />
          <span>
            {" "}
            No 
          </span>
        </label>
        <br />
        <br />
        <p>
        b. Persons with disabilities are compensated at the same level for equal work (in answering, please take into account the eventual contribution from governmental schemes designed to support the reintegration of vulnerable groups)?
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="diabilitycompensated"
            onChange={handledisabilityCompensated}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="diabilitycompensated"
            onChange={handledisabilityCompensated}
          />
          <span>
            {" "}
            No 
          </span>
        </label>
      </div>

      <div className={styles.InputSelectWrap}>
        <h4>Opportunities for Professional Growth</h4>
        <label style={{fontSize:"16px",fontWeight:"600"}}>
        <input
            type="radio"
            name="growth"
            value="noGrowth"
            checked={professionalGrowth.noGrowth}
            onChange={handleProfessionalGrowthChange}
          />
          No
        </label>

        <label style={{fontSize:"16px",fontWeight:"600"}}>
        <input
            type="radio"
            name="growth"
            value="yesGrowth"
            checked={professionalGrowth.yesGrowth}
            onChange={handleProfessionalGrowthChange}
          />
          Yes
        </label>

        {professionalGrowth.yesGrowth && (
          <div className={styles.inputWrapsubcheck}>
            <h5>Check all appropriate boxes:</h5>
            <label>
              <input
                type="checkbox"
                name="individualTraining"
                checked={professionalGrowth.individualTraining}
                onChange={handleCheckboxChange4}
              />
              Individual professional training
            </label>

            <label>
              <input
                type="checkbox"
                name="groupTraining"
                checked={professionalGrowth.groupTraining}
                onChange={handleCheckboxChange4}
              />
              Staff reunions/ group training
            </label>

            <label>
              <input
                type="checkbox"
                name="otherGrowth"
                checked={professionalGrowth.otherGrowth}
                onChange={handleCheckboxChange4}
              />
              Other
            </label>

            {professionalGrowth.otherGrowth && (
              <div className={styles.yesInputWrap}>
                <label>Please describe:</label>
                <input
                  type="text"
                  value={professionalGrowth.otherGrowthDescription}
                  onChange={handleGrowthInputChange}
                  placeholder="Describe other professional growth opportunities"
                />
              </div>
            )}
          </div>
        )}
      </div>

    </>
  );
};

const Quizcontainer7 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const [selectedOption3, setSelectedOption3] = useState<string>("");
  const [selectedOption4, setSelectedOption4] = useState<string>("");
  const [selectedOption5, setSelectedOption5] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption2(event.target.value);
  };

  const handleOptionChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption3(event.target.value);
  };
  const handleOptionChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption4(event.target.value);
  };

  const handleOptionChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption5(event.target.value);
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Work conditions: Flexibility, safety and health
      </div>
      <div className={styles.InputSelectWrap}>
        <p>Flexible working time: Do you provide it:</p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "yes"} // Controlled radio button
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "no"}
          />
          <span>No</span>
        </label>
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Safety and health measures: do you have obtained a certificate to
          prove you have such measures in place to protect your employees:
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>If yes, please give name:</p>
            <input type="text" />
            <p>If yes, please give number:</p>
            <input type="text" />
          </div>
        )}
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          If you have no certificates or the certificates you hold are not
          either based on ISO 45001 or SO8000, do you have any safety and/or
          health measures in place for your employees?
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider3"
            onChange={handleOptionChange3}
            checked={selectedOption3 === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider3"
            onChange={handleOptionChange3}
            checked={selectedOption3 === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption3 === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>
              If yes, briefly describe your employee safety and/or health
              measures:{" "}
            </p>
            <input type="text" />
          </div>
        )}
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Worker family health requirements (eg. for mothers and fathers at the
          moment of birth, care for the sickness of a close relative): Do you
          have measures in place to respond to the health needs of your
          employees or their immediate family (children or parent) that are
          additional to what is required by law in your country:
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider4"
            onChange={handleOptionChange4}
            checked={selectedOption4 === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider4"
            onChange={handleOptionChange4}
            checked={selectedOption4 === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption4 === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>If yes, Explain briefly what measures:</p>
            <input type="text" />
          </div>
        )}
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Measures against violence and sexual harassment in the workplace: Have
          you put in place measures to address this issue that are additional to
          what is required by law in your country:
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider5"
            onChange={handleOptionChange5}
            checked={selectedOption5 === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider5"
            onChange={handleOptionChange5}
            checked={selectedOption5 === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption5 === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>
              If yes, briefly describe the measures against violence and sexual
              harassment that you have in place:
            </p>
            <input type="text" />
          </div>
        )}
      </div>
    </>
  );
};
const Quizcontainer8 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Community engagement with business partners and customers
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Do you engage in Product Stewardship to promote the circular economy,
          such as, for example, participating in Extended Producer
          Responsibility (EPR) programmes (EPR means that producers are held to
          be financially responsible for the collection and recycling of their
          products at the end of their lifespan):{" "}
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider0"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider0"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption2 === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>If yes, briefly indicate in what programme</p>
            <input type="text" />
          </div>
        )}
      </div>

      <div className={styles.InputSelectWrap}>
        <p>Do you participate in local community partnerships: </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>
              If yes, explain briefly your community activities, such as, for
              example, partnerships with food banks, local schools, shelters,
              green spaces, or participation in community events:{" "}
            </p>
            <input type="text" />
          </div>
        )}
      </div>
    </>
  );
};
const Quizcontainer9 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div className={styles.questionsubHeader}>
        Transparency and anti-corruption:
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          {" "}
          Do you follow the ISO 37001 principles and criteria for anti-fraud and
          anti-money laundering activities and have you obtained certification
          demonstrating that you do so?{" "}
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>
              If yes, give name of the certification body that provided you with
              the certification and year obtained:
            </p>
            <p>Name:</p>
            <input type="text" />
            <p>Year:</p>
            <input type="text" />
          </div>
        )}
      </div>
    </>
  );
};
const Quizcontainer10 = () => {
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const handleOptionChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Ethical fund-raising and charitable activities
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          {" "}
          Are you already following the general ethical principles set by
          organisations like the European Fundraising Association (EFA) that are
          focused on transparency, accountability, and fair tax treatment of
          charities?{" "}
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "yes"} // Controlled radio button
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "no"}
          />
          <span>No</span>
        </label>
      </div>
    </>
  );
};
const Quizcontainer11 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div className={styles.questionsubHeader}>
        Carbon offset schemes and other compensation methods
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Do you offer to your customers a carbon credit or offset scheme or
          other form of compensation for CO2 emissions?{" "}
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>please indicate which scheme or compensation package you use:</p>
            <input type="text" />
          </div>
        )}
      </div>
    </>
  );
};
const Quizcontainer12 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div className={styles.questionsubHeader}>
        Quality management and customer satisfaction
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Have you considered taking measures for improved quality management, a
          cornerstone of several aspects of sustainable management? (skip
          question if you hold ISO 9001 certification)
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>If yes, describe briefly the measures taken</p>
            <input type="text" />
          </div>
        )}
      </div>
    </>
  );
};
const Quizcontainer13 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div className={styles.questionsubHeader}>Risk management</div>
      <div className={styles.InputSelectWrap}>
        <p>
          {" "}
          Have you considered taking measures for improved risk management, a
          cornerstone of several aspects of sustainable management? (skip
          question if you hold ISO 31000)
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>If yes, describe briefly the measures taken</p>
            <input type="text" />
          </div>
        )}
      </div>
    </>
  );
};
const Quizcontainer14 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Data security and privacy protection
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Have you achieved compliance with the General Data Protection
          Regulation (GDPR), a regulation enforced by the EU to ensure legal
          compliance with a focus on individual rights:{" "}
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "yes"} // Controlled radio button
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider2"
            onChange={handleOptionChange2}
            checked={selectedOption2 === "no"}
          />
          <span>No</span>
        </label>
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Have you taken measures to improve information security? (skip this
          question if you hold ISO 27001 certification)
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>If yes, describe briefly the measures taken</p>
            <input type="text" />
          </div>
        )}
      </div>
    </>
  );
};

const Quizcontainer15 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [documents, setDocuments] = useState([
    { title: "", provider: "", regNumber: "" },
  ]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  // Handle input change for document fields
  const handleDocumentChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setDocuments(newDocuments);
  };

  // Add a new document when "+" button is clicked
  const addDocument = () => {
    setDocuments([...documents, { title: "", provider: "", regNumber: "" }]);
  };

  return (
    <>
      <div className={styles.questionsubHeader}>
        Sector-specific Sustainability Certificates
      </div>
      <div className={styles.InputSelectWrap}>
        <p>
          Do you hold any sector-specific or particular sustainability
          certificate in addition to the ones you have already indicated here?
        </p>
        <label>
          <input
            type="radio"
            value="yes"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "yes"}
          />
          <span>Yes</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="no"
            name="energyProvider"
            onChange={handleOptionChange}
            checked={selectedOption === "no"}
          />
          <span>No</span>
        </label>

        {/* Conditionally render the input if "Yes" is selected */}
        {selectedOption === "yes" && (
          <div className={styles.yesInputWrap}>
            <p>If yes, please indicate the following:</p>

            {/* Render the document input fields dynamically */}
            {documents.map((doc, index) => (
              <div key={index}>
                <p>Title of document</p>
                <input
                  type="text"
                  value={doc.title}
                  onChange={(e) =>
                    handleDocumentChange(index, "title", e.target.value)
                  }
                />
                <p>Name of Provider</p>
                <input
                  type="text"
                  value={doc.provider}
                  onChange={(e) =>
                    handleDocumentChange(index, "provider", e.target.value)
                  }
                />
                <p>Registration Number</p>
                <input
                  type="text"
                  value={doc.regNumber}
                  className={styles.lowerInputBox}
                  onChange={(e) =>
                    handleDocumentChange(index, "regNumber", e.target.value)
                  }
                />
              </div>
            ))}

            {/* Button to add new document fields */}
            <button onClick={addDocument} className={styles.adddoc}>
              Add more documents +
            </button>
          </div>
        )}
      </div>
    </>
  );
};

interface QuizcontentProps {
  setQuiz: React.Dispatch<React.SetStateAction<boolean>>;
}

const Quizcontent: FC<QuizcontentProps> = ({ setQuiz }) => {
  const [quizNumber, setquizNumber] = useState(1);

  const nextQuestionaire = () => {
    setquizNumber(quizNumber + 1);
  };

  const previousQuestionaire = () => {
    setquizNumber(quizNumber - 1);
  };

  const submitQuestionaire = () => {
    setQuiz(false);
    console.log("questionaire submitted");
  };
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button
          className={styles.closebtn}
          onClick={() => {
            setQuiz(false);
          }}
        >
          X
        </button>
        {quizNumber < 6 && <h3>ENVIRONMENT</h3>}
        {quizNumber > 5 && quizNumber < 9 && <h3>SOCIAL</h3>}
        {quizNumber > 8 && quizNumber < 16 && <h3>GOVERNANCE </h3>}
        {quizNumber === 1 && <Quizcontainer1 />}
        {quizNumber === 2 && <Quizcontainer2 />}
        {quizNumber === 3 && <Quizcontainer3 />}
        {quizNumber === 4 && <Quizcontainer4 />}
        {quizNumber === 5 && <Quizcontainer5 />}
        {quizNumber === 6 && <Quizcontainer6 />}
        {quizNumber === 7 && <Quizcontainer7 />}
        {quizNumber === 8 && <Quizcontainer8 />}
        {quizNumber === 9 && <Quizcontainer9 />}
        {quizNumber === 10 && <Quizcontainer10 />}
        {quizNumber === 11 && <Quizcontainer11 />}
        {quizNumber === 12 && <Quizcontainer12 />}
        {quizNumber === 13 && <Quizcontainer13 />}
        {quizNumber === 14 && <Quizcontainer14 />}
        {quizNumber === 15 && <Quizcontainer15 />}

        {quizNumber !== 15 && (
          <div className={quizNumber === 1 ? styles.btnBox1 : styles.btnBox}>
            {quizNumber !== 1 && (
              <div className={styles.btnBox}>
                <button
                  className={styles.continuebtn}
                  onClick={previousQuestionaire}
                >
                  Back
                </button>
              </div>
            )}
            <button className={styles.continuebtn} onClick={nextQuestionaire}>
              Continue
            </button>
          </div>
        )}

        {quizNumber === 15 && (
          <div className={styles.btnBox}>
            <div className={styles.btnBox}>
              <button
                className={styles.continuebtn}
                onClick={previousQuestionaire}
              >
                Back
              </button>
            </div>
            <button className={styles.continuebtn} onClick={submitQuestionaire}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizcontent;
