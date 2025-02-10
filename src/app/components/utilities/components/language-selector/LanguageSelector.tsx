// LanguageSelector.tsx
import { useState } from 'react';
import styles from './styles.module.scss';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface Language {
  code: string;
  countryCode: string; // ISO 3166-1 alpha-2 country code
  name: string;
}

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const languages: Language[] = [
    { 
      code: 'ENG', 
      countryCode: 'GB',
      name: 'English' 
    },
    { 
      code: 'ESP', 
      countryCode: 'ES',
      name: 'Spanish' 
    },
    { 
      code: 'FRA', 
      countryCode: 'FR',
      name: 'French' 
    },
  ];

  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const getFlagUrl = (countryCode: string) => 
    `https://flagsapi.com/${countryCode}/flat/64.png`;

  return (
    <div className={styles.container}>
      <button 
        className={styles.selector} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.flagCircle}>
          <div
            style={{
            backgroundImage: `url(${getFlagUrl(selectedLang.countryCode)})`, // Dynamically set the background image
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "45px",
            height: "45px",
            borderRadius:"50%",
            border: "1px solid rgb(177 177 177 / 72%)"
            }}
          ></div>
        </div>
        <span className={styles.code}>{selectedLang.code}</span>
        <ChevronDown className={styles.chevron} size={16} />
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={styles.option}
              onClick={() => {
                setSelectedLang(lang);
                setIsOpen(false);
              }}
            >
              <div className={styles.flagCircle}>
                <div
                    style={{
                    backgroundImage: `url(${getFlagUrl(lang.countryCode)})`, // Dynamically set the background image
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "45px",
                    height: "45px",
                    borderRadius:"50%",
                    border: "1px solid rgb(177 177 177 / 72%)"
                    }}
                ></div>
              </div>
              <span className={styles.name}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;