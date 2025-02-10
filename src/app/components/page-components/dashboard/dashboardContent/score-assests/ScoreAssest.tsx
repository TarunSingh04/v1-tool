"use client"
import React, { useState } from 'react';
import styles from "./styles.module.scss";
import ScoreCardIcon from "../../../../assets/ScorecardIcon.svg";
import ResportsIcon from "../../../../assets/ReportIcon.svg"
import BadgeIcon from "../../../../assets/BadgeIcon.svg";
import linksTab from "../../../../assets/linksbtn.svg";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dashboardrStatusStore from '@/app/components/store/dashboarsStatusStore';
import { MdClose } from 'react-icons/md';
import standardBadge from "../../../../assets/basicBage.svg";
import basicBadge from "../../../../assets/basicbadge2.svg";
import dashboardOverflowStore from "../../../../store/dashboardOverflowStore";

const ScoreAssest = () => {
  const router = useRouter();
  const [subscriptionPopup, setsubscriptionPopup] = useState(false);
  const setDashboardOverflow = dashboardOverflowStore((state) => state.setDashboardOverflow);
  const dashboardStatus = dashboardrStatusStore(
    (state) => state.dashboardStatus
  );
  const navigateTo = (component:any)=>{
    router.push(`/pages/${component}`);
  }

  const openSubscriptionPopup  = ()=>{
    setsubscriptionPopup(true);
    setDashboardOverflow(true);
  }
  const closeSubscriptionPopup = ()=>{
    setsubscriptionPopup(false);
    setDashboardOverflow(false);
  }

  const navigateToPricing = ()=>{
    router.push("/pages/pricing");
    setDashboardOverflow(false);
  }
  return (
    <div className={styles.container}>
        <p className={styles.cardheader}>My Assets</p>
        <p className={styles.cardDescription}>View, download, and manage all your main assets</p>
        <div className={styles.assetcontainer}>
            <div className={styles.assetrightcont}>
            <div className={styles.ImgIcon}>
               <Image src={BadgeIcon} width={24} height={24} alt='none'/>
            </div>
            <div className={styles.assestname}>Sustainability Badge</div>
            </div>
            <Image src={linksTab} width={18} height={18} alt='none' onClick={()=>{navigateTo("sustainability-badge")}} className={styles.linkTab}/>
        </div>

        <div className={styles.assetcontainer}>
            <div className={styles.assetrightcont}>
            <div className={styles.ImgIcon}>
               <Image src={ScoreCardIcon} width={24} height={24} alt='none'/>
            </div>
            <div className={styles.assestname}>Scorecard</div>
            </div>
            <Image src={linksTab} width={18} height={18} alt='none' onClick={()=>{navigateTo("sustainability-badge")}} className={styles.linkTab}/>
        </div>

        <div className={styles.assetcontainer}>
            <div className={styles.assetrightcont}>
            <div className={styles.ImgIcon}>
               <Image src={ResportsIcon} width={24} height={24} alt='none'/>
            </div>
            <div className={styles.upgradecont}>
            <div className={styles.assestname}>ESG Progress Report & Action Plan</div>
            {dashboardStatus==="Basic" && <div className={styles.upgradebtn2} onClick={openSubscriptionPopup}>Upgrade Plan</div>}
            </div>
            </div>
            {dashboardStatus==="Basic" && <div className={styles.upgradebtn} onClick={openSubscriptionPopup}>Upgrade Plan</div>}
            {dashboardStatus==="Standard" && <Image src={linksTab} width={18} height={18} alt='none' onClick={()=>{navigateTo("sustainability-badge")}} className={styles.linkTab}/>}
        </div>
        {subscriptionPopup && (dashboardStatus==="Free" || dashboardStatus==="Basic") && (
        <div className={styles.containerpop}>
          <div className={styles.boxCont1}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={closeSubscriptionPopup}
                />
              </div>
              <h2 className={styles.title}>Ready to get started?</h2>
              <p className={styles.description}>
              We guide you to a full sustainability transformation that meets EU regulations.
              </p>

              <div className={styles.priceCardscont}>
                <div className={styles.pricecard}>
                  <div className={styles.imageBox1}>
                    <Image src={standardBadge} width={30} height={30} alt='none' className={styles.ImageIcon}/>
                  </div>
                  <div className={styles.priceInfotext}>
                      <div className={styles.upperpricecont}>
                       <div className={styles.cardTitle}>Standard</div>
                       <div className={styles.cardPrice}><span>499</span><span className={styles.euroIconsymbol}>€</span>/yr</div>
                      </div>
                      <div className={styles.lowerpricecont}>All you need for ESG reporting, action plan, and beyond</div>
                    </div>
                </div>
                {dashboardStatus=== "Free" && <div className={styles.pricecard1}>
                <div className={styles.imageBox2}>
                    <Image src={basicBadge} width={30} height={30} alt='none' className={styles.ImageIcon}/>
                  </div>
                  <div className={styles.priceInfotext1}>
                      <div className={styles.upperpricecont}>
                       <div className={styles.cardTitle}>Starter</div>
                       <div className={styles.cardPrice}><span>299</span><span className={styles.euroIconsymbol}>€</span>/yr</div>
                      </div>
                      <div className={styles.lowerpricecont}>This is the title description for the plan</div>
                    </div>
                </div>}
              </div>
            </div>
            <button className={styles.button} onClick={navigateToPricing}>Choose Your Plan</button>
          </div>
        </div>
        )}
    </div>
  )
}

export default ScoreAssest