"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MarketplaceLogo from "../../../../assets/marketplacelogo.svg";
import SubscribedLogo from "../../../../assets/subscribed.svg";
import { MdClose } from "react-icons/md";
import celebIcon from "../../../../assets/celebrateIcon.jpg";

const Marketplace = () => {
  const [subscribed, setsubscribed] = useState(false);
  const [subscribedPopUp, setsubscribedPopUp] = useState(false);
  const [marketplaceActivated, setMarketplaceActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state for lazy loading
  const navigate = useRouter();

  const suscribe = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/feature/marketplace?value=true`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        setsubscribed(true);
        setsubscribedPopUp(true);
      } else {
        console.error("Failed to subscribe:", response.statusText);
      }
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };

  // **Fetch User Data API Call**
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
        setMarketplaceActivated(data?.marketplace ?? false);
        setsubscribed(data?.marketplace ?? false);
      } else {
        console.error(
          "Failed to fetch user data:",
          data?.error ?? "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false); // Stop loading once data is fetched
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    fetchUserData();
  }, []);

  const closeSuscribePopUp = () => {
    setsubscribedPopUp(false);
  };

  const navigateTo = () => {
    navigate.push("/pages/marketplace");
  };

  return (
    <div className={styles.Marketplace}>
      <div className={styles.marketPlacecont}>
        <Image
          src={MarketplaceLogo}
          width={190}
          height={160}
          alt="none"
          className={styles.dateIcon}
        />
        <p className={styles.Headline}>Marketplace Coming Soon!</p>
        <p className={styles.subHeadline}>
          Your Gateway to Sustainable Innovation and Global Change!
        </p>
        {!isLoading ? (
          <>
            {!subscribed && (
              <button
                className={styles.subscribebtn}
                onClick={() => {
                  suscribe();
                }}
              >
                Subscribe now
              </button>
            )}
            {subscribed && (
              <Image
                src={SubscribedLogo}
                width={220}
                height={60}
                alt="none"
                className={styles.dateIcon}
              />
            )}
          </>
        ) : (
          <p className={styles.Loading}>Loading...</p> // Optional loading state placeholder
        )}
      </div>
      {subscribedPopUp && (
        <div className={styles.container}>
          <div className={styles.boxCont}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={closeSuscribePopUp}
                />
              </div>
              <Image
                src={celebIcon}
                width={30}
                height={30}
                alt="none"
                className={styles.dateIcon}
              />
              <h2 className={styles.title}>Congratulations!</h2>
              <p className={styles.description}>
                You&apos;re subscribed to Marketplace!
              </p>
            </div>

            <div className={styles.buttoncontpopup}>
              <button className={styles.button1} onClick={closeSuscribePopUp}>
                GO BACK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
