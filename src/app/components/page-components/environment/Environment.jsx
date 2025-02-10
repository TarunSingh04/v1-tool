"use client";

import React, { useState } from "react";
import Lot1 from "./Lot1";
import Lot2 from "./Lot2";
import Lot2A from "./Lot2A";
import Lot3 from "./Lot3";
import Lot4 from "./Lot4";
import Lot4A from "./Lot4A";
import Lot4B from "./Lot4B";
import Lot4C from "./Lot4C";
import Lot5 from "./Lot5";
import { useRouter, useSearchParams} from 'next/navigation';
import {MobileWarnMessage} from "../../utilities/components/questionnaire/mobile_warn/mobile_warn";
import styles from './styles.module.scss';

const Environment = () => {
  const router = useRouter();
  const params = useSearchParams();
  

  const [lot_index , setLotIndex] = useState(parseInt(params.get('lot')) || 0);
  

  const onSubmit = (index) => {
    // Scroll to top
    window.scrollTo(0, 0);

    setLotIndex(index);
  }

  const goBack = (index) => {
    setLotIndex(index);
  }

  return (
    <>
      <div className={styles.displayWarning}>
       <MobileWarnMessage/>
      </div>
      <div className={styles.displayQuestions}>
        {lot_index === 0 && <Lot1 onSubmit={onSubmit} goBack={goBack} />}
        {lot_index === 1 && <Lot2 onSubmit={onSubmit} goBack={goBack} />}
        {lot_index === 2 && <Lot2A onSubmit={onSubmit} goBack={goBack} />}
        {lot_index === 3 && <Lot3 onSubmit={onSubmit} goBack={goBack} />}
        {lot_index === 4 && <Lot4 onSubmit={onSubmit} goBack={goBack} />}
        {lot_index === 5 && <Lot4A onSubmit={onSubmit} goBack={goBack} />}
        {lot_index === 6 && <Lot4B onSubmit={onSubmit} goBack={goBack} />}
        {lot_index === 7 && <Lot4C onSubmit={onSubmit} goBack={goBack} />}
        {lot_index === 8 && <Lot5 onSubmit={(index)=>{
          router.push("/pages/social");
        }} goBack={goBack} />}
      </div>
    </>
  )
    
};

export default Environment;
