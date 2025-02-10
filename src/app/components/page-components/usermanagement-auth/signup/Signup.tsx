"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import googleLogo from "../../../assets/google.png";
import { useRouter } from "next/navigation";
import SidebarOnboard from "@/app/components/utilities/components/sidebar-onboarding/SidebarOnboard";
import LanguageSelector from "@/app/components/utilities/components/language-selector/LanguageSelector";
import alertImg from "../../../assets/alert.svg";
import pageNotDisplayLogo from "../../../assets/pageNotDisplayLogo.svg";
import { MdClose } from "react-icons/md";
import { signupUser } from "@/utilities/authService";
import { SignupRequest } from "@/types/auth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const router = useRouter();
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState<any>("");
  const [password, setpassword] = useState<any>("");
  const [confirmpassword, setconfirmpassword] = useState<any>("");
  const [userType, setuserType] = useState<any>("");
  const [message, setmessage] = useState<any>("All fields are mandatory*");
  const [errorCheck, seterrorCheck] = useState(false);
  const [termsAccept, settermsAccept] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("");
  const [passwordStrengthText, setPasswordStrengthText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loaderpopUp, setloaderpopUp] = useState(false);
  const [termspopUp, settermspopUp] = useState(false);
  const [privacypopUp, setprivacypopUp] = useState(false);
  const [overflowState, setoverflowState] = useState(false);

  const navigateToLogin = () => {
    router.push("/pages/signin");
  };

  const handleGoogleSignupSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/google/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: credentialResponse.credential }),
      });

      const data = await response.json();
      console.log("data ==> ", data);
      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        setmessage("Google sign-up successful!");
        // navigateToLogin();

        router.push("/pages/dashboard");
      } else {
        seterrorCheck(true);
        setmessage(data.error || "Google sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Google sign-up failed:", error);
      seterrorCheck(true);
      setmessage("Google sign-up failed. Please try again.");
    }
  };

  const handleSignup = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    // Show loader and navigate to login
    setloaderpopUp(true);
    setoverflowState(true);
    setTimeout(() => {
      setloaderpopUp(false);
      navigateToLogin();
      setoverflowState(false);
    }, 5000); // Simulate a loader delay

    try {
      const data: SignupRequest = { name: userName, email, password };
      const response = await signupUser(data);

      seterrorCheck(false);
      setmessage(response.message);
      

      navigateToLogin();
    } catch (err: any) {
      console.error("Signup failed:", err);

      seterrorCheck(false);
      setmessage(err.response?.data?.detail || "Something went wrong!");
    } finally {
      setloaderpopUp(false);
      setoverflowState(false);
    }
  };

  const validatePassword = (password: any) => {
    let strength = 0;
  
    // Check for minimum length of 8 characters
    if (password.length >= 8) strength++;
  
    // Check for at least one uppercase letter
    if (/[A-Z]/.test(password)) strength++;
  
    // Check for at least one lowercase letter
    if (/[a-z]/.test(password)) strength++;
  
    // Check for at least one number
    if (/\d/.test(password)) strength++;
  
    // Check for at least one special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  
    // Ensure strength only increases when all requirements are met
    return strength;
  };
  const validateEmail = (email: any) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateForm = () => {
    // Reset error state before running validation
    seterrorCheck(false);
    setmessage(""); // Clear message initially

    // Check if any fields are empty
    if (!userName || !email || !password || !confirmpassword) {
      seterrorCheck(true);
      setmessage("All fields are mandatory*");
      return false;
    }

    // Check username length
    if (userName.length <= 4) {
      seterrorCheck(true);
      setmessage("Username must be greater than 4 characters*");
      return false;
    }

    // Validate email format
    if (!validateEmail(email)) {
      seterrorCheck(true);
      setmessage("Please enter a valid email address*");
      return false;
    }

    // Check password strength
    if (passwordStrength < 4) {
      seterrorCheck(true);
      setmessage(
        "Password must be strong (at least 8 characters, one uppercase letter, one number, and one special character)*"
      );
      return false;
    }

    // Check if password and confirm password match
    if (password !== confirmpassword) {
      seterrorCheck(true);
      setmessage("Password and Confirm Password must match*");
      return false;
    }

    // Check if terms and conditions are accepted
    if (!termsAccept) {
      seterrorCheck(true);
      setmessage("Please accept the terms and conditions*");
      return false;
    }

    return true;
  };

  const changeEmail = (e: any) => {
    setemail(e.target.value);
  };

  const changePassword = (e: any) => {
    const password = e.target.value;
    const strength = validatePassword(password);
    setPasswordStrength(strength);
    if (strength === 1 || strength === 2) {
      setPasswordStrengthColor("red");
      setPasswordStrengthText("Low");
    } else if (strength === 3 || strength === 4) {
      setPasswordStrengthColor("#ffdd00");
      setPasswordStrengthText("Medium");
    } else if (strength === 5) {
      setPasswordStrengthColor("#00d700");
      setPasswordStrengthText("Strong");
    }
    setpassword(password);
  };

  const changeconfirmPassword = (e: any) => {
    setconfirmpassword(e.target.value);
  };

  const changeUserType = (e: any) => {
    setuserType(e.target.value);
  };

  const changeuserName = (e: any) => {
    setuserName(e.target.value);
  };

  const changeAcceptTermsandCondition = (e: any) => {
    settermsAccept(!termsAccept);
    setIsChecked(!isChecked);
  };

  // const handleSignup = () => {
  //   // Validate before proceeding
  //   if (!validateForm()) return;

  //   // If all validations pass, you can proceed
  //   console.log("User Name:", userName);
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  //   console.log("Confirm Password:", confirmpassword);
  //   console.log("Terms Accepted:", termsAccept);

  // Show loader and navigate to login
  //   setloaderpopUp(true);
  //   setoverflowState(true);
  //   setTimeout(() => {
  //     setloaderpopUp(false);
  //     navigateToLogin();
  //     setoverflowState(false);
  //   }, 2000); // Simulate a loader delay
  // };

  return (
    <GoogleOAuthProvider clientId="563390505536-oi4lqaccu8ruq8etj9c4jk0n6rf32lmo.apps.googleusercontent.com">
      <div
        className={styles.SignupPageCont}
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
        <div className={styles.SignupPage}>
          <div className={styles.SignupContainer}>
            <div className={styles.languageselectcont}>
              <LanguageSelector />
            </div>
            <div className={styles.SignupBox}>
              <p className={styles.signupHeader}>
                <p className={styles.signupHead}>Sign Up</p>
                <p className={styles.signupsubHead}>Let&apos;s get started</p>
              </p>
              <p className={errorCheck ? styles.message2 : styles.message1}>
                {message}
              </p>
              <div className={styles.wrapperInputBox}>
                <p>Name</p>
                <input
                  type="text"
                  placeholder="James Bond"
                  onChange={changeuserName}
                />
              </div>
              <div className={styles.wrapperInputBox}>
                <p>Email</p>
                <input
                  type="email"
                  placeholder="j.bond007@gmail.com"
                  onChange={changeEmail}
                />
              </div>
              <div className={styles.wrapperInputBox}>
                <p>Password</p>
                <input
                  type="password"
                  placeholder="**********"
                  onChange={changePassword}
                />
                <div className={styles.passwordStrength}>
                  <div
                    className={styles.passwordStrengthBar}
                    style={{
                      width: `${passwordStrength * 20}%`,
                      backgroundColor: passwordStrengthColor,
                    }}
                  />
                </div>
              </div>

              <div className={styles.wrapperInputBox}>
                <p>Confirm Password</p>
                <input
                  type="password"
                  placeholder="**********"
                  onChange={changeconfirmPassword}
                />
              </div>

              <div className={styles.passwordmessage}>
                <Image src={alertImg} width={20} height={20} alt="none" />
                <p>
                  Your password must include at least 8 characters with one
                  uppercase letter, one number, and one special character
                </p>
              </div>
              <div className={styles.rememberBox}>
                <input
                  type="checkbox"
                  id="remember"
                  className={styles.custom_checkbox}
                  checked={isChecked}
                  onChange={changeAcceptTermsandCondition}
                />
                <label
                  htmlFor="remember"
                  className={styles.custom_label}
                ></label>
                <label htmlFor="remember">Accept terms and condition</label>
              </div>

              <div className={styles.buttonBox}>
                <button className={styles.loginButton} onClick={handleSignup}>
                  Sign Up
                </button>
                <p className={styles.buttonBoxLinks}>
                  <div className={styles.divideline}></div>
                  OR
                  <div className={styles.divideline}></div>
                </p>
                <button className={styles.googleButton}>
                  <Image src={googleLogo} height={22} width={22} alt="none" />
                  <p>Signup with Google</p>
                </button>
                <div className={styles.buttonBoxLinkssignup}>
                  Already have an account?{" "}
                  <p
                    onClick={() => {
                      navigateToLogin();
                    }}
                  >
                    Sign in here.
                  </p>
                </div>
                <div className={styles.buttonBoxLinkssignup2}>
                  By continuing you agree to our
                  <p
                    onClick={() => {
                      setprivacypopUp(true);
                      setoverflowState(true);
                    }}
                  >
                    {" "}
                    Privacy Policy{" "}
                  </p>
                  and
                  <p
                    onClick={() => {
                      settermspopUp(true);
                      setoverflowState(true);
                    }}
                  >
                    Terms & Conditions
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
        {loaderpopUp && (
          <div className={styles.container}>
            <div className={styles.loader}></div>
          </div>
        )}
        {privacypopUp && (
          <div className={styles.container}>
            <div className={styles.boxCont2}>
              <div className={styles.subBox}>
                <div className={styles.closeheader}>
                  <MdClose
                    className={styles.closeIcon}
                    onClick={() => {
                      setprivacypopUp(false);
                      setoverflowState(false);
                    }}
                  />
                </div>
                <h2 className={styles.title}>Privacy Policy</h2>
                <p className={styles.description}>
                  This privacy policy was last updated on June 13th, 2024.
                  IMPAKTER PRO (represented by: IMPAKTER Limited.) is strongly
                  committed to protecting your privacy and the confidentiality
                  of your personal data. This privacy statement (“Privacy
                  Statement”) explains what kind of personal data IMPAKTER PRO,
                  how IMPAKTER PRO processes it, and for what purposes. We
                  comply with laws and regulations that apply to us, including
                  the General Data Protection Regulation (hereinafter: “GDPR”).
                  We support the notion that you should be in control of your
                  personal data. Therefore, we inform you as well as possible
                  about our processing activities and your rights with respect
                  to your data, using clear and plain language. If you still
                  have any questions, please contact IMPAKTER PRO via{" "}
                  <span style={{ color: "#1D2029", fontWeight: "500" }}>
                    impakter.pro@gmail.com
                  </span>
                </p>

                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    Our purposes and legal basis for processing personal data
                  </div>
                  Personal data is data that can be used to identify or contact
                  an individual person. Which of your data we may process and
                  why depends on how you choose to interact with us and the
                  context in which you provide information to us. In general, we
                  process personal data for the following purposes: to enable
                  you to contact us and request services; to invite customers to
                  meetings; to fill the sustainability reports; to create a
                  communication strategy and content part of the subscription;
                  if you have subscribed to our newsletter, to send you
                  electronic messages to keep you up to date about our
                  commercial developments and offers; to send you invites for
                  program events; and/or to prepare or perform an agreement with
                  your company.
                </p>
                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>Legal basis</div>
                  We ask you for certain personal data, for example when you
                  send us data to fill our report. Which of your personal data
                  we may process (and why) depends on the context in which you
                  provide information to us and how you choose to interact with
                  us. In general, your personal data can include your: name;
                  e-mail address; telephone number; address; company name; any
                  additional information that you give us The personal data that
                  we collect is provided by you, collected automatically,
                  publicly available, and/or provided by third parties to us.
                </p>

                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    Personal data
                  </div>
                  Our processing activities are based on different legal
                  grounds. IMPAKTER PRO collects and processes your personal
                  data for the performance of an agreement with you, to comply
                  with legal obligations, based on your consent and/or based on
                  its legitimate interest as set out in the purposes above.
                </p>
                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>Newsletter</div>
                  You have the option to receive our newsletter with information
                  about developments (of our company) and about our services.
                  Each newsletter has the option to unsubscribe. When you
                  subscribe to our newsletter, your subscription will remain
                  active until you unsubscribe.
                </p>
                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>Contact form</div>
                  To enable you to contact us with a question or request, we
                  published our contact details and a contact form on our
                  website. Any information that is provided by you will be used
                  to respond to your question. We will do our best to respond in
                  a helpful manner.
                </p>
                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    Retention period
                  </div>
                  IMPAKTER PRO will retain your personal data for as long as we
                  deem it necessary to enable you to use our services, comply
                  with applicable laws, resolve disputes with any parties, and
                  otherwise as necessary to allow us to conduct our business.
                  All personal data we retain will be subject to this Privacy
                  Statement. If you have a question about a specific retention
                  period for certain types of personal data we process about
                  you, please contact us via the contact details provided below.
                </p>
                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    Third parties
                  </div>
                  We can engage third parties to which we may disclose or
                  transfer your personal data. In case these third parties
                  process your personal data while performing services for us,
                  we will be responsible for processing your personal data as a
                  controller. For processing your personal data as described in
                  this Privacy Statement, we may disclose your personal data to
                  the following parties: our accountants and advisors; partners
                  of IMPAKTER PRO. Where applicable, we have agreed upon a data
                  processing agreement with the relevant third party as
                  mentioned above. We will not disclose or transfer your
                  personal data to third parties for commercial purposes. Only
                  if the law obliges us to do so, we may provide your personal
                  data to regulators and/or (tax) authorities. In all cases, we
                  will take appropriate measures to guarantee the
                  confidentiality and security of your personal data as much as
                  possible.
                </p>
                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>Security</div>
                  We have put appropriate (technical) and organizational
                  measures in place to protect the confidentiality and security
                  of information with regard to your personal data. Access to
                  such information is limited and policies and procedures are in
                  place, designed to safeguard the information from loss,
                  misuse, and improper disclosure.
                </p>
                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    Changes to this Privacy Statement{" "}
                  </div>
                  We reserve the right to change this policy. We may
                  periodically change, modify, add, remove, or otherwise update
                  this Privacy Statement from time to time by posting a new
                  Privacy Statement on this website. Therefore, we recommend
                  consulting this Privacy Statement regularly, so that you are
                  aware of these amendments.
                </p>

                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    Your rights with respect to your data
                  </div>
                  Under the GDPR, you have the right to (request us): access to
                  your personal data; have us correct your personal data, for
                  example, if your personal data is not accurate; have us erase
                  your personal data (if it is no longer needed); restrict us
                  from processing your personal data; revoke your consent for
                  processing; an electronic copy of your personal data (data
                  portability); object to processing your personal data; and If
                  you wish to exercise any of the rights set out above, please
                  contact us via the contact details stated below. We may ask
                  you to provide proper proof of your identity in order to
                  prevent somebody from pretending to be you and thus getting
                  access to your data
                </p>
                <p className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    National supervisory authority
                  </div>
                  If you have any complaints about how we process your personal
                  data, we will do our best to help you effectively. In
                  accordance with UK privacy laws and regulations, you have the
                  right to report a complaint to the national supervisory
                  authority. You can contact the{" "}
                  <a
                    href="https://ico.org.uk/"
                    target="_blank"
                    className={styles.privacyLink}
                  >
                    UK GDPR
                  </a>{" "}
                  here.
                </p>
                <p className={styles.description1}>
                  <div className={styles.maincontainertitle2}>
                    Questions and contact details
                  </div>
                  If you have any questions about this Privacy Statement, the
                  way we process your personal data, or if you wish to submit a
                  request in order to exercise your rights as stated in this
                  Privacy Statement, or if you have any other privacy-related
                  question please contact us:
                  <p className={styles.CompanyInfo1}>
                    <span>Company name:</span> IMPAKTER Limited{" "}
                  </p>
                  <p className={styles.CompanyInfo2}>
                    <span> Website:</span> impakter.com/pro
                  </p>
                  <p className={styles.CompanyInfo2}>
                    <span>E-mail address:</span>impakter.pro@gmail.com{" "}
                  </p>
                  <p className={styles.CompanyInfo2}>
                    <span>Address:</span> 32 Lots Road, London SW10 0QJ,United
                    Kingdom
                  </p>
                </p>

                <button
                  className={styles.button}
                  onClick={() => {
                    setprivacypopUp(false);
                    setoverflowState(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
        {termspopUp && (
          <div className={styles.container}>
            <div className={styles.boxCont2}>
              <div className={styles.subBox}>
                <div className={styles.closeheader}>
                  <MdClose
                    className={styles.closeIcon}
                    onClick={() => {
                      settermspopUp(false);
                      setoverflowState(false);
                    }}
                  />
                </div>
                <h2 className={styles.title}>General Terms & Conditons</h2>
                <div className={styles.description}>
                  Definitions “Affiliate” means any corporation or other legal
                  entity that controls, is controlled by, or is under common
                  control with a Party. “Customer(s)” means any professional
                  business entity entering into a contract with IMPAKTER PRO by
                  accepting the present General Terms & Conditions and
                  registering. For the avoidance of doubt, it is specified that
                  individual persons not acting for professional purposes and/or
                  consumers cannot be Customers of IMPAKTER PRO. “Control”
                  means, for purposes of the definitions of “Affiliate” and
                  “Subsidiary” (a) with respect to a corporation, the control or
                  ownership (directly or indirectly) of fifty percent (50%) or
                  more of the shares or securities of such corporation
                  representing the right to vote for the election of directors,
                  and (b) with respect to any other legal entity, fifty percent
                  (50%) or more ownership interest or control representing the
                  right to make decisions for such entity. An Affiliate or
                  Subsidiary qualifies as such only for so long as such control
                  exists. “Directory” means the compilation of a database
                  containing a general sustainability report, attributes
                  including each entity&apos;s name, physical location,
                  industry, website, and status. IMPAKTER PRO means IMPAKTER
                  Limited., 32 Lots Road, London SW10 0QJ, United Kingdom,
                  Company Number: 10806931 “Business Partners” means companies,
                  offering solutions or online services to their or mutual
                  customers, whose solution is integrated with IMPAKTER PRO.
                </div>
                <div className={styles.description}>
                  <div className={styles.maincontainertitle2}>2. Purpose</div>
                  2.1. IMPAKTER PRO are for professional use and professional
                  Customers only. Individual persons not acting for a
                  professional purpose and/or consumers are expressly excluded
                  from IMPAKTER PRO.
                </div>
                <div className={styles.description2}>
                  <div className={styles.maincontainertitle2}>
                    3. Confidentiality
                  </div>
                  3.1. Except as otherwise expressly authorized by the other
                  Party, IMPAKTER PRO and the customers shall only use the
                  information and documents, of any nature whatsoever concerning
                  the other Party, to which they might have access during or in
                  connection with the report. The content of assessment
                  questionnaires and information related to the IMPAKTER PRO
                  assessment methodology is considered as IMPAKTER PRO
                  confidential information. Answers to questions for the
                  sustainability report will be deemed as the Customer&apos;s
                  confidential information.
                </div>
                <div className={styles.description2}>
                  {" "}
                  3.2. For purposes of service, the Customer company grants
                  IMPAKTER PRO the non-exclusive and royalty-free right, on a
                  worldwide basis, to host, store in cache mode, process,
                  reproduce, and display, the information the customer company
                  will supply in the course of or in connection with the use of
                  the report (the “Data”), and use such Data to deliver services
                  offered by IMPAKTER PRO and to develop the IMPAKTER PRO.The
                  Customer warrants and represents that it has all the rights
                  and authorizations that are necessary to use the Data for
                  purposes of the IMPAKTER PRO Solutions, and that it can freely
                  grant the above license rights.
                </div>
                <div className={styles.description2}>
                  3.3. Article 3.1 shall not apply to information in the public
                  domain or to information known by the other Party prior to the
                  completion of the report. Each Party may disclose, without
                  prior notification, approval, or consent by the other Party,
                  to tax authorities, local or governmental authorities, and
                  courts any confidential information that is required to be
                  disclosed by law, as well as to such Party&apos;s
                  representatives, external counsels and advisors, or for audit
                  purposes.
                </div>
                <div className={styles.description}>
                  3.4. Notwithstanding Article 3.1 above, the Customer
                  sustainability report will be shared only with the Customer,
                  and if by request it will be published on IMPAKTER&apos;s
                  website.
                </div>
                <div className={styles.description2}>
                  <div className={styles.maincontainertitle2}>
                    4. Responsibility of IMPAKTER PRO
                  </div>
                  4.1. In the event that IMPAKTER PRO becomes aware of a data
                  breach incident likely to severely compromise the security of
                  the customer data, IMPAKTER PRO may, without notice, suspend
                  momentarily the provision of its services in order to remedy
                  the security breach in a timely manner. In such an event,
                  IMPAKTER PRO shall not incur any liability to Customers and
                  Customers shall not seek any compensation whatsoever from
                  IMPAKTER PRO.
                </div>
                <div className={styles.description2}>
                  4.2. IMPAKTER PRO does not warrant any results from the use of
                  the sustainability report service and shall only be held to an
                  obligation to use best endeavors. IMPAKTER PRO does not
                  warrant that the report will meet the Customer&apos;s
                  requirements. The report shall be regarded only as a
                  decision-making tool and IMPAKTER PRO cannot be and is not
                  liable for any decision taken by the customer on such basis.
                </div>
                <div className={styles.description}>
                  4.3. The customer company shall receive its report based on
                  the disclosed information and news resources available to
                  IMPAKTER PRO at the time of assessment. Should any information
                  or circumstances change materially during the period of the
                  report, IMPAKTER PRO reserves the right to place the
                  business&apos; rating on hold and, if considered appropriate,
                  to re-assess and possibly issue a revised report.
                </div>
                <div className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    5. Responsibility of Customers
                  </div>
                  5.1. The Customer agrees not to (i) interfere with or attempt
                  to interfere with the proper reporting process. The Customer
                  shall not without the prior written express consent of
                  IMPAKTER PRO translate or adapt the report for any purpose nor
                  arrange or create derivative works based on the report, (ii)
                  make for any purpose any alterations, modifications,
                  additions, or enhancements to the report.
                </div>
                <div className={styles.description2}>
                  <div className={styles.maincontainertitle2}>
                    6. Responsibility of the Rated Company
                  </div>
                  6.1. The Customer shall cooperate with IMPAKTER PRO and ensure
                  that it supplies in a timely manner to IMPAKTER PRO the data,
                  information, and documentation that are appropriate for or in
                  connection with the operation of the report.
                </div>
                <div className={styles.description}>
                  6.2. The Customer shall ensure that all data communicated is
                  accurate, faithful, and complete, and agrees not to post or
                  transmit to IMPAKTER PRO any unlawful, fraudulent, harassing,
                  libelous, or obscene data.
                </div>
                <div className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    7. Compliance with Laws
                  </div>
                  In connection with the performance of this Agreement, the
                  Parties shall comply with all applicable laws and regulations.
                </div>
                <div className={styles.description2}>
                  <div className={styles.maincontainertitle2}>
                    8. Trade Controls
                  </div>
                  8.1. The Customer represents and warrants that (i) neither the
                  Customer nor any of its officers or directors is a Sanctioned
                  Person and (ii) it will not use, and will not allow any party
                  to use, any services provided by IMPAKTER and its Affiliates
                  in connection with doing business with or involving, Cuba,
                  Iran, North Korea, Syria, or the Crimea region (but the list
                  of countries or territories can change over time depending on
                  changes in the law).
                </div>
                <div className={styles.description2}>
                  8.2. The Customer represents and warrants that it will not
                  use, and will not allow any party to use, any services
                  provided by IMPAKTER PRO or its Affiliates in connection with
                  doing business with any Sanctioned Person or for any purpose
                  that would violate, or cause IMPAKTER or its Affiliates to
                  violate, Sanctions or Export Controls.
                </div>
                <div className={styles.description2}>
                  {" "}
                  8.3. The Customer acknowledges and agrees that IMPAKTER PRO
                  and its Affiliates are subject to Sanctions and Export
                  Controls and must take measures to ensure compliance with
                  applicable Sanctions and Export Controls. The Customer,
                  therefore, acknowledges and agrees that its access to and use
                  of any services provided by IMPAKTER or its Affiliates (i) is
                  subject to the representations and warranties provided in this
                  Article 8, (ii) may be blocked and suspended in the event of a
                  potential match to a Sanctioned Person, and (iii) may, in the
                  case of such a potential match, require the Customer to
                  provide information or documentation necessary to confirm its
                  identity.
                </div>
                <div className={styles.description}>
                  8.4. The representations, warranties, covenants, or
                  obligations provided in this Article 8 are given only to the
                  extent that they would not result in a violation of or
                  conflict with Council Regulation (EC) No. 2271/96, as amended,
                  any law or regulation implementing Council Regulation (EC) No.
                  2271/96 in any member state of the European Union, the German
                  Foreign Trade Act or any applicable equivalent law or
                  regulation.
                </div>
                <div className={styles.description2}>
                  <div className={styles.maincontainertitle2}>
                    9. Indemnification
                  </div>
                  9.1. Customer Indemnity. The Customer shall indemnify, defend
                  and hold IMPAKTER harmless from and against any losses,
                  damages, liabilities, claims, and expenses of whatever kind,
                  incurred by IMPAKTER in connection with any claim made against
                  IMPAKTER that arises out of or relates to (i) any breach of
                  any representations, warranties, covenants, or obligations of
                  the Customer, (ii) the consequences of any unlawful,
                  fraudulent, harassing, libelous, or obscene data, information
                  or documents provided to IMPAKTER.
                </div>
                <div className={styles.description}>
                  {" "}
                  9.2. Indemnification Process. The foregoing indemnification
                  obligations are conditioned on the indemnified party: (a)
                  notifying the indemnifying party promptly in writing of such
                  action, (b) reasonably cooperating and assisting in such
                  defense, and (c) giving sole control of the defense and any
                  related settlement negotiations to the indemnifying party with
                  the understanding that the indemnifying party may not settle
                  any claim in a manner that admits guilt or otherwise
                  prejudices the indemnified party, without consent.
                </div>
                <div className={styles.description2}>
                  <div className={styles.maincontainertitle2}>
                    10. Subscription and fees
                  </div>
                  10.1. Receiving the sustainability report and the other
                  services by IMPAKTER PRO is conditioned by the payment of all
                  applicable fees, including a non-refundable, annual, or
                  multi-year subscription fee depending on the plan that the
                  Customer has selected, as detailed on impakter.com/business.
                  All payments are due upon receipt. Local taxes, including
                  withholding tax shall be paid by the Customer or respectively
                  shall be charged to the Customer and their amounts shall not
                  be deducted from the subscription fee.
                </div>
                <div className={styles.description}>
                  10.2. Subject to the Customer&apos;s right to terminate this
                  Agreement pursuant to Article 14.2, IMPAKTER Business reserves
                  the right to revise its annual subscription fee schedule
                  and/or implement a different pricing model or additional fees
                  to be paid, at any time without incurring any liability
                  whatsoever towards the Customer. For the avoidance of doubt,
                  the new fee schedule will be applicable from the next
                  subscription cycle.
                </div>
                <div className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    11. Subscription and fees
                  </div>
                  The entirety of content on the sustainability report,
                  including but not limited to all methodologies, procedures,
                  management tools, workshops, manuals, software packages,
                  databases, guidelines, questionnaires, designs, trademarks,
                  ideas, inventions, expertise, commercial methods, analysis
                  methods, assessment methodologies, assessment results and all
                  other rights covered by intellectual property rights
                  developed, created or acquired by IMPAKTER Business prior to
                  supplying the report or during operation, by any other means
                  whatsoever, are and remain the exclusive property of IMPAKTER
                  PRO. All data and individual entries made by the Customer
                  remain the property of the Customer.
                </div>
                <div className={styles.description2}>
                  <div className={styles.maincontainertitle2}>
                    12. Personal Data
                  </div>
                  12.1. While operating the sustainability report service,
                  IMPAKTER, will process personal data in accordance with the EU
                  General Data Protection Regulation 2016/679 (hereafter
                  “GDPR”). In connection with this processing, IMPAKTER will
                  take adequate physical, administrative, and technical measures
                  to protect such data against their accidental or unlawful
                  destruction, accidental loss, alteration, disclosure, any
                  unauthorized access, in particular over the Internet, as well
                  as against any form of unlawful processing, in accordance with
                  its Statement of Data Privacy, which can be view on our
                  Privacy Policy page.
                </div>
                <div className={styles.description2}>
                  12.2. IMPAKTER&apos;s Statement of Data Privacy is regularly
                  updated notably to comply with applicable laws and
                  regulations. Upon every update, the link to the new version of
                  the Statement of Data Privacy is displayed on IMPAKTER&apos;s
                  website and the Customer is hereby invited to visit it
                  regularly (at least once a month).
                </div>
                <div className={styles.description}>
                  12.3. Should a modification of the Statement of Data Privacy
                  increase significantly the obligations of the Customer, then
                  the Customer shall have the opportunity to terminate its
                  subscription to IMPAKTER PRO on this ground for a period of
                  three (3) months as from the display of the relevant new
                  version of the Statement of Data Privacy on IMPAKTER&apos;s
                  website.
                </div>
                <div className={styles.description2}>
                  <div className={styles.maincontainertitle2}>
                    13. Limitation of Liability
                  </div>
                  13.1. Notwithstanding any other provision in this agreement,
                  IMPAKTER PRO shall in no event be liable for any indirect loss
                  or damage of any kind (including, without limitation, costs of
                  cover, loss of profits, revenue, business, or loss or
                  corruption of data) arising from or relating to this
                  Agreement, including from (i) the sustainability report, (ii)
                  the use of the Data or the assessment results of the Customer
                  company; or (iii) a Customer&apos;s breach of its
                  confidentiality obligations, regardless of the form of action.
                </div>
                <div className={styles.description}>
                  13.2. In any case, the aggregate liability of IMPAKTER PRO,
                  regardless of the legal ground, shall be strictly limited to
                  the amount of the fees paid by the Customer for the IMPAKTER
                  PRO under this Agreement in the preceding twelve (12) months
                  in case of an annual subscription, or in the preceding
                  twenty-four (24) months in case of a two-year subscription.
                </div>
                <div className={styles.description2}>
                  <div className={styles.maincontainertitle2}>14. Term</div>
                  Termination 14.1. This Agreement shall enter into force on the
                  date the Customer accepts the General Terms & Conditions, as
                  validated by online confirmation by IMPAKTER PRO. It will
                  continue for an initial term of twelve (12) or twenty-four
                  (24) months (depending on the selected subscription term),
                  from the date the Customer submitted its data to the IMPAKTER
                  PRO team for the first time. The Agreement will renew by tacit
                  renewal per period of twelve (12) months each unless
                  terminated by either of the Parties in accordance with Article
                  14.2 below.
                </div>
                <div className={styles.description2}>
                  14.2. The Customer may terminate the Agreement at any time,
                  for any reason by sending a written notification to IMPAKTER.
                  The documentation provided in electronic format will be
                  deleted upon request.
                </div>
                <div className={styles.description2}>
                  14.3. IMPAKTER may terminate this Agreement without notice if
                  the Customer is found to be in material breach of any of the
                  terms of this Agreement.
                </div>
                <div className={styles.description}>
                  14.4. IMPAKTER may terminate this Agreement at any time, for
                  any reason, by sending a written notification (or notification
                  in an electronic form) to the Customer. In such a situation,
                  the Customer shall be entitled to receive a refund for the
                  prepaid subscription fees on a pro-rata basis in respect of
                  any Services not received after the date of termination.
                </div>
                <div className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    15. Non-poaching clause
                  </div>
                  IMPAKTER&apos;s success depends on its ability to hire, train
                  and retain a productive and efficient workforce: employees are
                  our most valuable assets, and are instrumental in developing
                  and implementing critical aspects of our strategic business
                  plan, policy, and professional ethics. In recognition of this
                  fact, the Customer agrees that for the duration of the
                  cooperation between the Parties and for a one-year period
                  beginning on the date of termination (regardless of the reason
                  for the termination) (the “Restricted Period”), the Customer
                  will not (directly or indirectly) hire, solicit for hire, or
                  assist others in hiring or soliciting for hire: 1) any
                  employee of IMPAKTER or its Affiliates, or 2) any former
                  employee of IMPAKTER or its Affiliates within three months
                  from the end of the employment contract between the former
                  employee and IMPAKTER. This provision shall not prohibit the
                  Customer from hiring, soliciting for hire, or assisting others
                  in hiring or soliciting for hire, any IMPAKTER&apos;S
                  Affiliates&apos; employee who responds to a general
                  solicitation or advertisement that is not specifically
                  directed to IMPAKTER employees.
                </div>
                <div className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    16. Assignment and transfer
                  </div>
                  The Customer shall not assign or transfer the Agreement to any
                  third party without the prior written consent of IMPAKTER PRO.
                  IMPAKTER PRO may assign this Agreement to any direct or
                  indirect subsidiaries or any other third party.
                </div>
                <div className={styles.description}>
                  <div className={styles.maincontainertitle2}>
                    17. Modification
                  </div>
                  IMPAKTER PRO reserves the right, at any time, to unilaterally
                  modify the terms of this Agreement, subject to the
                  Customer&apos;s ability to terminate the Agreement pursuant to
                  Article 14.2 hereof. The Customers will be informed of any
                  such changes by means of publication on the website
                  impakter.com/business or through any other adequate means.
                </div>
                <div className={styles.description}>
                  {" "}
                  <div className={styles.maincontainertitle2}>
                    18. Applicable law and jurisdiction clause
                  </div>
                  This Agreement shall be governed, construed, and interpreted
                  in accordance with the laws of the Netherlands. Any dispute
                  arising out of or in connection with the Agreement, which
                  cannot be settled amicably, shall be submitted to the
                  competent court of Amsterdam, The Netherlands, which shall
                  have exclusive jurisdiction notwithstanding the plurality of
                  defendants.
                </div>
                <div className={styles.description1}>
                  <div className={styles.maincontainertitle2}>
                    19. Application of the Agreement
                  </div>
                  The Parties hereby agree that this Agreement sets forth the
                  entirety of their respective rights and obligations relating
                  to the subject matter thereof. This Agreement supersedes all
                  prior agreements, negotiations, and discussions between the
                  Parties relating thereto. Any terms or conditions of any
                  purchase order or other documents submitted by the Customer in
                  connection with the access to IMPAKTER PRO that is in addition
                  to, different from, or inconsistent with this Agreement are
                  not binding on IMPAKTER and are ineffective.
                </div>

                <button
                  className={styles.button}
                  onClick={() => {
                    settermspopUp(false);
                    setoverflowState(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
