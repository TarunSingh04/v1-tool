import React from 'react';
import styles from './styles.module.scss';
import { colors } from '@mui/joy';
import { FaChevronRight } from "react-icons/fa6";
import Image from 'next/image';
import QuestionArrow from "../../../../assets/questionarrow.svg";
import { useRouter } from 'next/navigation';

const Tasks_Data = [
    {
        taskName:"Critical Task",
        taskTag:"Environmental",
        taskDescription:"Missing key certificates / ISO / EPDS",
        color:"#34D399"
    },
    {
        taskName:"Key Task",
        taskTag:"Social",
        taskDescription:"Missing key certificates / ISO / EPDS",
        color:"#60A5FA"
    },
    {
        taskName:"Supporting Task",
        taskTag:"Governance",
        taskDescription:"Missing key certificates / ISO / EPDS",
        color:"#F59E0B"
    }
]

const Taskmanger = () => {
  const router = useRouter();
  const navigatTo = () =>{
    router.push("/pages/mytasks")
  }
  return (
    <div className={styles.container}>
        <p className={styles.cardheader}>My Tasks</p>
        {
            Tasks_Data.map((items:any,index:any)=>{
                return(
                    <div className={styles.taskBox} key={index}> 
                       <div className={styles.taskHead}>
                       <p className={styles.taskHeader}>
                          {items.taskName}
                       </p>
                       <Image src={QuestionArrow} width={24} height={24} alt="none" className={styles.TaskIcon}/>
                       </div>                   
                       <p className={styles.taskDesc}>{items.taskDescription}</p>
                       <div className={styles.tags}>{index===0 && <span className={styles.pending}>Pending</span>}{index===1 &&<span className={styles.progress}>In Progress</span>}{index===2 &&<span className={styles.done}>Completed</span>}</div>
                    </div>
                )
            })
        }
        <div className={styles.questionairebtn}>
        <button className={styles.questionbtn2} onClick={()=>{navigatTo()}}>View all <FaChevronRight className={styles.btnIcon}/></button>
      </div>

    </div>
  )
}

export default Taskmanger