"use client";

import React, { useState } from "react";
import Lot1 from "./Lot1";
import Lot2 from "./Lot2";
import Lot3 from "./Lot3";
import Lot4 from "./Lot4";
import Lot5 from "./Lot5";
import Lot6 from "./Lot6";
import Lot7 from "./Lot7";
import styles from './styles.module.scss';
import { useRouter, useSearchParams } from "next/navigation";
import { MobileWarnMessage } from "../../utilities/components/questionnaire/mobile_warn/mobile_warn";

const Governance = () => {
  const router = useRouter();

  const params = useSearchParams();

  const [lot_index, setLotIndex] = useState(parseInt(params.get("lot")) || 0);

  const onSubmit = (index) => {
    // Scroll to top
    window.scrollTo(0, 0);

    setLotIndex(index);
  };

  const goBack = (index) => {
    setLotIndex(index);
  };

  return (
    <>
      <div className={styles.displayWarning}>
       <MobileWarnMessage/>
      </div>

      <div className={styles.displayQuestions}>
        {lot_index === 0 && (
          <Lot1
            onSubmit={onSubmit}
            goBack={() => {
              router.push("/pages/social?lot=5");
            }}
          />
        )}
        {lot_index == 1 && <Lot2 onSubmit={onSubmit} goBack={goBack} />}
        {lot_index == 2 && <Lot3 onSubmit={onSubmit} goBack={goBack} />}
        {lot_index == 3 && <Lot4 onSubmit={onSubmit} goBack={goBack} />}
        {lot_index == 4 && <Lot5 onSubmit={onSubmit} goBack={goBack} />}
        {lot_index == 5 && <Lot6 onSubmit={onSubmit} goBack={goBack} />}
        {lot_index > 5 && (
          <Lot7
            onSubmit={() => {
              router.push("/pages/sdg");
            }}
            goBack={goBack}
          />
        )}
      </div>
    </>
  );
};

export default Governance;
