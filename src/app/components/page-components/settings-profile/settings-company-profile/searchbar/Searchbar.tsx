"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import searchIcon from "../../../../assets/searchIcon.svg";
import locationIcon from "../../../../assets/locationBlue.svg";

interface SearchBarProps {
  placeholder: string;
  suggestions: string[];
  onSelect: (selected: string) => void;
  value: string; // New prop for binding input value
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // New prop for handling input changes
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  suggestions,
  onSelect,
  value,
  onChange,
}) => {
  const [query, setQuery] = useState<string>(value); // Initialize with the passed value
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setQuery(value); // Update query whenever the value prop changes
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    onChange(event); // Trigger parent change handler

    if (inputValue.length > 1) {
      const matches = suggestions.filter((s) =>
        s.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setIsDropdownOpen(matches.length > 0);
    } else {
      setFilteredSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsDropdownOpen(false);
    onSelect(suggestion); // Notify parent about the selected suggestion
  };

  return (
    <div className={styles.searchbar}>
      <Image
        src={searchIcon}
        width={26}
        height={26}
        alt="search-icon"
        className={styles.searchIcon}
      />
      <Image
        src={locationIcon}
        width={26}
        height={26}
        alt="location-icon"
        className={styles.locationIcon}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={query} // Bind the query state
        onChange={handleInputChange} // Handle changes
        className={styles.searchInput}
      />
      {isDropdownOpen && (
        <ul className={styles.suggestionsList}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
