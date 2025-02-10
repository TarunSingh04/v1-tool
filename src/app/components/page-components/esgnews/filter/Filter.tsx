import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import filter from "../../../assets/Filter.svg";
import styles from "./styles.module.scss";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface FiltersProps {
  data: any;
  onFilteredDataChange: (filteredData: any) => void;
}

const FiltersPopup: React.FC<FiltersProps> = ({ data, onFilteredDataChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const filterSections: FilterSection[] = [
    {
      id: 'category',
      title: 'Category',
      options: [
        { id: 'Business', label: 'Business' },
        { id: 'Tech', label: 'Tech' },
        { id: 'Environment', label: 'Environment' },
        { id: 'Climate Change', label: 'Climate Change' },
      ],
    },
    {
      id: 'article_length',
      title: 'Article Length',
      options: [
        { id: 'short', label: 'Short read' },
        { id: 'medium', label: 'Medium read' },
        { id: 'long', label: 'Long read' },
      ],
    },
  ];

  const toggleOption = (sectionId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const currentSection = prev[sectionId] || [];
      const updated = currentSection.includes(optionId)
        ? currentSection.filter(id => id !== optionId)
        : [...currentSection, optionId];
      
      return {
        ...prev,
        [sectionId]: updated
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilteredDataChange(data);
  };

  const applyFilters = () => {
    const filteredData = data.filter((item: { Categories: any[]; Summary: string; }) => {
      const categoryFilters = selectedFilters.category || [];
      const articleLengthFilters = selectedFilters.article_length || [];

      const passesCategory = categoryFilters.length === 0 || 
        item.Categories.some(cat => categoryFilters.includes(cat));

      // Example logic for article length - you might want to adjust this based on your needs
      const getArticleLength = (summary: string): string => {
        const wordCount = summary.split(' ').length;
        if (wordCount < 50) return 'short';
        if (wordCount < 100) return 'medium';
        return 'long';
      };

      const passesLength = articleLengthFilters.length === 0 || 
        articleLengthFilters.includes(getArticleLength(item.Summary));

      return passesCategory && passesLength;
    });

    onFilteredDataChange(filteredData);
    setIsOpen(false);
  };

  return (
    <div className={styles.filterContainer}>

      <div className={styles.Filters}  onClick={() => setIsOpen(!isOpen)}><Image src={filter} width={16} height={16} alt='none' className={styles.filterIcon}/>FILTERS</div>

      {isOpen && (
        <div className={styles.filterPopup}>
          <div className={styles.filterSections}>
            {filterSections.map(section => (
              <div key={section.id} className={styles.filterSection}>
                <div className={styles.sectionHeader}>
                  <ChevronDown className={styles.chevron} />
                  <span className={styles.sectionTitle}>{section.title}</span>
                </div>
                
                <div className={styles.optionsList}>
                  {section.options.map(option => (
                    <label key={option.id} className={styles.filterOption}>
                      <input
                        type="checkbox"
                        checked={(selectedFilters[section.id] || []).includes(option.id)}
                        onChange={() => toggleOption(section.id, option.id)}
                        className={styles.checkbox}
                      />
                      <span className={styles.optionLabel}>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.filterActions}>
            <button
              onClick={clearFilters}
              className={styles.clearButton}
            >
              CLEAR
            </button>
            <button
              onClick={applyFilters}
              className={styles.applyButton}
            >
              APPLY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPopup;