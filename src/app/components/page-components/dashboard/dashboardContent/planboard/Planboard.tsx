import React from 'react'
import styles from "./styles.module.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import ScoreCardIcon from "../../../../assets/ScorecardIcon.svg";
import ResportsIcon from "../../../../assets/ReportIcon.svg";
import BadgeIcon from "../../../../assets/BadgeIcon.svg";
import Image from 'next/image';

interface PlanboardProps {
  openSubscription: () => void; // Define the function prop type here
}

const Planboard: React.FC<PlanboardProps> = ({ openSubscription }) => {
  return (
    <div className={styles.planboard}>
        <div>
        <p className={styles.planheader}>Off to a great start!</p>
        <p className={styles.plandescription}>Your initial score is based on the information you provided during onboarding. For a more accurate evaluation, complete our ESG questionnaire to gain access to :</p>
        <div className={styles.planCards}>
          <div className={styles.cards}>
            <div className={styles.imageContainer}><Image src={ScoreCardIcon} width={20} height={20} alt="none"/></div>
            <div className={styles.carddescription}>CSRD-Compliant Scorecard</div>
          </div>
          <div className={styles.cards}>
            <div className={styles.imageContainer}><Image src={ResportsIcon} width={20} height={20} alt="none"/></div>
            <div className={styles.carddescription}>ESG Progress Report & Action Plan</div>
          </div>
          <div className={styles.cards}>
            <div className={styles.imageContainer}><Image src={BadgeIcon} width={20} height={20} alt="none"/></div>
            <div className={styles.carddescription}>Sustainability Badge</div>
          </div>
        </div>
        </div>

        <div className={styles.lowercont}>
           <button onClick={openSubscription}>choose your plan <MdKeyboardArrowRight className={styles.rightArrowIcon}/></button>
        </div>
    </div>
  )
}

export default Planboard