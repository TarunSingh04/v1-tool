"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";
import EditProfile from "../../../assets/upload.png";
import exclaimIcon from "../../../assets/circleexclaimsettings.svg";
import { ChevronDown } from "lucide-react";
import settingsLinkIcon from "../../../assets/settingsLink.svg";
import SearchBar from "./searchbar/Searchbar";
import utility_sector from "@/app/components/utilities/utility_sector";
import MultiSelect2 from "../multiselect2/Multiselect2";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`;

const CompanyProfile = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImage2, setSelectedImage2] = useState("");
  const [sector, setsector] = useState("");
  const [descriptionCode, setdescriptionCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+44");
  const [description, setDescription] = useState("");
  const [sustainabilityActivity, setSustainabilityActivity] = useState("");
  const [companyActivity, setCompanyActivity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyRegistrationNumber, setCompanyRegistrationNumber] =
    useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [awards, setAwards] = useState("");
  const [awardsLink, setAwardsLink] = useState("");
  const [awardsYear, setAwardsYear] = useState("");
  const [linkedBrands, setLinkedBrands] = useState<any>([]);
  const [utilities, setUtilities] = useState<any>([]);
  const [dateEstablished, setDateEstablished] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [seleactedSearchLocation, setseleactedSearchLocation] = useState("");
  const [phoneData, setPhoneData] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const profile = data.company_profile;
        setCompanyName(profile.companyName || "");
        setCompanyRegistrationNumber(profile.companyRegistrationNumber || "");
        setEmail(profile.email || "");
      } else {
        console.error("Failed to fetch user data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch data on component mount
  }, []);

  // Handle input change
  const handleInputChange = (event: any) => {
    setVatNumber(event.target.value); // Update state with input value
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value); // Update state with input value
  };

  const handleStreetAddressChange2 = (event: any) => {
    setStreetAddress2(event.target.value); // Update state with input value
  };

  const handleStreetAddressChange = (event: any) => {
    setStreetAddress(event.target.value); // Update state with input value
  };

  const handleCityChange = (event: any) => {
    setCity(event.target.value); // Update state with input value
  };
  const handleRegionChange = (event: any) => {
    setRegion(event.target.value); // Update state with input value
  };

  const handleDateChange = (event: any) => {
    setDateEstablished(event.target.value); // Update state with input value
  };
  const handleAwardsChange = (event: any) => {
    setAwards(event.target.value); // Update state with input value
  };
  const handleAwardsLinkChange = (event: any) => {
    setAwardsLink(event.target.value); // Update state with input value
  };
  const handleFacebookLinkChange = (event: any) => {
    setFacebookLink(event.target.value); // Update state with input value
  };
  const handleTwitterLinkChange = (event: any) => {
    setTwitterLink(event.target.value); // Update state with input value
  };
  const handleLinkedLinkChange = (event: any) => {
    setLinkedinLink(event.target.value); // Update state with input value
  };
  const handleVideoLinkChange = (event: any) => {
    setVideoLink(event.target.value); // Update state with input value
  };

  const handleCompanyActivityChange = (event: any) => {
    setCompanyActivity(event.target.value); // Update state with input value
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value); // Update state with input value
  };
  const handleSustainabilityActivityChange = (event: any) => {
    setSustainabilityActivity(event.target.value); // Update state with input value
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage("");
  };
  const handleImageChange2 = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage2(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage2 = () => {
    setSelectedImage2("");
  };

  const handleTextChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.length <= 500) {
      setter(value);
    }
  };

  // Handle country code selection
  const handleCodeSelect = (code: any) => {
    const number = phoneData.split(" ").slice(1).join(" "); // Extract current number
    setSelectedCode(code);
    setPhoneData(`${number}`); // Update phoneData with new code
    setIsOpen(false); // Close the dropdown
  };

  // Handle phone number input
  const handleNumberChange = (event: any) => {
    const number = event.target.value; // Get the input number
    setPhoneData(`${number}`); // Combine with selected code
  };

  const countryCodes = [
    { code: "+1", country: "United States & Canada" },
    { code: "+7", country: "Russia" },
    { code: "+20", country: "Egypt" },
    { code: "+27", country: "South Africa" },
    { code: "+30", country: "Greece" },
    { code: "+31", country: "Netherlands" },
    { code: "+32", country: "Belgium" },
    { code: "+33", country: "France" },
    { code: "+34", country: "Spain" },
    { code: "+36", country: "Hungary" },
    { code: "+39", country: "Italy" },
    { code: "+40", country: "Romania" },
    { code: "+41", country: "Switzerland" },
    { code: "+43", country: "Austria" },
    { code: "+44", country: "United Kingdom" },
    { code: "+45", country: "Denmark" },
    { code: "+46", country: "Sweden" },
    { code: "+47", country: "Norway" },
    { code: "+48", country: "Poland" },
    { code: "+49", country: "Germany" },
    { code: "+51", country: "Peru" },
    { code: "+52", country: "Mexico" },
    { code: "+54", country: "Argentina" },
    { code: "+55", country: "Brazil" },
    { code: "+56", country: "Chile" },
    { code: "+57", country: "Colombia" },
    { code: "+58", country: "Venezuela" },
    { code: "+60", country: "Malaysia" },
    { code: "+61", country: "Australia" },
    { code: "+62", country: "Indonesia" },
    { code: "+63", country: "Philippines" },
    { code: "+64", country: "New Zealand" },
    { code: "+65", country: "Singapore" },
    { code: "+66", country: "Thailand" },
    { code: "+81", country: "Japan" },
    { code: "+82", country: "South Korea" },
    { code: "+84", country: "Vietnam" },
    { code: "+86", country: "China" },
    { code: "+90", country: "Turkey" },
    { code: "+91", country: "India" },
    { code: "+92", country: "Pakistan" },
    { code: "+93", country: "Afghanistan" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+95", country: "Myanmar" },
    { code: "+98", country: "Iran" },
    { code: "+212", country: "Morocco" },
    { code: "+213", country: "Algeria" },
    { code: "+216", country: "Tunisia" },
    { code: "+218", country: "Libya" },
    { code: "+220", country: "Gambia" },
    { code: "+221", country: "Senegal" },
    { code: "+234", country: "Nigeria" },
    { code: "+254", country: "Kenya" },
    { code: "+255", country: "Tanzania" },
    { code: "+256", country: "Uganda" },
    { code: "+260", country: "Zambia" },
    { code: "+263", country: "Zimbabwe" },
    { code: "+351", country: "Portugal" },
    { code: "+352", country: "Luxembourg" },
    { code: "+353", country: "Ireland" },
    { code: "+354", country: "Iceland" },
    { code: "+355", country: "Albania" },
    { code: "+358", country: "Finland" },
    { code: "+359", country: "Bulgaria" },
    { code: "+370", country: "Lithuania" },
    { code: "+371", country: "Latvia" },
    { code: "+372", country: "Estonia" },
    { code: "+380", country: "Ukraine" },
    { code: "+381", country: "Serbia" },
    { code: "+385", country: "Croatia" },
    { code: "+386", country: "Slovenia" },
    { code: "+420", country: "Czech Republic" },
    { code: "+421", country: "Slovakia" },
    { code: "+886", country: "Taiwan" },
    { code: "+961", country: "Lebanon" },
    { code: "+962", country: "Jordan" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+971", country: "United Arab Emirates" },
    { code: "+972", country: "Israel" },
    { code: "+974", country: "Qatar" },
    { code: "+977", country: "Nepal" },
    { code: "+994", country: "Azerbaijan" },
    { code: "+995", country: "Georgia" },
    { code: "+998", country: "Uzbekistan" },
  ].sort((a, b) => a.country.localeCompare(b.country));

  const LinkedBrands: any = [
    {
      value: "Brand1",
      label: "Brand1",
    },
    {
      value: "Brand2",
      label: "Brand2",
    },
    {
      value: "Brand3",
      label: "Brand3",
    },
    {
      value: "Brand4",
      label: "Brand4",
    },
  ];
  const addressSuggestions = [
    "123 Main Street",
    "456 Elm Street",
    "789 Pine Street",
    "101 Maple Avenue",
  ];

  const fetchCompanyProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/company-profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        const profile = data.company_profile;
        setCompanyName(profile.companyName || "");
        setCompanyRegistrationNumber(profile.companyRegistrationNumber || "");
        setsector(profile.sector || "");

        setSelectedCode(profile.selectedCode || ""); // Set country code
        setPhoneData(profile.phoneData || "");

        setdescriptionCode(profile.descriptionCode || "");
        setVatNumber(profile.vatNumber || "");
        setEmail(profile.email || "");
        setseleactedSearchLocation(profile.streetAddress1 || "");
        setStreetAddress(profile.streetAddress2 || "");
        setStreetAddress2(profile.streetAddress3 || "");
        setCity(profile.city || "");
        setRegion(profile.region || "");
        setCountry(profile.country || "");
        setCompanySize(profile.companySize || "");
        setAwards(profile.awards || "");
        setAwardsLink(profile.awardsLink || "");
        setAwardsYear(profile.awardsYear || "");

        // Map linkedBrands to the expected format, filtering out invalid entries
        const transformedLinkedBrands = (profile.linkedBrands || [])
          .filter((brand: any) => brand?.value && brand?.label) // Filter valid brands
          .map((brand: any) => ({
            value: brand.value,
            label: brand.label,
          }));
        setLinkedBrands(transformedLinkedBrands);

        // Use utilities as-is since they are already in the correct format
        const transformedUtilities = (profile.utilities || []).filter(
          (utility: any) => utility?.value && utility?.label
        ); // Filter valid utilities
        setUtilities(transformedUtilities);

        setDescription(profile.description || "");
        setSustainabilityActivity(profile.sustainabilityActivity || "");
        setCompanyActivity(profile.companyActivity || "");
        setDateEstablished(profile.dateEstablished || "");
        setFacebookLink(profile.facebookLink || "");
        setTwitterLink(profile.twitterLink || "");
        setLinkedinLink(profile.linkedinLink || "");
        setVideoLink(profile.videoLink || "");
      } else {
        console.error("Failed to fetch profile:", data.error);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Call the function on component mount
  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const profileData = {
      companyName,
      companyRegistrationNumber,
      sector,
      selectedCode,
      phoneData,
      descriptionCode,
      vatNumber,
      email,
      streetAddress1: seleactedSearchLocation,
      streetAddress2: streetAddress,
      streetAddress3: streetAddress2,
      city,
      region,
      country,
      companySize,
      awards,
      awardsLink,
      awardsYear,
      linkedBrands,
      utilities,
      description,
      sustainabilityActivity,
      companyActivity,
      dateEstablished,
      facebookLink,
      twitterLink,
      linkedinLink,
      videoLink,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/company-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Profile saved successfully:", data);
      } else {
        console.error("Failed to save profile:", data.error);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className={styles.companyProfile}>
      <div className={styles.ImageContainer}>
        <Image
          src={selectedImage || EditProfile} // Conditionally render the uploaded image or the default
          width={80}
          height={80}
          alt="profile"
          className={styles.ProfileImage}
          style={{ borderRadius: "16px" }}
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

      <div className={styles.companyInfocont}>
        <div className={styles.leftcont}>
          <div className={styles.wrapperInputBox2}>
            <p>Company Name</p>
            <input
              type="text"
              placeholder="Enter Company Name"
              disabled
              value={companyName}
            />
          </div>
          <div className={styles.wrapperInputBox2}>
            <p>Company Registration Number</p>
            <input
              type="text"
              placeholder="Enter Company Registration Number"
              disabled
              value={companyRegistrationNumber}
            />
          </div>
          <div className={styles.wrapperInputBox3}>
            <div className={styles.wrapperInputBox2}>
              <p>Sector code</p>
              <select
                className={styles.select}
                value={sector}
                onChange={(e) => setsector(e.target.value)}
              >
                <option value="">Enter Sector Code</option>
                <option value="1001">1001</option>
                <option value="1002">1002</option>
                <option value="1003">1003</option>
              </select>
            </div>
            <div className={styles.wrapperInputBox2}>
              <p>Description code</p>
              <select
                className={styles.select}
                value={descriptionCode}
                onChange={(e) => setdescriptionCode(e.target.value)}
              >
                <option value="">Enter Description Code</option>
                <option value="d1001">d1001</option>
                <option value="d1002">d1002</option>
                <option value="d1003">d1003</option>
              </select>
            </div>
          </div>
          <div className={styles.wrappertxtshow}>
            <Image
              src={exclaimIcon}
              width={16}
              height={16}
              alt="none"
              className={styles.exclaimIcons}
            />
            Maximum 4 codes allowed
          </div>
        </div>
        <div className={styles.rightcont}>
          <div className={styles.phoneWrapper}>
            <label className={styles.label}>Phone Number</label>
            <div className={styles.inputContainer}>
              {/* Dropdown button */}
              <div className="relative">
                <button
                  type="button"
                  className={styles.dropdownButton}
                  onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
                >
                  <span className="text-sm">{selectedCode}</span>
                  <ChevronDown className={styles.dropdownIcon} />
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                  <div className={styles.dropdownMenu}>
                    <ul className={styles.dropdownList}>
                      {countryCodes.map(({ code, country }) => (
                        <li
                          key={code}
                          className={styles.dropdownItem}
                          onClick={() => handleCodeSelect(code)}
                        >
                          <span>{code}</span>
                          <span>{country}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Phone number input */}
              <input
                type="tel"
                className={styles.phoneInput}
                placeholder="Enter phone number"
                value={phoneData}
                onChange={handleNumberChange} // Update phoneData on input
              />
            </div>
          </div>
          <div className={styles.wrapperInputBox1}>
            <p>VAT Number</p>
            <input
              type="text"
              placeholder="Enter VAT Number"
              value={vatNumber} // Bind input value to state
              onChange={handleInputChange} // Update state on input change
            />
          </div>
          <div className={styles.wrapperInputBox1}>
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email} // Bind input value to state
              onChange={handleEmailChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.companyInfocont2}>
        <div className={styles.leftcont}>
          <p className={styles.socialHeader2}>Address</p>
          <SearchBar
            placeholder="Enter Street Address"
            onSelect={setseleactedSearchLocation}
            suggestions={addressSuggestions}
            value={streetAddress2} // Bind input value to state
            onChange={handleStreetAddressChange2}
          />
          <div className={styles.wrapperInputBox1}>
            <input
              type="text"
              placeholder="Enter Street Address"
              value={streetAddress} // Bind input value to state
              onChange={handleStreetAddressChange}
            />
          </div>
          <div className={styles.wrapperInputBox6}>
            <div className={styles.wrapperInputBox2}>
              <input
                type="text"
                placeholder="City"
                value={city} // Bind input value to state
                onChange={handleCityChange}
              />
            </div>
            <div className={styles.wrapperInputBox2}>
              <input
                type="text"
                placeholder="Region"
                value={region} // Bind input value to state
                onChange={handleRegionChange}
              />
            </div>
          </div>
          <div className={styles.wrapperInputBox5}>
            <select
              className={styles.select}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              <option value="Germany">Germany</option>
              <option value="Spain">Spain</option>
              <option value="France">France</option>
              <option value="England">England</option>
            </select>
          </div>
          <div className={styles.wrapperInputBox1}>
            <p>Date Established</p>
            <input
              type="text"
              placeholder="Enter Date Established"
              value={dateEstablished}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className={styles.rightcont}>
          <p className={styles.socialHeader}>Social Media</p>
          <div className={styles.wrapperInputBox4}>
            <Image
              src={settingsLinkIcon}
              width={22}
              height={12}
              alt="none"
              className={styles.linkIcon}
            />
            <input
              type="text"
              placeholder="Facebook Link"
              value={facebookLink}
              onChange={handleFacebookLinkChange}
            />
          </div>

          <div className={styles.wrapperInputBox4}>
            <Image
              src={settingsLinkIcon}
              width={22}
              height={12}
              alt="none"
              className={styles.linkIcon}
            />
            <input
              type="text"
              placeholder="Twitter Link"
              value={twitterLink}
              onChange={handleTwitterLinkChange}
            />
          </div>

          <div className={styles.wrapperInputBox4}>
            <Image
              src={settingsLinkIcon}
              width={22}
              height={12}
              alt="none"
              className={styles.linkIcon}
            />
            <input
              type="text"
              placeholder="Linkedin Link"
              value={linkedinLink}
              onChange={handleLinkedLinkChange}
            />
          </div>

          <div className={styles.wrapperInputBox4}>
            <Image
              src={settingsLinkIcon}
              width={22}
              height={12}
              alt="none"
              className={styles.linkIcon}
            />
            <input
              type="text"
              placeholder="Video Link (Youtube/Vimeo)"
              value={videoLink}
              onChange={handleVideoLinkChange}
            />
          </div>

          <p className={styles.socialHeader1}>Company Size</p>
          <div className={styles.wrapperInputBox4}>
            <select
              className={styles.select}
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
            >
              <option value="">Select Company Size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1001-5000">1001-5000 employees</option>
              <option value="5000+">5000+ employees</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.companyInfocont2}>
        <div className={styles.leftcont}>
          <p className={styles.socialHeader}>Select Awards</p>
          <div className={styles.wrapperInputBox7}>
            <input
              type="text"
              placeholder="Name Of The Award"
              value={awards}
              onChange={handleAwardsChange}
            />
            <select
              className={styles.select}
              value={awardsYear}
              onChange={(e) => setAwardsYear(e.target.value)}
            >
              <option value="">Select Year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div className={styles.wrapperInputBox4}>
            <Image
              src={settingsLinkIcon}
              width={22}
              height={12}
              alt="none"
              className={styles.linkIcon}
            />
            <input
              type="text"
              placeholder="Paste The Link Of The Award"
              value={awardsLink}
              onChange={handleAwardsLinkChange}
            />
          </div>
          <p className={styles.socialHeader2}>Linked Brands</p>
          <MultiSelect2
            placeholder={"Select linked brands"}
            data={LinkedBrands} // Dataset for dropdown
            onChangeSelected={(selectedBrands) => {
              const updatedBrands = selectedBrands.map((brand) => ({
                value: brand,
                label: brand,
              }));
              setLinkedBrands(updatedBrands);
            }}
            list={linkedBrands.map((brand: any) => brand.value)} // Pass only values
          />
        </div>

        <div className={styles.rightcont}>
          <div className={styles.ImageContainer2}>
            <div className={styles.ImageButtons}>
              <label className={styles.uploadButton}>
                <MdOutlineFileUpload className={styles.uploadIcon} />
                UPLOAD LOGO
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange2}
                  style={{ display: "none" }}
                />
              </label>
              <button
                className={styles.removeButton}
                onClick={handleRemoveImage2}
                disabled={!selectedImage2}
              >
                REMOVE LOGO
              </button>
            </div>
          </div>
          <p className={styles.socialHeader2}>Select Utilities</p>
          <MultiSelect2
            placeholder={"Select number of utilities"}
            data={utility_sector} // Dataset for dropdown
            onChangeSelected={(selectedUtilities) => {
              const updatedUtilities = selectedUtilities.map((utility) => ({
                value: utility,
                label: utility,
              }));
              setUtilities(updatedUtilities);
            }}
            list={utilities.map((utility: any) => utility.value)} // Pass only values
          />
        </div>
      </div>

      <div className={styles.companyInfocont3}>
        <div className={styles.leftcont}>
          <div className={styles.txtDescription}>
            <div className={styles.textAreaheader}>
              <p className={styles.socialHeader}>Description</p>
              <p className={styles.warning}>Max. 500 characters</p>
            </div>
            <textarea
              rows={7}
              className={styles.textArea}
              placeholder="Please describe your business activities"
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  handleTextChange(e.target.value, setDescription);
                }
              }}
            />
          </div>
          <div className={styles.txtDescription2}>
            <div className={styles.textAreaheader}>
              <p className={styles.socialHeader}>
                Company Sustainability Activity
              </p>
              <p className={styles.warning1}>Max. 500 characters</p>
            </div>
            <textarea
              rows={7}
              className={styles.textArea}
              placeholder="Please describe your business activities"
              value={sustainabilityActivity}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  handleTextChange(e.target.value, setSustainabilityActivity);
                }
              }}
            />
          </div>
        </div>
        <div className={styles.rightcont}>
          <div className={styles.txtDescription}>
            <div className={styles.textAreaheader}>
              <p className={styles.socialHeader}>Company Activity</p>
              <p className={styles.warning}>Max. 500 characters</p>
            </div>
            <textarea
              rows={7}
              className={styles.textArea}
              placeholder="Please describe your business activities"
              value={companyActivity}
              onChange={(e) => {
                // Limit the input to 500 characters
                if (e.target.value.length <= 500) {
                  handleTextChange(e.target.value, setCompanyActivity);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.btncont}>
        <button className={styles.savebtn} onClick={handleSubmit}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;
