import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import editIcon from "../../../assets/edit.svg";
import Image from "next/image";
import logoutIcon from "../../../assets/log-out.svg";
import searchIcon from "../../../assets/searchIcon.svg";
import { useAuth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";

// API Base URL
const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`;

const SettingsMain = () => {
  const navigate = useRouter();
  const [EditState1, setEditState1] = useState(false);
  const [EditState2, setEditState2] = useState(false);
  const [EditState3, setEditState3] = useState(false);
  const [EditState4, setEditState4] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [timeZoneSearch, setTimeZoneSearch] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    "UTC Dublin, Edinburgh, Lisbon, London"
  );
  const [language, setLanguage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [timeZones] = useState([
  //   "UTC Dublin, Edinburgh, Lisbon, London",
  //   "UTC New York, Toronto",
  //   "UTC Tokyo, Osaka, Sapporo",
  //   "UTC Sydney, Canberra, Melbourne",
  // ]);

  const [timeZones] = useState([
    "UTC",
    "PST",
    "EST",
    "CST",
    "MST",
    "IST",
    "GMT",
  ]);

  const { logout, accessToken } = useAuth();

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      console.log("data ==> ", data);
      console.log("response.ok ==> ", response.ok);
      if (response.ok) {
        // Update state with API response
        setIsToggled(data?.settings?.isTwoFactorAuthentication || false);
        setSelectedTimeZone(data?.settings?.timezone || "UTC Dublin, Edinburgh, Lisbon, London");
        setLanguage(data?.settings?.language || "EN");
        setEmail(data.email);
        console.log("Updated email state:", data.email);
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

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  // Save Settings API Call
  const handleSaveChanges = async () => {
    const settings = {
      isTwoFactorAuthentication: isToggled,
      timezone: selectedTimeZone,
      language: language,
      email: email,
      ...(password && { password }), // Only include password if provided
    };

    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(settings),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Settings updated successfully:", data);
      } else {
        console.error("Failed to update settings:", data.error);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const navigateTo = (pathname: string) => {
    navigate.push(pathname);
  };

  // Sign Out All Sessions API Call
  const handleLogoutAllSessions = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      const response = await fetch(`${API_BASE_URL}/logout-all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          ...(refreshToken && { "x-refresh-token": refreshToken }),
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Logged out of all sessions successfully:", data);
        logout();
        navigateTo("/pages/signin");
      } else {
        console.error("Failed to log out:", data.error);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Deactivate Account API Call
  const handleDeactivateAccount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/deactivate`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Account deactivated successfully:", data);
        logout();
        navigateTo("/pages/signin");
      } else {
        console.error("Failed to deactivate account:", data.error);
      }
    } catch (error) {
      console.error("Error deactivating account:", error);
    }
  };

  // const handleSaveChanges = () => {
  //   const data = {
  //     password,
  //     twoFactorAuth: isToggled,
  //     email,
  //     timeZone: selectedTimeZone,
  //     language,
  //   };
  //   console.log("Saved Data:", data);
  // };

  const handleTimeZoneSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeZoneSearch(e.target.value);
  };

  const filteredTimeZones = timeZones.filter((zone) =>
    zone.toLowerCase().includes(timeZoneSearch.toLowerCase())
  );

  return (
    <div className={styles.settings}>
      {/* Password Section */}
      <div className={styles.settingsBoxType1}>
        <div className={styles.settingBoxleftcont}>
          <div className={styles.Headertxt}>Password</div>
          {!EditState1 && <div className={styles.txtBody}>******</div>}
          {EditState1 && (
            <div className={styles.txtBody}>
              <input
                type="password"
                placeholder="Enter Your Password"
                className={styles.inputBoxStyles}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className={styles.settingBoxrightcont}>
          {!EditState1 ? (
            <p className={styles.edit} onClick={() => setEditState1(true)}>
              <Image src={editIcon} width={15} height={15} alt="none" />
              <span>Edit</span>
            </p>
          ) : (
            <p className={styles.edit} onClick={() => setEditState1(false)}>
              Close
            </p>
          )}
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className={styles.settingsBoxType1}>
        <div className={styles.settingBoxleftcont}>
          <div className={styles.Headertxt}>Two-factor authentication</div>
          <div className={styles.txtBody}>
            Two-factor authentication is{" "}
            <span>{isToggled ? "active" : "inactive"}</span> for your account
          </div>
        </div>
        <div className={styles.settingBoxrightcont}>
          <p className={styles.toggledState}>
            {isToggled ? "Activate" : "Inactivate"}
          </p>
          <div
            className={`${styles.toggleWrapper} ${isToggled ? styles.active : ""}`}
            onClick={handleToggle}
            role="button"
            aria-pressed={isToggled}
            tabIndex={0}
          >
            <div className={styles.slider} />
          </div>
        </div>
      </div>

      {/* Email Section */}
      <div className={styles.settingsBoxType1}>
        <div className={styles.settingBoxleftcont}>
          <div className={styles.Headertxt}>Email</div>
          {!EditState2 && (
            <div className={styles.txtBody}>
              Your email address is <span>{email}</span>
            </div>
          )}
          {EditState2 && (
            <div className={styles.txtBody}>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className={styles.inputBoxStyles}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className={styles.settingBoxrightcont}>
          {!EditState2 ? (
            <p className={styles.edit} onClick={() => setEditState2(true)}>
              <Image src={editIcon} width={15} height={15} alt="none" />
              <span>Edit</span>
            </p>
          ) : (
            <p className={styles.edit} onClick={() => setEditState2(false)}>
              Close
            </p>
          )}
        </div>
      </div>

      {/* Time Zone Section */}
      <div className={styles.settingsBoxType1}>
        <div className={styles.settingBoxleftcont}>
          <div className={styles.Headertxt}>Time Zone</div>
          <div className={styles.txtBody}>
            <span>{selectedTimeZone}</span>
          </div>
        </div>
        <div className={styles.settingBoxrightcont}>
          <div className={styles.searchbar}>
            <Image
              src={searchIcon}
              width={26}
              height={26}
              alt="none"
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Search by Time Zones"
              value={timeZoneSearch}
              onChange={handleTimeZoneSearch}
            />
            {timeZoneSearch && (
              <div className={styles.suggestions}>
                {filteredTimeZones.length > 0 ? (
                  filteredTimeZones.map((zone, index) => (
                    <p
                      key={index}
                      className={styles.suggestionItem}
                      onClick={() => {
                        setSelectedTimeZone(zone);
                        setTimeZoneSearch("");
                      }}
                    >
                      {zone}
                    </p>
                  ))
                ) : (
                  <p className={styles.suggestionItem}>
                    No relevant time zones found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Language Section */}
      <div className={styles.settingsBoxType1}>
        <div className={styles.settingBoxleftcont}>
          <div className={styles.Headertxt}>Language</div>
          {!EditState4 ? (
            <div className={styles.txtBody}>{language}</div>
          ) : (
            <div className={styles.txtBody}>
              <select
                className={styles.select}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English UK">English</option>
                <option value="Spanish ES">Spanish</option>
                <option value="French FR">French</option>
              </select>
            </div>
          )}
        </div>
        <div className={styles.settingBoxrightcont}>
          {!EditState4 ? (
            <p className={styles.edit} onClick={() => setEditState4(true)}>
              <Image src={editIcon} width={15} height={15} alt="none" />
              <span>Edit</span>
            </p>
          ) : (
            <p className={styles.edit} onClick={() => setEditState4(false)}>
              Close
            </p>
          )}
        </div>
      </div>

      {/* Sign Out All Sessions Section */}
      <div className={styles.settingsBoxType1}>
        <div className={styles.settingBoxleftcont1}>
          <div className={styles.Headertxt}>Sign Out of All Sessions</div>
          <div className={styles.txtBody}>
            This will sign you out from all active sessions across all devices.
            You will need to log in again to continue using your account.
          </div>
        </div>
        <div className={styles.settingBoxrightcont1}>
          <p className={styles.signout} onClick={handleLogoutAllSessions}>
            <Image
              src={logoutIcon}
              width={14}
              height={14}
              alt="none"
              className={styles.ImageIcon}
            />
            Sign out of all accounts
          </p>
        </div>
      </div>

      {/* Deactivate Account Section */}
      <div className={styles.settingsBoxType1}>
        <div className={styles.settingBoxleftcont1}>
          <div className={styles.Headertxt}>Deactivate account</div>
          <div className={styles.txtBody}>
            If you no longer need your account on Impkater, you can deactivate
            it
          </div>
        </div>
        <div className={styles.settingBoxrightcont1}>
          <p className={styles.deactivate} onClick={handleDeactivateAccount}>
            Deactivate account
          </p>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className={styles.btncont}>
        <button className={styles.savebtn} onClick={handleSaveChanges}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default SettingsMain;
