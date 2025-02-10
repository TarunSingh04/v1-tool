"use client";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./progressbar.module.scss";
import { STEPS } from "./constants";
import { useRouter } from "next/navigation";
import Checkmark from "../../../../assets/Checkmark.png";
import Image from "next/image";
import Logo from "../../../../assets/Logo.svg";
export const ProgressBar = ({ progress, label }) => {
  return (
    <>
      <div
        key={label}
        style={{
          width: "100%",
        }}
      >
        <LinearProgress variant="determinate" value={progress} />

        {/* Footer Text */}
        <p className={styles.footer_text}>{label}</p>
      </div>
    </>
  );
};

export const SideStepBar = ({ activeStep = 0 }) => {
  const router = useRouter();

  return (
    <>
      <div className={styles.sidenav}>
        <div className={styles.sidenav_header}>
          <Image src={Logo} width={143} height={50} alt="none" />
        </div>

        {/* Stepper */}
        <div className={styles.stepper_container}>
          {STEPS.map((step, index) => {
            return (
              <div key={`${index}-${step.heading}`}>
                <div
                  key={`${index}-${step.heading}_head`}
                  className={styles.step}
                  onClick={() => {
                    router.push(step.path);
                  }}
                >
                  {/* Dot Container */}
                  <div className={styles.dot_container}>
                    {index < activeStep ? (
                      <>
                      <Image alt="checkmark" src={Checkmark} width={21} height={21} style={
                        {
                          marginRight: "8px"
                        }
                      }/>
                      </>
                    ) : (
                      <>
                        <div
                          className={styles.dot}
                          style={
                            activeStep >= index
                              ? { backgroundColor: "#1492ef" }
                              : { backgroundColor: "#e0e0e0" }
                          }
                        >
                          {activeStep === index ? (
                            <div className={styles.dot_inner}></div>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>

                  <div className={styles.step_label_container}>
                    <p className={styles.heading}>{step.heading}</p>
                    <p className={styles.subheading}>{step.sub_heading}</p>
                  </div>
                </div>

                {/* Divider if not last element */}
                {index !== STEPS.length - 1 ? (
                  <div
                    key={`${index}-${step.heading}_divider`}
                    className={styles.divider}
                    style={
                      activeStep > index
                        ? { backgroundColor: "#1492ef" }
                        : { backgroundColor: "#e0e0e0" }
                    }
                  ></div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
