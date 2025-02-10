"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import EditProfile from "../../../assets/upload.png";
import country_data from "../../../utilities/country_data";
import sector_data from "../../../utilities/sectors_data";
import utility_data from "../../../utilities/utility_data";
import certificate_data from "../../../utilities/certificate_data";
import DragFile from "./drag-and-drop/Dragfile";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { MdClose, MdOutlineFileUpload } from "react-icons/md";
import MultiSelect from "./multi-select/MultiSelect";
import SingleSelect from "./single-select/SingleSelect";
import utility_sector from "../../../utilities/utility_sector";
import certi_ISO from "../../../utilities/certi_ISO";
import certi_3rd from "../../../utilities/certi_3rd";
import certi_Others from "../../../utilities/certi_Others";
import deleteIcon from "../../../assets/onboard_delete.png";
import EditIcon from "../../../assets/onboardEdit.svg";
import CertificatesLogo from "../../../assets/certificateLogo.svg";
import warningIcon from "../../../assets/sectorAddWarn.svg";
import warnalert from "../../../assets/alertWarn.svg";
import onboardingErrorStore from "../../../store/onboardingErrorStore";

interface QuestionaireProps {
  questionaireStep: number; // Current state value (1-based index)
  setquestionaireState: React.Dispatch<React.SetStateAction<number>>; // Function to update state
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setoverFlow: any
}

const fileTypes = ["PDF", "DOC"];

