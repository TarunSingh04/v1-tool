import React, { useState, ChangeEvent } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import styles from "./styles.module.scss";

// Using extends to allow additional properties while ensuring label and value exist
interface Option extends Record<string, any> {
  label: string;
  value: string;
}

interface MultiSelectProps {
  placeholder: string;
  data: Option[];
  onChangeSelected: (selectedItems: Option[]) => void;
  selectedData: Option[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  data,
  onChangeSelected,
  selectedData,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredOptions = data.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (option: Option) => {
    const isSelected = selectedData.some((item) => item.value === option.value);
    let updatedSelected: Option[];
    
    if (isSelected) {
      updatedSelected = selectedData.filter((item) => item.value !== option.value);
    } else {
      updatedSelected = [...selectedData, option];
    }
    
    onChangeSelected(updatedSelected);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const removeTag = (optionToRemove: Option) => {
    const updatedSelected = selectedData.filter(
      (item) => item.value !== optionToRemove.value
    );
    onChangeSelected(updatedSelected);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.selectButton}
        >
          <span>{placeholder}</span>
          <ChevronDown className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`} />
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearchChange}
                style={{paddingLeft:"35px"}}
              />
            </div>

            <div className={styles.optionsList}>
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={styles.optionItem}
                  onClick={() => toggleItem(option)}
                >
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedData.some((item) => item.value === option.value)}
                    onChange={() => {}}
                  />
                  <div className={styles.optionContent}>
                    <div className={styles.optionTitle}>{option.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.tagsGrid}>
        {selectedData.map((option, index) => (
          <div key={index} className={styles.tag}>
            <span className={styles.tagText}>
              {option.label.length > 12
                ? option.label.substring(0, 12) + "..."
                : option.label}
            </span>
            <X 
              className={styles.closeIcon} 
              onClick={() => removeTag(option)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;