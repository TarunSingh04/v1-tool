"use client";
import React, { useState, ChangeEvent } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import SidebarOnboard from "@/app/components/utilities/components/sidebar-onboarding/SidebarOnboard";
import LanguageSelector from "@/app/components/utilities/components/language-selector/LanguageSelector";
import { FaChevronLeft } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Image from "next/image";
import pageNotDisplayLogo from "../../../assets/pageNotDisplayLogo.svg";
import axios from "axios";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [codeSent, setCodeSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [alertmessageText, setalertmessageText] = useState("");
  // const [codeSent, setcodeSent] = useState(false);



  const sendCode = () => {
    setCodeSent(true);
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(
        `code-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSendCode = async () => {
    if (!email) {
      setalertmessageText("Please enter an email address.");
      return;
    }
    // setLoader(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/validate-email`, {
        email,
      });
      console.log("Response:", response.data);
      if(response.data.exists===false){
        setalertmessageText("User doesn't exists");
      }
      else {
        setLoader(true); // Show the loader
        setalertmessageText(""); // Clear any alert message text
        setCodeSent(true);
        setTimeout(() => {
            navigateToCreatePassword(); // Navigate to the create password page
        }, 5000); // 3000ms = 3 seconds
    }
    } catch (error) {
      console.error("Error sending code:", error);
      alert("Failed to send code. Please try again.");
    } finally {
      // setLoader(false);
    }
  };

  const navigateTo = () => {
    router.push("/pages/signin");
  };

  const navigateToCreatePassword = () => {
    // router.push("/pages/create-password");
    router.push(`/pages/create-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className={styles.LoginPageCont}>  
      {loader && <div className={styles.container}><p className={styles.loader}></p></div>}
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
              onClick={navigateTo}
            >
              <FaChevronLeft className={styles.leftIcon} /> GO BACK
            </button>
            <LanguageSelector />
          </div>
          <div className={styles.LoginBox}>
            <p className={styles.loginHeader}>
              <p className={styles.loginHead}>Forgot Your Password?</p>
              <p className={styles.loginsubHead}>
                Don&apos;t worry, we&apos;ve got you covered
              </p>
              <p className={styles.loginsubHead2}>
                Please enter your registered email address below and click
                &quot;Send&quot; to confirm your identity and receive a
                temporary code.
              </p>
            </p>

            <div className={styles.wrapperInputBox}>
               <p
                className={styles.sendBtn}
                onClick={handleSendCode}
              >
                SEND
              </p>
              <p>Email</p>
              <input    
                type="email"
                placeholder="j.bond007@gmail.com"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              <div className={styles.alertbox}>{alertmessageText && <div className={styles.alertmessage}>{alertmessageText}</div>}</div>
              {codeSent && (
                <span>
                  <AiOutlineExclamationCircle className={styles.icon} /> Code
                  has been sent
                </span>
              )}
            </div>
            {/* <p className={styles.otpTitle}>Please enter your 4-Digit Code</p>
            <p className={styles.otpDescription}>
              Didn&apos;t receive a Code? <span>Re-Send Code</span> or change
              the email address.
            </p>

            <div className={styles.codeInputs}>
              {code.map((digit:any, index:any) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  className={styles.input}
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleCodeChange(index, e.target.value)
                  }
                />
              ))}
            </div>
            <div className={styles.buttonCont}>
              <button
                className={styles.button}
                onClick={() => {
                  navigateToCreatePassword();
                }}
              >
                VERIFY EMAIL
              </button>
            </div> */}
            
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

export default ForgotPassword;
