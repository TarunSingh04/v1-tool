// import React, { useState, useEffect } from "react";
// import styles from "./styles.module.scss";
// import Maincard from "./main-card/Maincard";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import DownloadIcon from "../../../assets/downloadIcon.svg";
// import Image from "next/image";

// const Scorecardmain = React.memo(() => {
//   const [companyName, setcompanyName] = useState("");
//   const [mainCardImageSrc, setMainCardImageSrc] = useState<string | null>(null);
//   const [fileInput, setFileInput] = useState<File | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`,
//           {
//             method: "GET",
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );

//         const data = await response.json();
//         setcompanyName(data?.onboarding?.companyName);
//       } catch (error) {
//         console.error("Failed to fetch score", error);
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const renderMainCardAsImage = async () => {
//       const mainCardElement = document.getElementById("maincard");
//       if (mainCardElement) {
//         const canvas = await html2canvas(mainCardElement, { scale: 2 });
//         canvas.toBlob((blob) => {
//           if (blob) {
//             const file = new File([blob], `${companyName}-scorecard.png`, {
//               type: "image/png",
//             });
//             setFileInput(file);
//             setMainCardImageSrc(URL.createObjectURL(file)); // Set URL for rendering the image
//           }
//         }, "image/png");
//       }
//     };

//     const timeout = setTimeout(() => {
//       renderMainCardAsImage();
//     }, 5000); // 5 seconds delay

//     return () => clearTimeout(timeout); // Cleanup timeout on component unmount
//   }, [companyName]);

//   // const downloadPDF = () => {
//   //   const sectionIds = ["section1", "section2", "section3"];
//   //   const pptWidth = 508; // Width in mm for PowerPoint dimensions (16:9 ratio)
//   //   const pptHeight = 286; // Height in mm for PowerPoint dimensions

//   //   const pdf = new jsPDF("l", "mm", [pptWidth, pptHeight]);

//   //   const renderSectionToPDF = async (id:any, isFirstPage:any) => {
//   //     const section = document.getElementById(id);
//   //     if (section) {
//   //       const canvas = await html2canvas(section, { scale: 2 });
//   //       const imgData = canvas.toDataURL("image/png");

//   //       // Set the page size to PowerPoint dimensions for every page
//   //       if (!isFirstPage) {
//   //         pdf.addPage([pptWidth, pptHeight]);
//   //       }

//   //       // Add image to PDF with the consistent PowerPoint page size
//   //       pdf.addImage(imgData, "PNG", 0, 0, pptWidth, pptHeight);
//   //     } else {
//   //       console.error(`Element with id '${id}' not found.`);
//   //     }
//   //   };

//   //   // Render sections in order
//   //   const renderPDF = async () => {
//   //     await renderSectionToPDF(sectionIds[0], true);  // First page
//   //     await renderSectionToPDF(sectionIds[1], false); // Middle page
//   //     await renderSectionToPDF(sectionIds[2], false); // Last page
//   //     pdf.save(`${companyName}-scorecard.pdf`);
//   //   };

//   //   renderPDF();
//   // };

//   const downloadPDF = () => {
//     const sectionIds = ["section1", "section2", "section3"];
//     const pptWidth = 410; // Width in mm for PowerPoint dimensions (16:9 ratio)
//     const pptHeight = 286; // Height in mm for PowerPoint dimensions

//     const pdf = new jsPDF("l", "mm", [pptWidth, pptHeight]);

//     const renderSectionToPDF = async (id: any, isFirstPage: any) => {
//       const section = document.getElementById(id);
//       if (section) {
//         // Use html2canvas to render the section
//         const canvas = await html2canvas(section, { scale: 2 });
//         const imgData = canvas.toDataURL("image/png");

//         // Calculate the aspect ratio of the canvas and fit it to the PDF dimensions
//         const imgWidth = canvas.width;
//         const imgHeight = canvas.height;
//         const imgAspectRatio = imgWidth / imgHeight;

//         // Ensure consistent aspect ratio
//         let renderedWidth = pptWidth;
//         let renderedHeight = pptHeight;

//         if (imgAspectRatio > pptWidth / pptHeight) {
//           // Fit by width
//           renderedHeight = pptWidth / imgAspectRatio;
//         } else {
//           // Fit by height
//           renderedWidth = pptHeight * imgAspectRatio;
//         }

//         // Center the image in the PDF page
//         const offsetX = (pptWidth - renderedWidth) / 2;
//         const offsetY = (pptHeight - renderedHeight) / 2;

//         // Add page to PDF
//         if (!isFirstPage) {
//           pdf.addPage([pptWidth, pptHeight]);
//         }

//         // Add the image to the PDF
//         pdf.addImage(
//           imgData,
//           "PNG",
//           offsetX,
//           offsetY,
//           renderedWidth,
//           renderedHeight
//         );
//       } else {
//         console.error(`Element with id '${id}' not found.`);
//       }
//     };

//     const generatePDF = async () => {
//       for (let i = 0; i < sectionIds.length; i++) {
//         await renderSectionToPDF(sectionIds[i], i === 0);
//       }
//       pdf.save(`${companyName}.pdf`);
//     };

//     generatePDF();
//   };

//   return (
//     <div className={styles.Scorecardmain}>
//       <div className={styles.downloadbtn}>
//         <button onClick={downloadPDF} className={styles.downloadButton}>
//           <Image
//             src={DownloadIcon}
//             height={16}
//             width={16}
//             alt="Download icon"
//             className={styles.downloadIcon}
//           />
//           Download as PDF
//         </button>
//       </div>

//       {/* Hidden file input to hold the Maincard image */}
//       <input
//         type="file"
//         style={{ display: "none" }}
//         accept="image/png"
//         // Use File object as a fake value setter since we can't actually set the file input value directly
//         onChange={() => {}}
//       />

//       <div
//         style={{
//           width: "50%",
//           overflow: "hidden",
//           position: "absolute",
//           zIndex: "-10000000",
//           left: "-10000000000",
//           top: "-1000000000000000000%",
//         }}
//       >
//         <Maincard />
//       </div>

//       {/* Render captured Maincard image */}
//       {mainCardImageSrc ? (
//         <Image
//           src={mainCardImageSrc}
//           alt={`${companyName} Scorecard`}
//           layout="responsive"
//           width={100}
//           height={100}
//           className={styles.mainCardImage}
//         />
//       ) : (
//         <div id="maincard">
//           <Maincard />
//         </div>
//       )}
//     </div>
//   );
// });

// export default Scorecardmain;

import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Maincard from "./main-card/Maincard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DownloadIcon from "../../../assets/downloadIcon.svg";
import Image from "next/image";

const Scorecardmain = React.memo(() => {
  const [companyName, setcompanyName] = useState("");
  const [mainCardImageSrc, setMainCardImageSrc] = useState<string | null>(null);
  const [fileInput, setFileInput] = useState<File | null>(null);

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
      } catch (error) {
        console.error("Failed to fetch score", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const renderMainCardAsImage = async () => {
      const mainCardElement = document.getElementById("maincard");
      if (mainCardElement) {
        const canvas = await html2canvas(mainCardElement, { scale: 2 });
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `${companyName}-scorecard.png`, {
              type: "image/png",
            });
            setFileInput(file);
            setMainCardImageSrc(URL.createObjectURL(file)); // Set URL for rendering the image
          }
        }, "image/png");
      }
    };

    const timeout = setTimeout(() => {
      renderMainCardAsImage();
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [companyName]);

  const downloadPDF = () => {
    const sectionIds = ["section1", "section2", "section3"];
    const pptWidth = 410; // Width in mm for PowerPoint dimensions (16:9 ratio)
    const pptHeight = 286; // Height in mm for PowerPoint dimensions

    const pdf = new jsPDF("l", "mm", [pptWidth, pptHeight]);

    const renderSectionToPDF = async (id: any, isFirstPage: any) => {
      const section = document.getElementById(id);
      if (section) {
        const canvas = await html2canvas(section, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const imgAspectRatio = imgWidth / imgHeight;

        let renderedWidth = pptWidth;
        let renderedHeight = pptHeight;

        if (imgAspectRatio > pptWidth / pptHeight) {
          renderedHeight = pptWidth / imgAspectRatio;
        } else {
          renderedWidth = pptHeight * imgAspectRatio;
        }

        const offsetX = (pptWidth - renderedWidth) / 2;
        const offsetY = (pptHeight - renderedHeight) / 2;

        if (!isFirstPage) {
          pdf.addPage([pptWidth, pptHeight]);
        }

        pdf.addImage(
          imgData,
          "PNG",
          offsetX,
          offsetY,
          renderedWidth,
          renderedHeight
        );
      } else {
        console.error(`Element with id '${id}' not found.`);
      }
    };

    const generatePDF = async () => {
      for (let i = 0; i < sectionIds.length; i++) {
        await renderSectionToPDF(sectionIds[i], i === 0);
      }
      pdf.save(`${companyName}.pdf`);
    };

    generatePDF();
  };

  return (
    <div className={styles.Scorecardmain}>
      <div className={styles.downloadbtn}>
        <button onClick={downloadPDF} className={styles.downloadButton}>
          <Image
            src={DownloadIcon}
            height={16}
            width={16}
            alt="Download icon"
            className={styles.downloadIcon}
          />
          Download as PDF
        </button>
      </div>

      <input
        type="file"
        style={{ display: "none" }}
        accept="image/png"
        onChange={() => {}}
      />

      <div
        style={{
          width: "50%",
          overflow: "hidden",
          position: "absolute",
          zIndex: "-10000000",
          left: "-10000000000",
          top: "-1000000000000000000%",
        }}
      >
        <Maincard />
      </div>

      {mainCardImageSrc ? (
        <Image
          src={mainCardImageSrc}
          alt={`${companyName} Scorecard`}
          layout="responsive"
          width={100}
          height={100}
          className={styles.mainCardImage}
        />
      ) : (
        <div id="maincard">
          <Maincard />
        </div>
      )}
    </div>
  );
});

// Fix: Assign a display name to the memoized component
Scorecardmain.displayName = "Scorecardmain";

export default Scorecardmain;
