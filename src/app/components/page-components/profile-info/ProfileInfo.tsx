import React, { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import EditProfile from "../../assets/editprofile.webp";
import Select from "react-select";
import country_data from "../../utilities/country_data";

const ProfileInfo = () => {
  const [selectedImage, setSelectedImage] = useState<any>(""); // State for profile image
  const [selectedCountry, setSelectedCountry] = useState<any>(null); // State for selected country
  const [isEditable, setIsEditable] = useState<boolean>(false); // State to control editability of fields

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    setIsEditable(true); // Enable fields on edit button click
  };

  const handleSaveClick = () => {
    setIsEditable(false); // Disable fields and hide save button on save
  };
  const handleRemoveImage = () => {
    setSelectedImage("");
  };

  return (
    <div className={styles.Profile}>
      <div className={styles.question1content}>
        <h2>Profile Information</h2>
        <div className={styles.profilecont}>
          <div className={styles.ImageContainer}>
            <Image
              src={selectedImage || EditProfile} // Conditionally render the uploaded image or the default
              width={150}
              height={150}
              alt="profile"
              className={styles.ProfileImage}
            />
            <div className={styles.ImageButtons}>
              <label className={styles.uploadButton}>
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  disabled={!isEditable}
                />
              </label>
              <button
                className={styles.removeButton}
                onClick={handleRemoveImage}
                disabled={!selectedImage}
              >
                Remove
              </button>
            </div>
          </div>

          <div className={styles.Infocont}>
            {/* Input fields */}

            <div className={styles.Inputcont}>
              <div className={styles.wrapperInputBox}>
                <p>User Name</p>
                <input
                  type="text"
                  placeholder="Enter your User Name"
                  disabled={!isEditable} // Disable the field when not editable
                />
              </div>

              <div className={styles.wrapperInputBox}>
                <p>Email</p>
                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  disabled={!isEditable} // Disable the field when not editable
                />
              </div>
            </div>

            <div className={styles.Inputcont}>
              <div className={styles.wrapperInputBox}>
                <p>Country</p>
                <select disabled={!isEditable}>
                  {country_data.map((country: any, index: any) => {
                    return (
                      <option value={country.value} key={index}>
                        {country.label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className={styles.wrapperInputBox}>
                <p>Business Name</p>
                <input
                  type="text"
                  placeholder="Enter your Business Name"
                  disabled={!isEditable} // Disable the field when not editable
                />
              </div>
            </div>

            <div className={styles.Inputcont}>
              <div className={styles.wrapperInputBox}>
                <p>Registration Name</p>
                <input
                  type="text"
                  placeholder="Enter your Registration Name"
                  disabled={!isEditable} // Disable the field when not editable
                />
              </div>

              <div className={styles.wrapperInputBox}>
                <p>Vat Number</p>
                <input
                  type="text"
                  placeholder="Enter your Vat Number"
                  disabled={!isEditable} // Disable the field when not editable
                />
              </div>
            </div>

            <div className={styles.Editprofilebtn}>
              {!isEditable && <button onClick={handleEditClick}>Edit</button>}
              {isEditable && (
                <button onClick={handleSaveClick} className={styles.savebutton}>
                  Save
                </button>
              )}{" "}
              {/* Conditionally render the Save button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
