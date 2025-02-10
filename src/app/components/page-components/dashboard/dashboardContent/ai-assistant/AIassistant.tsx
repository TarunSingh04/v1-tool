import React from 'react';
import styles from "./styles.module.scss";
import ImapakterAILogo from "../../../../assets/comingsoon.gif";
import Image from 'next/image';

const AIassistant = () => {
  return (
    <div className={styles.AIpage}>
        <h4>IMPAKTER AI</h4>
        <div className={styles.assistantBody}>
          <Image src={ImapakterAILogo} width={300} height={300} alt='none'/>
        </div>
    </div>
  )
}

export default AIassistant