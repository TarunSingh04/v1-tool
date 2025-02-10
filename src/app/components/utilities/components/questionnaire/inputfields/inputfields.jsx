import {
  MdError,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import styles from "./inputfields.module.scss";
import { useState, useEffect, useRef } from "react";
import { SearchIcon, X } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

export const AnswerInputField = ({
  index,
  label,
  placeholder,
  onChange,
  initial = null,
  prefixIcon = null,
  suffixIcon = null,
  inputType = "text",
  large = false,
}) => {
  return (
    <>
      <div key={`${index}:text_label`} className={`${styles.column}`}>
        <p className={styles.text_label}>{label}</p>

        {large ? (
          <textarea
            defaultValue={initial}
            className={styles.textarea}
            placeholder={placeholder}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        ) : prefixIcon ? (
          <div className={`${styles.row_center} ${styles.searchfield}`}>
            {prefixIcon}
            <input
              defaultValue={initial}
              style={{
                flexGrow: 100,
                border: "none",
                textDecoration: "none",
                outline: "none",
              }}
              type={inputType}
              min={inputType == "number" ? 0 : null}
              max={inputType == "number" ? 100 : null}
              placeholder={placeholder}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <input
              defaultValue={initial}
              className={styles.inputfield}
              type={inputType}
              min={inputType == "number" ? 0 : null}
              max={inputType == "number" ? 100 : null}
              placeholder={placeholder}
              style={{
                flexGrow: 100,
              }}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
            {suffixIcon}
          </div>
        )}
      </div>
    </>
  );
};

export const AnswerRadioButtonField = ({
  index,
  option,
  selectedOption,
  onChange,
  hasInputBox = null,
  inputType = "number",
  inputPlaceholder = "%",
  bottomWidget = null,
}) => {
  return (
    <>
      <div
        key={`${index}:question_choices`}
        className={`${hasInputBox ? styles.row_center : styles.row} ${styles.gap_8}`}
      >
        <input
          type="radio"
          checked={selectedOption == option}
          className={styles.radiobutton}
          value={option}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <div className={styles.row_center}>
          <p
            className={styles.optiontext}
            style={
              hasInputBox
                ? {
                    minWidth: "100px",
                  }
                : {}
            }
          >
            {option}
          </p>
          {hasInputBox && (
            <input
              style={{
                border: "none",
                textDecoration: "none",
                border: "1px solid #e4e4e4",
                marginLeft: "10px",
                padding: "8px 6px",
                borderRadius: "5px",
                width: "60px",
              }}
              label={""}
              placeholder={inputPlaceholder}
              type={inputType}
              min={inputType == "number" ? 0 : null}
              max={inputType == "number" ? 100 : null}
            />
          )}
        </div>
      </div>

      {selectedOption == option && bottomWidget}
    </>
  );
};

export const AnswerCheckboxField = ({
  index,
  option,
  selectedOption = [],
  onChange,
  initial,
  onInputChange = null,
  hasInputBox = null,
  inputType = "number",
  inputPlaceholder = "%",
  checkboxDirection = "start",
  subLabel = null,
  bottomWidget = null,
}) => {
 
  const [inputValue, setInputValue] = useState(initial ? initial.replace("%",''):null);

  const handleChange = (e) => {
    const value = e.target.value;

    // Check if the input is a valid number and within range
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setInputValue(value);
        if (onInputChange && selectedOption.includes(option)){
          onInputChange(value);
        }
    }
  };

  return (
    <>
      <div
        key={`${index}:question_choices`}
        className={`${hasInputBox ? styles.row_center : styles.row} ${subLabel ? "" : styles.gap_8}`}
        style={
          checkboxDirection == "end"
            ? {
                flexDirection: "row-reverse",
                backgroundColor: subLabel ? "#f9fafc" : "transparent",
                padding: "10px 0",
              }
            : {}
        }
      >
        <input
          type="checkbox"
          checked={selectedOption.includes(option)}
          className={styles.checkbox}
          value={option}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <div className={styles.row_between}>
          <div
            style={
              subLabel
                ? {
                    display: "flex",
                    flexDirection: "column",
                  }
                : {}
            }
          >
            <p
              className={styles.optiontext}
              style={
                hasInputBox
                  ? {
                      maxWidth: "600px",
                      minWidth: "460px",
                    }
                  : {}
              }
            >
              {option}
            </p>
            {subLabel}
          </div>
          {hasInputBox && option != "Others" && (
            <input
              style={{
                border: "none",
                textDecoration: "none",
                border: "1px solid #e4e4e4",
                marginLeft: "10px",
                padding: "8px 6px",
                borderRadius: "5px",
                width: "60px",
              }}
              value={inputValue}
              onChange={handleChange}
              label={""}
              placeholder={inputPlaceholder}
              type={inputType}
              min={inputType == "number" ? 0 : null}
              max={inputType == "number" ? 100 : null}
            />
          )}
        </div>
      </div>
      {option == "Others" ? (
        <input
          style={{
            border: "none",
            textDecoration: "none",
            border: "1px solid #e4e4e4",
            marginLeft: "20px",
            padding: "8px 6px",
            borderRadius: "5px",
            width: "96%",
          }}
          defaultValue={initial}
          onChange={
            (e) => {
              if(selectedOption.includes(option)){
                onInputChange(e.target.value);
              }
            }
          }
          label={""}
          placeholder={"Please Describe"}
          type={"text"}
        />
      ) : (
        <></>
      )}

      {selectedOption.includes(option) && bottomWidget}
    </>
  );
};

