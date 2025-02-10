import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { X } from "lucide-react";

interface SearchSelectProps {
  placeholder: string;
  tagkeep: boolean;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  placeholder,
  tagkeep,
}) => {
  const [showSelect, setshowSelect] = useState(false);
  const [selectedItems, setselectedItems] = useState([]);
  const removeTag = (tagToRemove: string) => {
    setselectedItems(selectedItems.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div className={styles.searchselect}>
      <div
        className={showSelect ? styles.selectBox1 : styles.selectBox}
        onClick={() => {
          setshowSelect(!showSelect);
        }}
      >
        <span>{placeholder}</span>
        {showSelect && <FaChevronUp className={styles.selectIcon} />}
        {!showSelect && <FaChevronDown className={styles.selectIcon} />}
      </div>
      {tagkeep && selectedItems.length < 3 && (
        <div className={styles.searchselectwarning}>
          <AiOutlineExclamationCircle className={styles.warnIcon} /> Select at
          least three utilities
        </div>
      )}
      <div className={styles.tagsGrid}>
        {selectedItems.map((tag: any, index: any) => (
          <div key={index} className={styles.tag}>
            <span className={styles.tagText}>
              {tag?.length > 16 ? tag.substring(0, 16) + "..." : tag}
            </span>
            <X className={styles.closeIcon} onClick={() => removeTag(tag)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSelect;
