import styles from "./buttons.module.scss";
import Image from "next/image";
import Checkmark from "../../../../assets/Checkmark.png";
import { CircleCheck, Upload } from "lucide-react";

export const PrimaryButton = ({
  onClick,
  label,
  hasBorder = true,
  outlined = false,
  checked = false,
  prefixIcon = null,
  suffixIcon = null,
  disabled = false,
  width = null,
}) => {
  return (
    <>
      <div className={styles.center}>
        <button
          disabled={disabled}
          className={
            outlined ? styles.primary_button_outlined : styles.primary_button
          }
          style={
            outlined && hasBorder
              ? {width: width, border: disabled?"1px solid #e4e4e4" :"1px solid #1492ef", borderRadius: "32px", color: disabled?"#e4e4e4":null }
              : {width: width, border: "none" }
          }
          onClick={onClick}
        >
          {prefixIcon}{checked ? <CircleCheck  size={16}/> : null}
          {label}{suffixIcon}
        </button>
      </div>
    </>
  );
};

export const SecondaryButton = ({ onClick, label, disabled = false }) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${styles.secondary_button} ${disabled ? styles.disabled : ""}`}
        style={{ width: "100px", height: "35px" }}
      >
        <span>{label}</span>
      </button>
    </>
  );
};

// Upload file button

export const UploadButton = ({ onClick, label }) => {
  return (
    <>
      <input type="file" hidden />
      <button
        onClick={() => {
          document.querySelector('input[type="file"]').click();
        }}
        className={styles.upload_button}
      >
        <div className={styles.center}>
          <div className={styles.upload_icon}>
            <Upload size={15} />
          </div>
          {label}
        </div>
      </button>
    </>
  );
};
