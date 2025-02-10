import React, { useState, ChangeEvent } from "react";
import { BsEnvelopeOpen } from "react-icons/bs";
import styles from "./styles.module.scss"; // Import SCSS module
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

interface TwoFactorAuthProps {
  email: string;
  setpopUp: (value: boolean) => void; // Updated type
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ email, setpopUp }) => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [loader, setloader] = useState(true);
  const router = useRouter();

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

  const verifyOtp = () => {
    setloader(true);
    setTimeout(() => {
      router.push("/pages/onboarding");
    }, 2800);
    console.log(123);
  };

  const closePopUp = () => {
    setpopUp(false);
  };

  return (
    <div className={styles.container}>
      {loader && <div className={styles.loader}></div>}
      {!loader && (
        <div className={styles.boxCont}>
          <div className={styles.subBox}>
            <div className={styles.closeheader}>
              <MdClose className={styles.closeIcon} onClick={closePopUp} />
            </div>
            <h2 className={styles.title}>Verify your Email Address</h2>
            <p className={styles.description}>
              Kindly copy and paste the code that was sent to your email address for verification.
            </p>
          </div>

          <div className={styles.codeInputs}>
            {code.map((digit, index) => (
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
          <button
            className={styles.button}
            onClick={verifyOtp}
          >
            VERIFY EMAIL
          </button>
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuth;
