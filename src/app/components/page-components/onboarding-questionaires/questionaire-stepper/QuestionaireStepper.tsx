import React, { useState } from "react";
import styles from "./style.module.scss";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string; // Optional prop for additional styling
}

const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  className = "",
}) => {
  const getProgressWidth = (): string => {
    return `${(currentStep / totalSteps) * 100}%`;
  };

  // Helper function to format the step number
  const formatStepNumber = (num: number): string => {
    return `0${num.toFixed(1).replace(".0", "")}`;
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: getProgressWidth() }}
        />
      </div>

      {/* <p className={styles.stepCount}>
        Step {formatStepNumber(currentStep)} of {formatStepNumber(totalSteps)}
      </p> */}
    </div>
  );
};

export default StepProgress;
