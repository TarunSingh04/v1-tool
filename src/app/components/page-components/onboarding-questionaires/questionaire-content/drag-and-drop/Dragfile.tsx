import React, { useRef, useState } from "react";
import styles from "./styles.module.scss"; // Import the CSS module
import Image from "next/image";
import uploader from "../../../../assets/uploaderCertificate.svg";

// Define accepted file types
const acceptedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]; // Accept pdf, doc, docx

interface DropFileInputProps {
  onFileChange: (files: File[]) => void;
  fileState: File[]; 
}

const DragFile: React.FC<DropFileInputProps> = ({ onFileChange,fileState }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<File[]>([]);

  const onDragEnter = () => wrapperRef.current?.classList.add(styles.dragover);
  const onDragLeave = () =>
    wrapperRef.current?.classList.remove(styles.dragover);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    wrapperRef.current?.classList.remove(styles.dragover);

    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileUpload(files);
  };

  const handleFileUpload = (files: File[]) => {
    // Filter files based on accepted types
    const filteredFiles = files.filter((file) =>
      acceptedFileTypes.includes(file.type)
    );
    if (filteredFiles.length > 0) {
      // Ensure no duplicates
      const updatedList = [
        ...fileList,
        ...filteredFiles.filter(
          (f) => !fileList.some((file) => file.name === f.name)
        ),
      ];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file: File) => {
    const updatedList = fileState.filter((f) => f.name !== file.name);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  const getFileIcon = (fileType: string) => {
    // Return the appropriate icon based on the file type
    if (fileType === "application/pdf") {
      return "https://cdn-icons-png.flaticon.com/512/337/337946.png"; // PDF Icon
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return "https://cdn-icons-png.flaticon.com/512/337/337932.png"; // DOC/DOCX Icon
    } else {
      return "https://cdn-icons-png.flaticon.com/512/565/565547.png"; // Default Icon
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className={styles.dropFileInput}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()} // Prevent default behavior to allow drop
      >
        <label htmlFor="fileInput" className={styles.dropFileInput__label}>
          <p className={styles.dragInnerText}>
            <Image
              src={uploader}
              width={35}
              height={35}
              alt="none"
              className={styles.fileuploaderImage}
            />
            <p>Drag & Drop Files or select to upload</p>
          </p>
        </label>
        {/* Hidden input field */}
        <input
          type="file"
          id="fileInput" // Link this id to the label
          multiple
          accept=".pdf,.doc,.docx" // Accept only PDF and DOC files
          onChange={onFileDrop}
          className={styles.fileInput} // Apply hidden style
          style={{ visibility: "hidden" }}
        />
      </div>

      {fileState!==null && (
        <div className={styles.dropFilePreview}>
          {fileState!==null && fileState.length!==0 &&<p className={styles.dropFilePreview__title}>Ready to upload</p>}
          {fileState.map((file, index) => (
            <div key={index} className={styles.dropFilePreview__item}>
              {/* Dynamically show icon based on the file type */}
              <div className={styles.dropFilePreview__item__info}>
                <p>{file.name}</p>
                <p>{(file.size / 1024).toFixed(2)} KB</p>
              </div>
              <span
                className={styles.dropFilePreview__item__del}
                onClick={() => fileRemove(file)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DragFile;
