"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import LinkIcon from "../../../assets/linkIcon.svg";
import Image from "next/image";
import defaultImg from "../../../assets/reportdefaultImg.svg";
import downloadIcon from "../../../assets/downloadIcon.svg";
import reportView from "../../../assets/reportView.svg";
import { MdClose } from "react-icons/md";
import dashboardOverflowStore from "../../../store/dashboardOverflowStore";

const Customize = () => {
  const [images, setImages] = useState({
    coverImage: defaultImg,
    tableOfContent: defaultImg,
    introductionCover: defaultImg,
    actionPlanCover: defaultImg,
    annexCover: defaultImg,
    backCover: defaultImg,
  });
  const setDashboardOverflow = dashboardOverflowStore((state) => state.setDashboardOverflow);
  const imagesLength = Object.keys(images).length-1;

  const [previewPopup, setPreviewPopup] = useState(false);
  const [currentPreviewImage, setCurrentPreviewImage] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImages((prevImages) => ({
        ...prevImages,
        [key]: fileURL,
      }));
    }
  };

  const openPreviewPopup = (image: string) => {
    setCurrentPreviewImage(image); // Set the current image to preview
    setPreviewPopup(true);
    setDashboardOverflow(true);
  };

  const closePreviewPopup = () => {
    setPreviewPopup(false);
    setCurrentPreviewImage("");
    setDashboardOverflow(false);
  };

  return (
    <div className={styles.customizecont}>
      <div className={styles.customizeHeader}>
        <div className={styles.textualcontent}>
          <p className={styles.headertxt}>Customize Your Report</p>
          <p className={styles.txtbody}>
            Personalize your ESG Progress Report by adding branded images and
            company-specific materials. This section highlights all
            customizable slides, allowing you to adjust visuals to fit your
            brand, while the information and data in the report cannot be
            edited or changed.
          </p>
        </div>
        <div className={styles.textualLink}>
          <Image src={LinkIcon} width={15} height={15} alt="none" />
          <p>SEE SAMPLE REPORT</p>
        </div>
      </div>
      <div className={styles.customizebody}>
      {Object.entries(images).map(([key, imgSrc], index, array) => {
          const isDefaultImage = imgSrc === defaultImg;
          const isLastItem = index === array.length - 1; // Check if this is the last item

          return (
            <div
              className={isLastItem ? styles.custombox1 : styles.custombox} // Apply different class for the last item
              key={key}
            >
              <div className={styles.customtxt}>
                <p className={styles.headtxt}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </p>
                <p className={styles.bodytxt}>
                  Add the {key.replace(/([A-Z])/g, " $1").toLowerCase()} image
                </p>
              </div>
              <div className={styles.Imgbox}>
                <Image
                  src={imgSrc}
                  width={80}
                  height={46}
                  alt="Uploaded image"
                  style={{ borderRadius: "8px" }}
                />
                {!isDefaultImage ? (
                  <div
                    className={styles.uploadImgbtn}
                    style={{ cursor: "pointer" }}
                    onClick={() => openPreviewPopup(imgSrc)}
                  >
                    <Image src={reportView} width={14} height={14} alt="none" />
                    <p>PREVIEW IMAGE</p>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id={`upload-${key}`}
                      onChange={(e) => handleImageUpload(e, key)}
                    />
                    <label htmlFor={`upload-${key}`}>
                      <div className={styles.uploadImgbtn} style={{ cursor: "pointer" }}>
                        <Image src={downloadIcon} width={14} height={14} alt="none" />
                        <p>UPLOAD IMAGE</p>
                      </div>
                    </label>
                  </>
                )}
                <button
                  className={styles.removeImgbtn}
                  style={{
                    color: isDefaultImage ? "#D1D5DB" : "#7C7C7C",
                    cursor: isDefaultImage ? "not-allowed" : "pointer",
                  }}
                  disabled={isDefaultImage}
                  onClick={() =>
                    setImages((prevImages) => ({
                      ...prevImages,
                      [key]: defaultImg,
                    }))
                  }
                >
                  REMOVE IMAGE
                </button>
              </div>
            </div>
          );
        })}

      </div>
      {previewPopup && (
        <div className={styles.container}>
          <div className={styles.boxCont1}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={closePreviewPopup}
                />
              </div>
              <h2 className={styles.title}>Image Preview</h2>
              <p className={styles.description}>
              Table of Content
              </p>
            </div>
            {currentPreviewImage && (
              <Image
                src={currentPreviewImage}
                width={450}
                height={252}
                alt="Preview Image"
                style={{ borderRadius: "16px" }}
              />
            )}
            <button className={styles.button} onClick={closePreviewPopup}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customize;
