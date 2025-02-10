// "use client";
// import React, { useEffect, useState } from "react";
// import styles from "./styles.module.scss";
// import { useRouter } from "next/navigation";
// import SidebarOnboard from "@/app/components/utilities/components/sidebar-onboarding/SidebarOnboard";
// import LanguageSelector from "@/app/components/utilities/components/language-selector/LanguageSelector";
// import { FaChevronLeft } from "react-icons/fa";
// import Image from "next/image";
// import { useSearchParams } from "next/navigation";
// import pageNotDisplayLogo from "../../../assets/pageNotDisplayLogo.svg";
// import axios from "axios";

// const Createpassword = () => {
//   const router = useRouter();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const searchParams = useSearchParams();
//   const [loader, setLoader] = useState(false);
//   const email = searchParams.get("email") || "";


//   const handleChangePassword = async() => {
//     if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match.");
//     } else {
//       setErrorMessage("");

//       try {
//         // API request to change password
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/reset-password`, {
//           email,
//           new_password: password,
//         });

//         // Handle success (e.g., navigate to another page)
//         if (response.status === 200) {
//           setLoader(true); 
//           console.log("Password changed successfully");
//           setTimeout(() => {
//             router.push("/pages/signin"); // Navigate to the create password page
//         }, 5000); // Navigate to success page
//         }
//       } catch (error:any) {
//         // Handle errors from the API
//         console.error("Error changing password:", error?.response?.data || error.message);
//         setErrorMessage(
//           error.response?.data?.message || "Failed to change password. Please try again."
//         );
//       }
//     }
//   };

//   const navigateTo = () => {
//     router.push("/pages/forgot-password");
//   };

//   return (
//     <div className={styles.LoginPageCont}>
//       {loader && <div className={styles.container}><p className={styles.loader}></p></div>}
//       <div className={styles.pageNotDisplay}>
//         <Image src={pageNotDisplayLogo} width={160} height={115} alt="none" />
//         <p className={styles.pageNotDisplaytitle}>
//           Oops! Best Viewed on Desktop
//         </p>
//         <p className={styles.pageNotDisplaysubtitle}>
//           For the Best Experience, Switch to Desktop!
//         </p>
//         <p className={styles.pageNotDisplaydesc}>
//           You&apos;re on a mobile or tablet. For the full experience and all
//           site features, please visit us on your desktop.
//         </p>
//       </div>
//       <div className={styles.LoginPage}>
//         <div className={styles.LoginContainer}>
//           <div className={styles.headerbtn}>
//             <button
//               className={styles.gobtn}
//               onClick={() => {
//                 navigateTo();
//               }}
//             >
//               <FaChevronLeft className={styles.leftIcon} /> GO BACK
//             </button>
//             <LanguageSelector />
//           </div>
//           <div className={styles.LoginBox}>
//             <p className={styles.loginHeader}>
//               <p className={styles.loginHead}>Create new password</p>
//               <p className={styles.loginsubHead}>
//                 Congrats! You&apos;ve been verified.
//               </p>
//             </p>
//             <div className={styles.wrapperInputBox}>
//               <p>Password</p>
//               <input
//                 type="password"
//                 placeholder="**********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className={styles.wrapperInputBox}>
//               <p>Confirm Password</p>
//               <input
//                 type="password"
//                 placeholder="**********"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             {errorMessage && (
//               <p className={styles.errorMessage}>{errorMessage}</p>
//             )}

//             <div className={styles.buttonCont}>
//               <button
//                 className={styles.button}
//                 onClick={handleChangePassword}
//               >
//                 CHANGE PASSWORD
//               </button>
//             </div>
//           </div>
//         </div>
//         <SidebarOnboard
//           description={
//             "CSRD Reporting Made Easy and Affordable for Any Company."
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default Createpassword;
"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import SidebarOnboard from "@/app/components/utilities/components/sidebar-onboarding/SidebarOnboard";
import LanguageSelector from "@/app/components/utilities/components/language-selector/LanguageSelector";
import { FaChevronLeft } from "react-icons/fa";
import Image from "next/image";
import pageNotDisplayLogo from "../../../assets/pageNotDisplayLogo.svg";
import axios from "axios";

const Createpassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(""); // Use state to store email
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // Access query params safely on the client
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email") || "");
  }, []);

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage("");

      try {
        // API request to change password
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/reset-password`,
          {
            email,
            new_password: password,
          }
        );

        // Handle success (e.g., navigate to another page)
        if (response.status === 200) {
          setLoader(true);
          console.log("Password changed successfully");
          setTimeout(() => {
            router.push("/pages/signin"); // Navigate to the sign-in page
          }, 5000);
        }
      } catch (error: any) {
        // Handle errors from the API
        console.error(
          "Error changing password:",
          error?.response?.data || error.message
        );
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to change password. Please try again."
        );
      }
    }
  };

  const navigateTo = () => {
    router.push("/pages/forgot-password");
  };

  return (
    <div className={styles.LoginPageCont}>
      {loader && (
        <div className={styles.container}>
          <p className={styles.loader}></p>
        </div>
      )}
      <div className={styles.pageNotDisplay}>
        <Image src={pageNotDisplayLogo} width={160} height={115} alt="none" />
        <p className={styles.pageNotDisplaytitle}>
          Oops! Best Viewed on Desktop
        </p>
        <p className={styles.pageNotDisplaysubtitle}>
          For the Best Experience, Switch to Desktop!
        </p>
        <p className={styles.pageNotDisplaydesc}>
          You&apos;re on a mobile or tablet. For the full experience and all
          site features, please visit us on your desktop.
        </p>
      </div>
      <div className={styles.LoginPage}>
        <div className={styles.LoginContainer}>
          <div className={styles.headerbtn}>
            <button
              className={styles.gobtn}
              onClick={() => {
                navigateTo();
              }}
            >
              <FaChevronLeft className={styles.leftIcon} /> GO BACK
            </button>
            <LanguageSelector />
          </div>
          <div className={styles.LoginBox}>
            <p className={styles.loginHeader}>
              <p className={styles.loginHead}>Create new password</p>
              <p className={styles.loginsubHead}>
                Congrats! You&apos;ve been verified.
              </p>
            </p>
            <div className={styles.wrapperInputBox}>
              <p>Password</p>
              <input
                type="password"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.wrapperInputBox}>
              <p>Confirm Password</p>
              <input
                type="password"
                placeholder="**********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}

            <div className={styles.buttonCont}>
              <button className={styles.button} onClick={handleChangePassword}>
                CHANGE PASSWORD
              </button>
            </div>
          </div>
        </div>
        <SidebarOnboard
          description={
            "CSRD Reporting Made Easy and Affordable for Any Company."
          }
        />
      </div>
    </div>
  );
};

export default Createpassword;
