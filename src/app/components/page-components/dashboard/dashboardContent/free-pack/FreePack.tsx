"use client"
import React, { useState } from 'react';
import styles from "./styles.module.scss";
import Esgscore from '../esg-score/Esgscore';
import Planboard from '../planboard/Planboard';
import Notifier from "../../../../assets/Notifier.svg";
import Marketup from "../../../../assets/marketUp.svg";
import EuroIcon from "../../../../assets/moneyIcon.svg";
import footerBanner from "../../../../assets/footerframe.png"
import Image from 'next/image';
import dashboardrStatusStore from '../../../../store/dashboarsStatusStore';
import { MdClose } from 'react-icons/md';
import standardBadge from "../../../../assets/basicBage.svg";
import basicBadge from "../../../../assets/basicbadge2.svg";
import { useRouter } from 'next/navigation';
import dashboardOverflowStore from "../../../../store/dashboardOverflowStore";

const FreePack = () => {
  const [subscriptionPopup, setsubscriptionPopup] = useState(false);
  const dashboardStatus = dashboardrStatusStore((state) => state.dashboardStatus);
  const setDashboardStatus = dashboardrStatusStore((state) => state.setDashboardStatus);
  const setDashboardOverflow = dashboardOverflowStore((state) => state.setDashboardOverflow);
  const router = useRouter();
  

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
    <div className={styles.FreePack}>
        <div className={styles.FreeCont}>
        <Esgscore percentage={75}/>
        <Planboard openSubscription={openSubscriptionPopup}/>
        </div>
        <div className={styles.FreeCont}>
          <div className={styles.freecontBox}>
            <div className={styles.freeBoxHeader}>
              <p>Issues</p>
              <p className={styles.subhead}>Number of ESG challenges to address</p>
            </div>
            <div className={styles.Iconcont} style={{background:"#FFE9EC"}}>
            <Image src={Notifier} width={48} height={48} alt='none'/>
            </div>
            <p className={styles.Infotext}>3</p>
          </div>
          <div className={styles.freecontBox}>
            <div className={styles.freeBoxHeader}>
              <p>Actions</p>
              <p className={styles.subhead}>Steps to achieve your sustainability goals.</p>
            </div>
            <div className={styles.Iconcont} style={{background:"#FFF6E9"}}>
            <Image src={Marketup} width={48} height={48} alt='none'/>
            </div>
            <p className={styles.Infotext}>5</p>
          </div>
          <div className={styles.freecontBox}>
            <div className={styles.freeBoxHeader}>
              <p>Potential Savings</p>
              <p className={styles.subhead}>Projected cost savings for your 
              business</p>
            </div>
            <div className={styles.Iconcont} style={{background:"#E7FFFC"}}>
            <Image src={EuroIcon} width={48} height={48} alt='none'/>
            </div>
            <p className={styles.Infotext}>500<span>€</span>- 10,000<span>€</span></p>
          </div>
        </div>
        <div className={styles.FreeCont1}>
          <Image src={footerBanner} width={1500} height={400} alt='none' className={styles.footerBanner}/>
          <div className={styles.footercontent}>
          <p className={styles.footerheader}>ESG Solutions for Your Company</p>
          <p className={styles.footerdesc}>No extra consultancy fees, smart solutions, all in one tool.</p>
          <p className={styles.footerbtn} onClick={openSubscriptionPopup}>choose your plan {">"}</p>
          </div>
        </div>
        {subscriptionPopup && (dashboardStatus==="Free" || dashboardStatus==="Basic") && (
        <div className={styles.container}>
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
                      <div className={styles.lowerpricecont}>All you need for  CSRD-Compliant Scorecards</div>
                    </div>
                </div>}
              </div>
            </div>
            <button className={styles.button} onClick={navigateToPricing}>Choose Your Plan </button>
          </div>
        </div>
        )}
    </div>
  )
}

export default FreePack;