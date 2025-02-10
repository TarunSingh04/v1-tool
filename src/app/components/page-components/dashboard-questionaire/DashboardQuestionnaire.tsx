"use client"
import React, { useState } from 'react';
import styles from "./styles.module.scss";
import ImapakterLogo from "../../assets/ImpakterquestionaireLogo.svg";
import Image from 'next/image';

const navigators = [
  {
    navId:1,
    sectionName:"Environmental",
    secDescription: ""
  }
]

const DashboardQuestionnaire = () => {
  const [sectionCount, setsectionCount] = useState(1);
  const [sectionSubcount, setsectionSubcount] = useState(1);


  const navigateCountIncrement = ()=>{
    if(sectionCount===1 && sectionSubcount===5){
      setsectionCount(2);
      setsectionSubcount(1);
    }
    else if(sectionCount===2 && sectionSubcount===6){
      setsectionCount(3);
      setsectionSubcount(1);
    }
    else if(sectionCount===3 && sectionSubcount===7){
      setsectionCount(4);
      setsectionSubcount(1);
    }
    else{
      setsectionSubcount(sectionSubcount+1);
    }
  }
  const navigateCountDecrement = ()=>{
    if(sectionCount===2 && sectionSubcount===1){
      setsectionCount(1);
      setsectionSubcount(5);
    }
    else if(sectionCount===3 && sectionSubcount===1){
      setsectionCount(2);
      setsectionSubcount(6);
    }
    else if(sectionCount===4 && sectionSubcount===1){
      setsectionCount(3);
      setsectionSubcount(7);
    }
    else{
      setsectionSubcount(sectionSubcount-1);
    }
  }
  
  return (
    <div className={styles.QuestionaireBox}>
        <div className={styles.questionesidebar}>
          <h1 className={styles.companylogo}>Impakter <span>pro</span></h1>
        </div>
        
        <div className={styles.questioncontent}></div>
    </div>
  )
}

export default DashboardQuestionnaire