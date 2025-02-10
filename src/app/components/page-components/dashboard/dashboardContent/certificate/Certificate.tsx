import React, { useState } from 'react';
import styles from "./styles.module.scss";
import { useRouter } from 'next/navigation';
import certificateBadge from "../../../../assets/certificateBadgeIcon.svg";
import Image from 'next/image';
import { GoDotFill } from "react-icons/go";
import { FaChevronRight } from 'react-icons/fa6';

const Certificate_data = [
  {
    certificateType:"ISO",
    certificateName: ["ISO 14001","ISO 14040"]
  },
  {
    certificateType:"3rd Party",
    certificateName: ["ADM Responsible Soybean Standard","Aluminium Stewardship Initiative"]
  },
  {
    certificateType:"Others",
    certificateName: ["ABNT Ecolabel","Accredited Fish Farm Scheme"]
  }
]

const Certificate = () => {
  const navigate = useRouter();
  const navigateTo = ()=>{
    navigate.push("/pages/certificates");
  }
  return (
    <div className={styles.container}>
        <p className={styles.cardheader}>Certificates</p>
         {
            Certificate_data.map((items:any,index:any)=>{
                return(
                    <div className={styles.taskBox} key={index}> 
                       <div className={styles.taskHead}>
                       <Image src={certificateBadge} width={24} height={24} alt='none' className={styles.certificateBadgeIcon}/>
                       <p className={styles.taskHeader}>
                          {items.certificateType}
                       </p>
                       </div>                   
                       {
                          items.certificateName.map((name:any,index:any)=>{
                            return(
                              <div className={styles.taskDesc} key={index}><GoDotFill className={styles.dotIcon}/><p>{name}</p></div>
                            )
                          })
                       }
                    </div>
                )
            })
        }
         <div className={styles.questionairebtn}>
        <button className={styles.questionbtn2} onClick={()=>{navigateTo()}}>View more <FaChevronRight className={styles.btnIcon}/></button>
      </div>
        
    </div>
  )
}

export default Certificate