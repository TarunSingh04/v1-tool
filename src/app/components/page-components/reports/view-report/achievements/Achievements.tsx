import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import defaultImg from "../../../../assets/companydefaultImg.svg";
import Image from "next/image";
import certficateIcon from "../../../../assets/basicBage.svg";
import { DotIcon } from "lucide-react";
import { GoDotFill } from "react-icons/go";

const Achievements = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const queryParams = new URLSearchParams({
        page: "1",
        limit: "4", // Fetch only the top 4 certificates
        sort: "newest", // Sort by newest (if applicable)
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/certificates?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCertificates(data.certificates.slice(0, 4)); // Limit the results to 4
      } else {
        console.error("Failed to fetch certificates:", data.error);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const CertificatesData = [
    {
      certficateName: "Certificate Name",
      certificateDesc:
        "Lorem ipsum dolor sit amet consectetur. Consectetur non a vestibulum tellus odio.",
      certificateImage: defaultImg,
    },
    {
      certficateName: "Certificate Name",
      certificateDesc:
        "Lorem ipsum dolor sit amet consectetur. Consectetur non a vestibulum tellus odio.",
      certificateImage: defaultImg,
    },
    {
      certficateName: "Certificate Name",
      certificateDesc:
        "Lorem ipsum dolor sit amet consectetur. Consectetur non a vestibulum tellus odio.",
      certificateImage: defaultImg,
    },
    {
      certficateName: "Certificate Name",
      certificateDesc:
        "Lorem ipsum dolor sit amet consectetur. Consectetur non a vestibulum tellus odio.",
      certificateImage: defaultImg,
    },
  ];
  return (
    <div className={styles.Achievements}>
      <div className={styles.taskcont}>
        <div className={styles.taskHeader}>
          <p className={styles.headtxt}>Certificates Obtained</p>
        </div>
        {/* <p className={styles.desctxt}>
        Lorem ipsum dolor sit amet consectetur. Sit velit semper a nec porta nullam in accumsan senectus. Elit semper nibh duis pretium. Etiam velit tellus penatibus lacus vehicula. Faucibus varius nulla purus proin. Tortor nulla blandit tempus vitae vestibulum massa convallis eget.
          </p> */}
        <div className={styles.archievementscont}>
          {certificates.map((certificate, index) => {
            return (
              <div className={styles.certificateBox} key={index}>
                {/* <Image src={items.certificateImage} width={225} height={225} alt='none'/> */}
                <Image
                  src={certificate.Logo || defaultImg}
                  width={225}
                  height={225}
                  alt={certificate.label || "Certificate"}
                />
                <div className={styles.titlecont}>
                  <div className={styles.textInfo}>
                    <p className={styles.certicatetitle}>
                      {certificate.label || "Certificate Name"}
                    </p>
                    {/* <p className={styles.certificatedesc}>
                      <GoDotFill
                        className={styles.dotIcon}
                        style={{ fontSize: "18px" }}
                      />
                      <span>
                        {certificate.Website ||
                          "Certificate details or description not available."}
                      </span>
                    </p> */}
                  </div>
                  <Image
                    src={certficateIcon}
                    width={24}
                    height={24}
                    alt="none"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
