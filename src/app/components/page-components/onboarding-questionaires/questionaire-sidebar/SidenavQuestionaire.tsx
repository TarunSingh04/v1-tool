import React from "react";
import styles from "./styles.module.scss";
import { FaBusinessTime } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { LiaIndustrySolid } from "react-icons/lia";
import { HiRectangleStack } from "react-icons/hi2";

interface Tab {
  tabname: string;
  Iconcomponent: JSX.Element;
}

const questionaireTabs: Tab[] = [
  {
    tabname: "Business Information",
    Iconcomponent: <FaBusinessTime className={styles.Iconscomponent} />,
  },
  {
    tabname: "Sectors Info",
    Iconcomponent: <LiaIndustrySolid className={styles.Iconscomponent} />,
  },
  {
    tabname: "Utilities Info",
    Iconcomponent: <HiRectangleStack className={styles.Iconscomponent} />,
  },
  {
    tabname: "Certificates Details",
    Iconcomponent: <FaRegFileAlt className={styles.Iconscomponent} />,
  },
];

interface SidenavProps {
  questionaireState: number;
  setquestionaireState: React.Dispatch<React.SetStateAction<number>>;
}

const SidenavQuestionaire: React.FC<SidenavProps> = ({
  questionaireState,
  setquestionaireState,
}) => {
  const handleButtonClick = (index: number) => {
    setquestionaireState(index + 1);
  };

  console.log("Current questionaireState:", questionaireState);
  return (
    <div className={styles.QuestionaireContent}>
      {questionaireTabs.map((tab, index) => (
        <div className={styles.tabContainer} key={index}>
          <div className={styles.questionTabs}>
            <div
              className={
                questionaireState === index + 1
                  ? styles.Iconwrap1
                  : styles.Iconwrap
              }
              onClick={() => {
                handleButtonClick(index);
              }}
            >
              <div className={styles.Icons}>{tab.Iconcomponent}</div>
            </div>
            <p>{tab.tabname}</p>
          </div>
          {index !== questionaireTabs.length - 1 && (
            <div className={styles.journeyLine}></div>
          )}
        </div>
      ))}
      <div className={styles.roadmapline}></div>
    </div>
  );
};

export default SidenavQuestionaire;
