"use client";

import React, { useState } from "react";
import Lot1 from "./Lot1";
import Lot2 from "./Lot2";
import styles from "./styles.module.scss";
import { useRouter} from 'next/navigation';
import { MobileWarnMessage } from "../../utilities/components/questionnaire/mobile_warn/mobile_warn";


const SustainableDevelopmentGoals = () => {
  const router = useRouter();
  const [lot_index , setLotIndex] = useState(0);

  const onSubmit = (index) => {
    // Scroll to top
    window.scrollTo(0, 0);

    setLotIndex(index);
  }

  const goBack = (index) => {
    setLotIndex(index);
  }
  
  return <>
    <div className={styles.displayWarning}>
       <MobileWarnMessage/>
      </div>
    <div className={styles.displayQuestions}>
  {lot_index === 0 ? (
    <Lot1
      onSubmit={onSubmit}
      goBack={() => {
        router.push('/pages/governance?lot=6');
      }}
    />
  ) : (
    <Lot2 onSubmit={onSubmit} goBack={goBack} />
  )}
</div>
  </>;
};

export default SustainableDevelopmentGoals;
