import React, { useState, ChangeEvent } from "react";
import { X } from "lucide-react";
import styles from "./styles.module.scss";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  placeholder: string;
  data: Option[]; // Expect an array of { label: string; value: string }
  onChangeSelected: (selectedValues: Option[]) => void; // Callback to update the parent component's state
  selectedData: Option[];
}

const MultiSelect3: React.FC<MultiSelectProps> = ({
  placeholder,
  data,
  onChangeSelected,
  selectedData,
}) => {
  // Add new option to selected list
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedOption = data.find((option) => option.value === value);

    // Add only if the option exists and isn't already selected
    if (selectedOption && !selectedData.some((item) => item.value === value)) {
      const updatedSelected = [...selectedData, selectedOption];
      onChangeSelected(updatedSelected); // Notify parent
    }
    e.target.value = ""; // Reset select dropdown
  };

  // Remove a tag
  const removeTag = (tagToRemove: Option) => {
    const updatedSelected = selectedData.filter(
      (item) => item.value !== tagToRemove.value
    );
    onChangeSelected(updatedSelected);
  };

  return (
    <div className={styles.container}>
      {/* Select Dropdown */}
      <div className={styles.selectContainer}>
        <select onChange={handleChange} className={styles.select} defaultValue="">
          <option value="" disabled>
            {placeholder}
          </option>
          {data.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Tags */}
      <div className={styles.tagsGrid}>
        {selectedData.map((tag, index) => (
          <div key={tag.value} className={styles.tag}>
            <span className={styles.tagText}>
              {tag.label.length > 16 ? `${tag.label.substring(0, 16)}...` : tag.label}
            </span>
            <X className={styles.closeIcon} onClick={() => removeTag(tag)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect3;