const Questionaire: React.FC<QuestionaireProps> = ({
  questionaireStep,
  setquestionaireState,
  setCurrentStep,
  currentStep,
  setoverFlow
}) => {
  const router = useRouter();
  const [companyName, setcompanyName] = useState("");
  const [registrationName, setregistrationName] = useState("");
  const [companyRegistrationNumber, setcompanyRegistrationNumber] =
    useState("");
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const [selectedSector, setSelectedSector] = useState<any>([]);
  const [selectedUtilitySector, setselectedUtilitySector] = useState<any>([]);
  const [selectedUtility, setSelectedUtility] = useState<any>([]);
  const [certificates, setcertificates] = useState<any>([]);
  const [Epds, setEpds] = useState<any>([]);
  const [otherCertificates, setotherCertificates] = useState<any>([]);
  const [SelectISO, setSelectISO] = useState<any>([]);
  const [newUtilitiesData, setnewUtilitiesData] = useState<any>([]);
  const [newUtilitiesSector, setnewUtilitiesSector] = useState<any>([]);
  const [newUtilitiesName, setnewUtilitiesName] = useState<any>("");
  const [newUtilitiesLink, setnewUtilitiesLink] = useState<any>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [Accounting, setAccounting] = useState<any>([]);
  const [Advertisement, setAdvertisement] = useState<any>([]);
  const [BasicUtils, setBasicUtils] = useState<any>([]);
  const [Engineering, setEngineering] = useState<any>([]);
  const [Equipment, setEquipment] = useState<any>([]);
  const [Facilities, setFacilities] = useState<any>([]);
  const [Financial, setFinancial] = useState<any>([]);
  const [Itservices, setItservices] = useState<any>([]);
  const [Legalservices, setLegalservices] = useState<any>([]);
  const [Operational, setOperational] = useState<any>([]);
  const [Telecommunications, setTelecommunications] = useState<any>([]);
  const [Transportation, setTransportation] = useState<any>([]);
  const [WasteManagement, setWasteManagement] = useState<any>([]);
  const [ErrorMessage, setErrorMessage] = useState<any>("");

  const [newCertificatesData, setnewCertificatesData] = useState<any>([]);
  const [newCertificatesCountry, setnewCertificatesCountry] = useState<any>("");
  const [newCertificatesLink, setnewCertificatesLink] = useState<any>("");
  const [editCertificatesIndex, setEditCertificatesIndex] = useState<
    number | null
  >(null);
  const [newCertificateNAme, setnewCertificateNAme] = useState<any>("");
  const [certificatefile, setcertificateFile] = useState<any>(null);

  const [utility_datas, setutility_datas] = useState<any>([]);
  const [addCertificatePopUp, setaddCertificatePopUp] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [continuePopUp, setcontinuePopUp] = useState(false);
  const [utiltiyPopUp, setutilityPopUp] = useState(false);
  const [newCertificateData, setnewCertificateData] = useState([]);
  const [loaderpopUp, setloaderpopUp] = useState(false);
  const [sectors, setsectors] = useState<any>([]);
  const onboardingError = onboardingErrorStore((state) => state.onboardingErrorStore);
  const setOnboardingError = onboardingErrorStore((state) => state.setonboardingErrorStore);
  // Maintain separate selected states for each sector
  const [selectedUtilities, setSelectedUtilities] = useState(
    Array(selectedUtilitySector.length).fill([])
  );
  const steps: number[] = [0, 1, 2, 3.1, 3.2, 4];

  const checkSelectedStates = () => {
    const arrays = [
      { label: "Accounting", state: Accounting },
      { label: "Advertisement Companies", state: Advertisement },
      { label: "Basic Utilities", state: BasicUtils },
      { label: "Engineering & Architectural", state: Engineering },
      { label: "Equipment Rental and Leasing", state: Equipment },
      { label: "Facilities Maintenance", state: Facilities },
      { label: "Financial Services", state: Financial },
      { label: "IT services", state: Itservices },
      { label: "Legal services", state: Legalservices },
      { label: "Office and Operational Utilities", state: Operational },
      { label: "Telecommunications", state: Telecommunications },
      { label: "Transportation & Logistics", state: Transportation },
      { label: "Waste Management", state: WasteManagement },
    ];
  
    // Find labels in `selectedUtilitySector` whose corresponding states are empty
    const emptyStates = selectedUtilitySector.filter((dataItem: any) => {
      const match = arrays.find((item) => item.label === dataItem.label); // Match the label
      return match && match.state.length === 0; // Check if the state is empty
    });
  
    if (emptyStates.length > 0) {
      const emptyStateLabels = emptyStates.map((state:any) => state.label);
      setErrorMessage(`The following selected utility sectors have no data: ${emptyStateLabels.join(", ")}`);
      return 0; // Indicate failure
    } else {
      console.log("All selected utility sectors have data.");
      return 1; // Indicate success
    }
  };
  
  

  const handleNext = (): void => {
    const currentIndex = steps.indexOf(currentStep);
  
    if (currentStep === 1) {
      if (!companyName || !registrationName || !companyRegistrationNumber || !selectedImage) {
        setErrorMessage("Please fill in all required fields to proceed.");
        setOnboardingError(true);
        return;
      }
    } else if (currentStep === 2) {
      if (!selectedCountry || selectedSector.length === 0) {
        setErrorMessage("Please fill in all required fields to proceed.");
        setOnboardingError(true);
        return;
      }
      else if( selectedSector.length > 4){
        setErrorMessage("Please select atleast 1 or atmost 4 sectors to proceed.");
        setOnboardingError(true);
        return;
      }
    } else if (currentStep === 3.1) {
      if (selectedUtilitySector.length < 3) {
        setErrorMessage("Please select at least 3 to proceed.");
        setOnboardingError(true);
        return;
      }
    } else if (currentStep === 3.2) {
      if (!checkSelectedStates()) {
        setOnboardingError(true);
        return; // Prevent proceeding if checkSelectedStates fails
      }
    }
  
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setErrorMessage("");
      setOnboardingError(false);
    }
  };
  
  

  // Function to update selected utilities for a specific index
  const handleChangeSelected = (index: number, newSelection: any) => {
    setSelectedUtilities((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = newSelection;
      return updatedState;
    });
  };

  const handleSaveCertificate = () => {
    if (
      !newCertificateNAme ||
      !newCertificatesCountry ||
      !newCertificatesLink ||
      !certificatefile
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newCertificate = {
      name: newCertificateNAme,
      country: newCertificatesCountry,
      website: newCertificatesLink,
      file: certificatefile,
    };

    if (editCertificatesIndex !== null) {
      // Update existing certificate
      const updatedCertificatesData = [...newCertificatesData];
      updatedCertificatesData[editCertificatesIndex] = newCertificate;
      setnewCertificatesData(updatedCertificatesData);
      setEditCertificatesIndex(null); // Clear edit mode
    } else {
      // Add new certificate
      setnewCertificatesData([...newCertificatesData, newCertificate]);
    }

    // Reset fields
    setnewCertificateNAme("");
    setnewCertificatesCountry("");
    setnewCertificatesLink("");
    setcertificateFile(null);
    closeCertificatePopUp();
  };

  const handleEditCertificate = (index: number) => {
    setaddCertificatePopUp(true); // Open the popup

    const certificateToEdit = newCertificatesData[index];
    setnewCertificateNAme(certificateToEdit.name);
    setnewCertificatesCountry(certificateToEdit.country); // Ensure the country state is set
    setnewCertificatesLink(certificateToEdit.website);
    setcertificateFile(certificateToEdit.file); // Retain the file
    setEditCertificatesIndex(index);
  };

  const handleDeleteCertificate = (index: number) => {
    const updatedCertificatesData = newCertificatesData.filter(
      (_: any, i: any) => i !== index
    );
    setnewCertificatesData(updatedCertificatesData);
  };

  const changeCompanyName = (event: any) => {
    setcompanyName(event.target.value);
  };
  const changeRegistrationName = (event: any) => {
    setregistrationName(event.target.value);
  };
  const changeCompanyRegistrationNumber = (event: any) => {
    setcompanyRegistrationNumber(event.target.value);
  };

  const saveUtility = () => {
    if (
      !newUtilitiesName ||
      !newUtilitiesLink ||
      newUtilitiesSector.length === 0
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newUtility = {
      sector: newUtilitiesSector,
      name: newUtilitiesName,
      link: newUtilitiesLink,
    };

    if (editIndex !== null) {
      // Edit existing utility
      const updatedUtilities = [...newUtilitiesData];
      updatedUtilities[editIndex] = newUtility;
      setnewUtilitiesData(updatedUtilities);
      setEditIndex(null);
    } else {
      // Add new utility
      setnewUtilitiesData([...newUtilitiesData, newUtility]);
    }

    // Clear inputs
    setnewUtilitiesSector([]);
    setnewUtilitiesName("");
    setnewUtilitiesLink("");
    // setutilityPopUp(false);
    closeutilityPopUp();
  };

  // Function to delete utility
  const deleteUtility = (index: number) => {
    const updatedUtilities = newUtilitiesData.filter(
      (_: any, i: any) => i !== index
    );
    setnewUtilitiesData(updatedUtilities);
  };

  // Function to edit utility
  const editUtility = (index: number) => {
    const utilityToEdit = newUtilitiesData[index];
    setnewUtilitiesSector(utilityToEdit.sector);
    setnewUtilitiesName(utilityToEdit.name);
    setnewUtilitiesLink(utilityToEdit.link);
    setEditIndex(index);
    setutilityPopUp(true); // Open the popup for editing
  };

  const closeutilityPopUp = () => {
    setutilityPopUp(false);
    setoverFlow(false)
  };

  const openutilityPopUp = () => {
    setutilityPopUp(true);
    setoverFlow(true);
  };

  const closeCertificatePopUp = () => {
    setaddCertificatePopUp(false);
    setoverFlow(false)
  };

  const openCertificatePopUp = () => {
    setaddCertificatePopUp(true);
    setoverFlow(true);
  };

  const closeContinuePopUp = () => {
    setcontinuePopUp(false);
    setoverFlow(false)
  };

  const openContinuePopUp = () => {
    setcontinuePopUp(true);
    setoverFlow(true);
  };

  const onFileChange = (files: any) => {
    console.log(files);
    setFile(files);
  };

  const onCertificateFileChange = (files: any) => {
    console.log(files);
    setcertificateFile(files);
  };

  useEffect(() => {
    if (selectedCountry && selectedUtilitySector.length > 0) {
      console.log(selectedCountry);
      console.log(selectedUtilitySector);
      const filteredUtilities = utility_data
        .filter((utility) => {
          // First filter by country
          return utility.countryCode === selectedCountry.value;
        })
        .filter((utility) => {
          // Then filter by any one of the sector values in selectedUtilitySector
          return selectedUtilitySector.some(
            (sector: any) => sector.value === utility.sectorName
          );
        });
      console.log(filteredUtilities);
      setutility_datas(filteredUtilities);
    } else {
      setutility_datas([]);
    }
  }, [selectedCountry, selectedUtilitySector]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage("");
  };


  const previousQuestionaire = () => {
    setquestionaireState(questionaireStep - 1);
  };

  const submitQuestionaire = () => {
    console.log("questionaire submitted");
    router.push("/pages/pricing");
  };

  const handleChange = (file: any) => {
    setFile(file);
  };

  const submitOnboardingData = async () => {
    const accessToken = localStorage.getItem('access_token');
  
    const requestData = {
      companyName,
      registrationName,
      companyRegistrationNumber,
      companyLogo: selectedImage,
      selectedCountry,
      selectedSector,
      selectedUtilitySector,
      selectedUtility: [
        ...Accounting,
        ...Advertisement,
        ...BasicUtils,
        ...Engineering,
        ...Equipment,
        ...Facilities,
        ...Financial,
        ...Itservices,
        ...Legalservices,
        ...Operational,
        ...Telecommunications,
        ...Transportation,
        ...WasteManagement,
      ],
      certificates,
      otherCertificates,
      SelectISO,
      Epds,
      newUtilitiesData,
      newCertificatesData,
    };
  
    try {
      setloaderpopUp(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || 'Failed to submit onboarding data');
      }
  
      console.log('Onboarding data submitted successfully:', result);
      setoverFlow(true);
      localStorage.setItem("onboarding", "true");
      router.push('/pages/dashboard'); // Redirect to the dashboard after success
    } catch (error: any) {
      setoverFlow(true);
      console.error('Error submitting onboarding data:', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };  

  const navigateTo = () => {
    setloaderpopUp(true);
    router.push("/pages/dashboard");
    console.log({
      companyName,
      registrationName,
      companyRegistrationNumber,
      selectedImage,
      selectedCountry,
      selectedSector,
      selectedUtilitySector,
      selectedUtility: [
        ...Accounting,
        ...Advertisement,
        ...BasicUtils,
        ...Engineering,
        ...Equipment,
        ...Facilities,
        ...Financial,
        ...Itservices,
        ...Legalservices,
        ...Operational,
        ...Telecommunications,
        ...Transportation,
        ...WasteManagement,
      ],
      certificates,
      otherCertificates,
      SelectISO,
      Epds,
      newUtilitiesData,
      newCertificatesData,
    });
    setoverFlow(true);
  };
  return (
    <div className={styles.sidenavQuestion}>
      <div className={styles.questionaire1}>
        <li className={styles.stepcounthead}>
          <span>
            <GoDotFill />
          </span>
          0{questionaireStep}
        </li>
        {questionaireStep === 1 && (
          <div className={styles.question1content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Company Details</p>
              <p className={styles.loginsubHead}>
                Please complete all fields marked with an asterisk (*)
              </p>
            </div>
            <div className={styles.wrapperInputBox1}>
              <p>Company Name*</p>
              <input
                type="text"
                placeholder="Enter Your Company Name"
                value={companyName}
                onChange={changeCompanyName}
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Registration Name*</p>
              <input
                type="text"
                placeholder="Enter Your Registration "
                value={registrationName}
                onChange={changeRegistrationName}
              />
            </div>
            <div className={styles.wrapperInputBox1}>
              <p>Company Registration Number*</p>
              <input
                type="text"
                placeholder="Enter Your Registration Number"
                value={companyRegistrationNumber}
                onChange={changeCompanyRegistrationNumber}
              />
            </div>

            <div className={styles.ImageContainer}>
              <Image
                src={selectedImage || EditProfile} // Conditionally render the uploaded image or the default
                width={80}
                height={80}
                alt="profile"
                className={styles.ProfileImage}
              />
              <div className={styles.ImageButtons}>
                <label className={styles.uploadButton}>
                  <MdOutlineFileUpload className={styles.uploadIcon} />
                  UPLOAD LOGO
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
                <button
                  className={styles.removeButton}
                  onClick={handleRemoveImage}
                  disabled={!selectedImage}
                >
                  REMOVE LOGO
                </button>
              </div>
            </div>

            {
             onboardingError && ErrorMessage!=="" && <div className={styles.ErrorContainer}><Image src={warnalert} width={16} height={16} alt="none" className={styles.warningIcon}/><p>{ErrorMessage}</p></div>
            }
          </div>
        )}

        {questionaireStep === 2 && (
          <div className={styles.question2content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Account Information</p>
              <p className={styles.loginsubHead}>
                Please complete all fields marked with an asterisk (*)
              </p>
            </div>
            <div className={styles.wrapperInputBox} style={{marginBottom:"20px"}}>
              <p>Select Country*</p>
              <SingleSelect
                placeholder="Select Your Country"
                fieldData={country_data}
                setState={setSelectedCountry}
                state={selectedCountry}
              />
            </div>

            <div className={styles.wrapperInputBox}>
              <p>Select Sectors*</p>
              <MultiSelect
                placeholder="Select Your Sectors"
                data={sector_data.sort((a, b) =>
                  a.label.localeCompare(b.label)
                )}
                onChangeSelected={setSelectedSector}
                selectedData={selectedSector}
              />
              {(selectedSector.length<1 || selectedSector.length>4) && 
                <span className={styles.sectorDesc}><Image src={warningIcon} width={15} height={15} alt="none" style={{marginRight:"7px",marginBottom:"5px"}}/>Select at least 1 or atmost 4 sectors</span>
              }
            </div>
            {
             onboardingError &&  ErrorMessage!=="" && <div className={styles.ErrorContainer}><Image src={warnalert} width={16} height={16} alt="none" className={styles.warningIcon}/><p>{ErrorMessage}</p></div>
            }
          </div>
        )}

        {questionaireStep === 3.1 && (
          <div className={styles.question2content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Utility Details</p>
              <p className={styles.loginsubHead}>
                Please provide detailed information about your company&apos;s
                utilities, including multiple utilities and sectors that apply
                to your business.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utilities sector</p>
              <MultiSelect
                placeholder="Select Utility Sector"
                data={utility_sector.sort((a, b) =>
                  a.label.localeCompare(b.label)
                )}
                onChangeSelected={setselectedUtilitySector}
                selectedData={selectedUtilitySector}
              />
              {selectedUtilitySector.length<3 && 
                <span className={styles.sectorDesc}><Image src={warningIcon} width={15} height={15} alt="none" style={{marginRight:"7px"}}/>Select at least three utilities</span>
              }
            </div>
            {
              onboardingError && ErrorMessage!=="" && <div className={styles.ErrorContainer}><Image src={warnalert} width={16} height={16} alt="none" className={styles.warningIcon}/><p>{ErrorMessage}</p></div>
            }
          </div>
        )}

        {questionaireStep === 3.2 && (
          <div className={styles.question2content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Utility Details</p>
              <p className={styles.loginsubHead}>
                Please provide detailed information about your company&apos;s
                utilities, including multiple utilities and sectors that apply
                to your business.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utility Categories & Providers*</p>
              {/* {selectedUtilitySector.length !== 0 &&
                selectedUtilitySector.map((dataItems: any, index: any) => {
                  return (
                    <div key={index}>
                      <MultiSelect
                        placeholder={`Select ${dataItems}`}
                        data={utility_data}
                        onChangeSelected={setSelectedUtility}
                        selectedData={selectedUtility}
                      />
                      <div className={styles.spacer}></div>
                      <div className={styles.spacer}></div>
                    </div>
                  );
                })} */}

              {selectedUtilitySector.length !== 0 &&
                selectedUtilitySector.map((dataItems: any, index: any) => {
                  // Filter utility_data dynamically based on sectorName === dataItems
                  const filteredData = utility_data.filter(
                    (utilityItem: any) => utilityItem.sectorName === dataItems.label
                  );

                  return (
                    <div key={index}>
                      {/* {dataItems==="Accounting" &&<>    
                    <MultiSelect
                      placeholder={`Select ${dataItems}`}
                      data={filteredData} // Pass the filtered data here
                      onChangeSelected={setAccounting}
                      selectedData={Accounting}
                    />
                    <div className={styles.spacer}></div>
                    <div className={styles.spacer}></div></>}
                    {dataItems==="Advertisement Companies" &&<>    
                    <MultiSelect
                      placeholder={`Select ${dataItems}`}
                      data={filteredData} // Pass the filtered data here
                      onChangeSelected={setAdvertisement}
                      selectedData={Advertisement}
                    />
                    <div className={styles.spacer}></div>
                    <div className={styles.spacer}></div></>} */}

              
                      {dataItems.label === "Accounting" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} // Pass the filtered data here
                            onChangeSelected={setAccounting}
                            selectedData={Accounting}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Advertisement Companies" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} // Pass the filtered data here
                            onChangeSelected={setAdvertisement}
                            selectedData={Advertisement}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Basic Utilities" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setBasicUtils}
                            selectedData={BasicUtils}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Engineering & Architectural" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setEngineering}
                            selectedData={Engineering}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Equipment Rental and Leasing" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setEquipment}
                            selectedData={Equipment}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Facilities Maintenance" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setFacilities}
                            selectedData={Facilities}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Financial Services" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setFinancial}
                            selectedData={Financial}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "IT services" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setItservices}
                            selectedData={Itservices}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Legal services" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setLegalservices}
                            selectedData={Legalservices}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Office and Operational Utilities" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setOperational}
                            selectedData={Operational}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Telecommunications" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setTelecommunications}
                            selectedData={Telecommunications}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Transportation & Logistics" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setTransportation}
                            selectedData={Transportation}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                      {dataItems.label === "Waste Management" && (
                        <>
                          <MultiSelect
                            placeholder={`Select ${dataItems.label}`}
                            data={filteredData.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )} 
                            onChangeSelected={setWasteManagement}
                            selectedData={WasteManagement}
                          />
                          <div className={styles.spacer}></div>
                          <div className={styles.spacer}></div>
                        </>
                      )}
                    </div>
                  );
                })}
              {selectedUtilitySector.length === 0 && (
                <p
                  className={styles.utilityMessage}
                  style={{ color: "#7C7C7C", fontWeight: "400" }}
                >
                  Please select a Utility sector before choosing a Utility
                  Category & Provider.
                </p>
              )}

              <div className={styles.certificateLinks}>
                Missing your utility?{" "}
                <span onClick={openutilityPopUp}>+ ADD HERE</span>
              </div>
              <div className={styles.newutilityData}>
                {newUtilitiesData.map((utilitiesItem: any, index: any) => (
                  <div className={styles.newutilitiesItems} key={index}>
                    <div className={styles.leftcont}>
                      <div className={styles.utilityName}>
                        {utilitiesItem.name}
                      </div>
                      <a
                        href={utilitiesItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.websiteUrl}
                      >
                        {utilitiesItem.link}
                      </a>
                    </div>

                    <div className={styles.rightcont}>
                      <Image
                        src={EditIcon} // Update path to your EditIcon
                        width={20}
                        height={20}
                        alt="Edit"
                        className={styles.EditIcon}
                        onClick={() => editUtility(index)}
                      />
                      <Image
                        src={deleteIcon} // Update path to your DeleteIcon
                        width={18}
                        height={22}
                        alt="Delete"
                        className={styles.DeleteIcon}
                        onClick={() => deleteUtility(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {
              onboardingError && ErrorMessage!=="" && <div className={styles.ErrorContainer}><Image src={warnalert} width={16} height={16} alt="none" className={styles.warningIcon}/><p>{ErrorMessage}</p></div>
            }
          </div>
        )}

        {questionaireStep === 4 && (
          <div className={styles.question1content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Certificate Details</p>
              <p className={styles.loginsubHead}>
                Please provide detailed information about your company&apos;s
                certifications. Ensure to upload relevant documentation for
                accuracy and authenticity.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Certificates*</p>
              <MultiSelect
                placeholder="Select Certificates"
                data={certi_3rd.sort((a, b) =>
                  a.label.localeCompare(b.label)
                )} 
                onChangeSelected={setcertificates}
                selectedData={certificates}
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Other Certificates*</p>
              <MultiSelect
                placeholder="Select Other Certificates"
                data={certi_Others.sort((a, b) =>
                  a.label.localeCompare(b.label)
                )} 
                onChangeSelected={setotherCertificates}
                selectedData={otherCertificates}
              />
            </div>

            <p className={styles.certificateLinks}>
              Can&apos;t find your certificate?{" "}
              <span onClick={openCertificatePopUp}>+ ADD HERE</span>
            </p>

            <div className={styles.wrapperInputBox}>
              <p>ISO*</p>
              <MultiSelect
                placeholder="Select ISO"
                data={certi_ISO.sort((a, b) =>
                  a.label.localeCompare(b.label)
                )} 
                onChangeSelected={setSelectISO}
                selectedData={SelectISO}
              />
            </div>
            {/* <div className={styles.wrapperInputBox}>
              <p>EPDs*</p>
              <MultiSelect
                placeholder="Select EPDs"
                data={certificate_data}
                onChangeSelected={setEpds}
                selectedData={Epds}
              />
            </div> */}
            <p className={styles.certificateLinks}>
              Don&apos;t have a certificate?{" "}
              <span onClick={openContinuePopUp}>Skip this step</span>
            </p>
            <div className={styles.newCertificatesData}>
              {newCertificatesData.map((certificate: any, index: number) => (
                <div className={styles.newCertificatesItems} key={index}>
                  <div className={styles.leftcont}>
                    <Image
                      src={CertificatesLogo} // Replace with the actual certificate icon path
                      width={52}
                      height={52}
                      alt="Certificate"
                      className={styles.certificateLogo}
                    />
                    <div className={styles.Infodata}>
                      <div className={styles.certificateName}>
                        {certificate.name}
                      </div>
                      <a
                        href={certificate.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.websiteUrl}
                      >
                        {certificate.website}
                      </a>
                    </div>
                  </div>
                  <div className={styles.rightcont}>
                    <Image
                      src={EditIcon} // Replace with the actual edit icon path
                      width={20}
                      height={20}
                      alt="Edit"
                      className={styles.EditIcon}
                      onClick={() => handleEditCertificate(index)}
                    />
                    <Image
                      src={deleteIcon} // Replace with the actual delete icon path
                      width={18}
                      height={22}
                      alt="Delete"
                      className={styles.DeleteIcon}
                      onClick={() => handleDeleteCertificate(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
            {
              onboardingError && ErrorMessage!=="" && <div className={styles.ErrorContainer}><Image src={warnalert} width={16} height={16} alt="none" className={styles.warningIcon}/><p>{ErrorMessage}</p></div>
            }
          </div>
        )}

        {questionaireStep < 4 && (
          <div className={styles.btnBox}>
            <button
              className={styles.continuebtn}
              onClick={() => {
                handleNext()
              }}
            >
              NEXT STEP
            </button>
          </div>
        )}

        {questionaireStep === 4 && (
          <div className={styles.btnBox}>
            <button
              className={styles.continuebtn}
              onClick={submitOnboardingData}
            >
              GET STARTED
            </button>
          </div>
        )}
      </div>

      {addCertificatePopUp && (
        <div className={styles.container}>
          <div className={styles.boxCont1}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={closeCertificatePopUp}
                />
              </div>
              <h2 className={styles.title}>Add Your Certificate</h2>
              <p className={styles.description}>
                Please upload the certificate and provide necessary details.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Certificate Name*</p>
              <input
                type="text"
                placeholder="Enter Certificate Name"
                value={newCertificateNAme}
                onChange={(e) => setnewCertificateNAme(e.target.value)}
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Select Country*</p>
              <SingleSelect
                placeholder="Select Your Country"
                fieldData={country_data}
                setState={setnewCertificatesCountry}
                state={newCertificatesCountry}
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Website Link*</p>
              <input
                type="text"
                placeholder="Paste Website Url"
                value={newCertificatesLink}
                onChange={(e) => setnewCertificatesLink(e.target.value)}
              />
            </div>
            <DragFile
              onFileChange={onCertificateFileChange}
              fileState={certificatefile}
            />
            <button className={styles.button} onClick={handleSaveCertificate}>
              {editCertificatesIndex !== null
                ? "Update Certificate"
                : "Save Certificate"}
            </button>
          </div>
        </div>
      )}

      {utiltiyPopUp && (
        <div className={styles.container}>
          <div className={styles.boxCont1}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={()=>{closeutilityPopUp()}}
                />
              </div>
              <h2 className={styles.title}>Add Your Utility</h2>
              <p className={styles.description}>
                Please provide details about the utility.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utility Sector</p>
              <MultiSelect
                placeholder="Select Your Sectors"
                data={utility_sector.sort((a, b) =>
                  a.label.localeCompare(b.label)
                )} 
                onChangeSelected={setnewUtilitiesSector}
                selectedData={newUtilitiesSector}
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utility name</p>
              <input
                type="text"
                value={newUtilitiesName}
                onChange={(e) => setnewUtilitiesName(e.target.value)}
                placeholder="Enter Utility Name"
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Website</p>
              <input
                type="text"
                value={newUtilitiesLink}
                onChange={(e) => setnewUtilitiesLink(e.target.value)}
                placeholder="Paste Website URL"
              />
            </div>
            <button className={styles.button} onClick={saveUtility}>
              {editIndex !== null ? "UPDATE UTILITY" : "SAVE UTILITY"}
            </button>
          </div>
        </div>
      )}

      {continuePopUp && (
        <div className={styles.container}>
          <div className={styles.boxCont}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={closeContinuePopUp}
                />
              </div>
              <h2 className={styles.title}>Would you like to proceed?</h2>
              <p className={styles.description}>
                Skipping the process may lead to lower score, Are you sure you
                want to proceed?
              </p>
            </div>

            <div className={styles.buttoncontpopup}>
              <button className={styles.button1} onClick={closeContinuePopUp}>
                &lt; GO BACK
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  navigateTo();
                }}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      )}

      {loaderpopUp && (
        <div className={styles.container}>
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
};

export default Questionaire;
