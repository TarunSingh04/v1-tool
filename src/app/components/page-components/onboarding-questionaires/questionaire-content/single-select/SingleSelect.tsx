// import React from "react";
// import styles from "./styles.module.scss";

// interface Option {
//   value: string | number;
//   label: string;
// }

// interface SingleSelectProps {
//   fieldData: Option[];
//   setState: (value: string | number) => void;
//   state:string,
//   placeholder: string;
// }

// const SingleSelect: React.FC<SingleSelectProps> = ({ fieldData, setState, placeholder,state }) => {
//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setState(event.target.value);
//   };
  

//   return (
//     <div className={styles.selectContainer}>
//       <select className={styles.select} onChange={handleChange} value={state}>
//         <option value="" disabled>
//           {placeholder}
//         </option>
//         {fieldData.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SingleSelect;
import React, { useState, ChangeEvent } from "react";
import { ChevronDown, Search } from "lucide-react";
import styles from "./styles.module.scss";

interface Option {
  value: string | number;
  label: string;
}

interface SingleSelectProps {
  fieldData: Option[];
  setState: (value: string | number) => void;
  state: string;
  placeholder: string;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  fieldData,
  setState,
  placeholder,
  state,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredOptions = fieldData.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(option.value).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (value: string | number) => {
    setState(value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const selectedLabel = fieldData.find(option => option.value === state)?.label || placeholder;

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.selectButton}
          type="button"
        >
          <span className={`${styles.buttonText} ${!state ? styles.placeholder : ''}`}>
            {selectedLabel}
          </span>
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
                style={{ paddingLeft: "35px" }}
              />
            </div>

            <div className={styles.optionsList}>
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.optionItem} ${
                    state === option.value ? styles.selected : ""
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className={styles.noResults}>No results found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSelect;