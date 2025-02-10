"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import googleLogo from "../../../assets/google.png";
import dashboard from "../../../assets/sidebanner.png";
import { useRouter } from "next/navigation";
import { AiFillCloseSquare } from "react-icons/ai";
import TwoFactorAuth from "./two-factor/TwoFactor";
import LanguageSelector from "@/app/components/utilities/components/language-selector/LanguageSelector";
import SidebarOnboard from "@/app/components/utilities/components/sidebar-onboarding/SidebarOnboard";
import pageNotDisplayLogo from "../../../assets/pageNotDisplayLogo.svg";
import { LoginRequest, TokenResponse } from "@/types/auth";
import { loginUser, validateAccessToken } from "@/utilities/authService";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const LoginUser: React.FC = () => {
  const router = useRouter();
  const [email, setemail] = useState<any>("");
  const [password, setpassword] = useState<any>("");
  const [verificationCode, setverificationCode] = useState<any>("");
  const [popUp, setpopUp] = useState(false);
  const [loaderShow, setloaderShow] = useState<boolean>(false);
  const [errorCheck, seterrorCheck] = useState(false);
  const [message, setmessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [overflowState, setoverflowState] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setloaderShow(false);
        return;
      }

      try {
        const response = await validateAccessToken(accessToken);
        localStorage.removeItem("questionnaire-storage");
    
        if (response.valid) {
         
          // Token is valid; redirect to dashboard
          router.push("/pages/dashboard");
        } else {
          // Token is invalid; show login page
          setloaderShow(false);
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        setloaderShow(false);
      }
    };

    checkToken();
  }, [router]);

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/google/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: credentialResponse.credential }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        setmessage("Google login successful!");

        setpopUp(true);

        const onboarding_present = localStorage.getItem("onboarding");
        if (onboarding_present) {
          setTimeout(() => {
            router.push("/pages/dashboard");
          }, 5000);
        } else {
          setTimeout(() => {
            router.push("/pages/onboarding");
          }, 5000);
        }
      } else {
        seterrorCheck(true);
        setmessage(data.error || data.detail || "Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      seterrorCheck(true);
      setmessage("Google login failed. Please try again.");
    }
  };

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!email || !password) {
      seterrorCheck(true);
      setmessage("All fields are mandatory*");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      seterrorCheck(true);
      setmessage("Invalid email format*");
      return;
    }

    setloaderShow(true);

    try {
      const data: LoginRequest = { email, password };
      const response: TokenResponse = await loginUser(data);

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);

      console.log("Login successful", response);

      seterrorCheck(false);
      setmessage("");
      setpopUp(true);
      if (response.onboarding_present) {
      localStorage.setItem("onboarding", `${response.onboarding_present}`);
        setTimeout(() => {
          router.push("/pages/dashboard");
        }, 5000);
      } else {
        setTimeout(() => {
          router.push("/pages/onboarding");
        }, 5000);
      }
    } catch (err: any) {
      console.error("Login failed:", err);

      seterrorCheck(true);
      setmessage(err.response?.data?.detail || "Something went wrong!");
    } finally {
      setloaderShow(false);
    }
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const navigateToSignin = () => {
    router.push("/pages/signup");
  };

  const navigateToForgotPassword = () => {
    router.push("/pages/forgot-password");
  };

  const changeEmail = (e: any) => {
    setemail(e.target.value);
  };
  const changePassword = (e: any) => {
    setpassword(e.target.value);
  };

  const Signin = () => {
    if (!email || !password) {
      seterrorCheck(true);
      setmessage("All fields are mandatory*");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      seterrorCheck(true);
      setmessage("Invalid email format*");
      return;
    }
    setpopUp(true);
    router.push("/pages/onboarding");
    setoverflowState(true);
  };

  const close2FA = () => {
    setpopUp(false);
  };

  const loaderOn = () => {};

  return (
    <GoogleOAuthProvider clientId="563390505536-oi4lqaccu8ruq8etj9c4jk0n6rf32lmo.apps.googleusercontent.com">
      <div
        className={styles.LoginPageCont}
        style={{ overflow: overflowState ? "hidden" : "auto" }}
      >
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
          {popUp && <TwoFactorAuth email={email} setpopUp={setpopUp} />}
          <div className={styles.LoginContainer}>
            <div className={styles.languageselectcont}>
              <LanguageSelector />
            </div>
            <div className={styles.LoginBox}>
              <div className={styles.loginHeader}>
                <p className={styles.loginHead}>Sign In</p>
                <p className={styles.loginsubHead}>Welcome back!</p>
              </div>

              <p className={errorCheck ? styles.message2 : styles.message1}>
                {message}
              </p>
              <div className={styles.wrapperInputBox}>
                <p>Email</p>
                <input
                  type="text"
                  placeholder="john.doe@impakter.com"
                  onChange={changeEmail}
                />
              </div>
              <div className={styles.wrapperInputBox}>
                <p>Password</p>
                <input
                  type="password"
                  placeholder="********"
                  onChange={changePassword}
                />
              </div>
              <div className={styles.buttonBoxLinks1}>
                <p
                  onClick={() => {
                    navigateToForgotPassword();
                  }}
                >
                  Forgot password?
                </p>
              </div>
              <div className={styles.buttonBox}>
                <div className={styles.rememberBox}>
                  <input
                    type="checkbox"
                    id="remember"
                    className={styles.custom_checkbox}
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                  <label
                    htmlFor="remember"
                    className={styles.custom_label}
                  ></label>
                  <label htmlFor="remember">Keep me signed in</label>
                </div>
                <button className={styles.loginButton} onClick={handleLogin}>
                  LET &apos;S GO
                </button>
                <p className={styles.buttonBoxLinks}>
                  <div className={styles.divideline}></div>
                  OR
                  <div className={styles.divideline}></div>
                </p>
                {/* <button className={styles.googleButton}>
                <Image src={googleLogo} height={22} width={22} alt="none" />
                <p>Sign in with Google</p>
              </button> */}

                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log("Google Login Failed");
                    seterrorCheck(true);
                    setmessage("Google login failed. Please try again.");
                  }}
                  useOneTap
                />

                <div className={styles.buttonBoxLinkssignup}>
                  Don&apos;t have an account?{" "}
                  <p
                    onClick={() => {
                      navigateToSignin();
                    }}
                  >
                    Sign up here.
                  </p>
                </div>
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
    </GoogleOAuthProvider>
  );
};

export default LoginUser;