export const SearchableDropdown = ({
  label = "Select Sustainable Development Goals",
  subLabel = "Max 5 SDGs Allowed",
  options,
  onChange,
  onClick,
  checkboxDirection = "start",
  children = [],
  isSDG = false,
  sdgImages = [],
  initial = [],
}) => { 
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(initial);

  useEffect(() => {
    var allOptions = options;
    const filterOptions = () => {
      if (searchText.length == 0) {
        setFilteredOptions(allOptions);
      } else {
        setFilteredOptions(
          allOptions.filter((allOptions) => {
            return allOptions.toLowerCase().includes(searchText.toLowerCase());
          })
        );
      }
    };
    filterOptions();
  }, [searchText, options]);

  const setDropdownVisibility = (visibility) => {
    setShowDropdown(visibility);
    onClick();
  };

  const addOption = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    onChange([...selectedOptions, option]);
  };

  const removeOption = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
    onChange(selectedOptions.filter((item) => item !== option));
  };

  return (
    <div>
      <div
        className={styles.dropdown_button}
        onClick={() => {
          setDropdownVisibility(!showDropdown);
        }}
      >
        <p className={styles.optiontext}>{label}</p>

        {showDropdown ? (
          <MdKeyboardArrowDown color="#1492ef" size={25} />
        ) : (
          <MdKeyboardArrowUp color="#1492ef" size={25} />
        )}
      </div>

      {showDropdown && (
        <div className={styles.dropdown_container}>
          <AnswerInputField
            prefixIcon={
              <SearchIcon
                width={20}
                height={20}
                color="#0077cc"
                style={{
                  marginRight: "8px",
                }}
              />
            }
            index={0}
            label={""}
            placeholder={"Type to search"}
            onChange={(text) => {
              setSearchText(text);
            }}
          />
          {subLabel && (
            <div className={styles.row}>
              <MdError color={"#7c7c7c"} />{" "}
              <p className={styles.optiontext}>{subLabel}</p>
            </div>
          )}
          {filteredOptions ? (
            <>
              {filteredOptions.map((option, index) => {
                return (
                  <AnswerCheckboxField
                    checkboxDirection={checkboxDirection}
                    subLabel={
                      checkboxDirection == "end" ? (
                        <p
                          style={{
                            fontSize: "12px",
                            paddingLeft: "10px",
                            color: "grey",
                          }}
                        >
                          Utilities in the grey sub line
                        </p>
                      ) : null
                    }
                    key={`${index}:searchable_dropdown`}
                    index={index}
                    option={option}
                    selectedOption={selectedOptions}
                    onChange={(option) => {
                      if (selectedOptions.includes(option)) {
                        removeOption(option);
                      } else {
                        if (selectedOptions.length >= 5) {
                          toast.error("Max 5 SDGs allowed");
                          return;
                        }
                        addOption(option);
                      }
                    }}
                  />
                );
              })}
            </>
          ) : null}

          {children}
        </div>
      )}

      {!showDropdown && (
        <div className={styles.selected_option_container}>
          {selectedOptions.map((option, index) => {
            return (
              <div
                key={`${index}:selected_option`}
                className={styles.selected_option}
              >
                {isSDG && (
                  <Image
                    alt="sdg image"
                    src={sdgImages[options.indexOf(option)]}
                    style={{
                      height: "60px",
                      width: "60px",
                      margin: "0 5px 0 0",
                      borderRadius: "6px",
                    }}
                  />
                )}
                <p className={styles.selected_text}>{option}</p>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    margin: "0",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  type="button"
                  onClick={() => {
                    removeOption(option);
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const PercentageInputField = ({
  inputType = "number",
  inputPlaceholder = "hi",
  onChange = null,
}
) => {
  const [inputValue, setInputValue] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;

    // Check if the input is a valid number and within range
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setInputValue(value);

      if(onChange){
        onChange(value);
      }
     
      
    }
  };

  return (
    <input
      onChange={(e) => {
        handleChange(e);
      }}
      value={inputValue}
      style={{
        border: "none",
        textDecoration: "none",
        border: "1px solid #e4e4e4",
        margin: "5px 10px",
        padding: "8px 6px",
        borderRadius: "5px",
        width: "60px",
      }}
      label={""}
      placeholder={"%"}
      type={"number"}
      min={0}
      max={100}
    />
  );
};
