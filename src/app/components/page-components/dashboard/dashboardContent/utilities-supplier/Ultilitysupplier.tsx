"use client"
import React from 'react'
import styles from "./styles.module.scss";
import utility_section_data from '../../../../utilities/utility_section_data';
import Dot from "../../../../assets/dot.svg";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import UtilityBussinessIcon from "../../../../assets/utilitybusiness.svg";
import { FaChevronRight } from 'react-icons/fa6';

const getBackgroundColor = (rating:any) => {
  switch (rating) {
    case 'A':
      return '#6e8e7f';
    case 'B':
      return '#b0d1ab';
    case 'C':
      return '#ecce1d';
    case 'D':
      return '#ed8a38';
    case 'E':
      return '#ea5556';
    case 'F':
      return '#ea5556';
    default:
      return '#fff'; 
  }
};

const Ultilitysupplier = () => {
  const navigate = useRouter();
  const navigateTo = ()=>{
    navigate.push("/pages/utilities")
  }
  const getbackgroundColor = (rating:any)=>{
    if(rating==="A"){
      return "#6F8C60";
    }
    else if(rating==="B"){
      return "#A6C496";
    }
    else if(rating==="C"){
      return "#F1D02C";
    } 
    else if(rating==="D"){
      return "#F18E2C";
    } 
    else{
      return "#F25555";
    }
    }
  return (
    <div className={styles.container}>
        <div className={styles.cardheader}>Utilities</div>
        <div className={styles.pageContainer}>
        {utility_section_data.map((items:any, index:any) => {
          return (
            index<4 &&
            <div
              key={index}
              className={styles.utilitycards}
            >
              <div className={styles.utilitysupcont}>
              <div
                className={styles.utilityRating}
              >
               <Image src={UtilityBussinessIcon} width={20} height={20} alt='none'/> 
              </div>
              <div className={styles.utilities_data}>
                <div className={styles.utilitydatarow}>
                  <p className={styles.title}>
                    {items.companyName}
                  </p>
                  <div className={styles.utilityCol}>
                    <p>{items.country} - </p>
                    <p className={styles.sectorName}>{items.sector}</p>
                  </div>
                </div>
              </div>
              </div>
              <div className={styles.navigateLink2}><p style={{background:getbackgroundColor(items.rating)}}><span>{items.rating}</span> <Image src={Dot} width={5} height={5} alt='none'/></p></div>
            </div>
          );
        })}
        </div>
        <div className={styles.questionairebtn}>
        <div className={styles.questionbtn2} onClick={()=>{navigateTo()}}>View all <FaChevronRight className={styles.btnIcon}/></div>
      </div>

    </div>
  )
}

export default Ultilitysupplier