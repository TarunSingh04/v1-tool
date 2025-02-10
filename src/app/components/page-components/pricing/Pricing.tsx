"use client"
import React from 'react';
import styles from "./styles.module.scss";
import logoutIcon from "../../assets/log-out.svg";
import notifyIcon from "../../assets/notifyIcon'.svg";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import footer from "../../assets/priceHeaderTitle.svg";
import desccheck from "../../assets/priceTickcheck.svg";
import basicPriceLogo from "../../assets/basicPriceboxlogo.svg";
import standardPriceLogo from "../../assets/standardPriceBoxLogo.svg";
import dashboardrStatusStore from '../../store/dashboarsStatusStore';
import useDashboardStatusStore from '../../store/dashboarsStatusStore';


const cardData = [
    {
        priceType: "Starter",
        price: "299",
        cardFeatures: ["Easy to read CSRD-Compliant Scorecard", "Downloadable Scorecard for Internal and External Communication"],
        popular:false,
        cardIcon: <Image src={basicPriceLogo} width={30} height={30} alt='none'/>
    },
    {
        priceType: "Standard",
        price: "499",
        cardFeatures: ["All starter package features +", "ESG Progress Report & Action Plan", "Sustainability Badge (If Applicable)","Daily ESG News & Regulation Updates"],
        popular:true,
        cardIcon: <Image src={standardPriceLogo} width={30} height={30} alt='none'/>
    }
];

const Pricing = () => {
    const router = useRouter();
    const { dashboardStatus, setDashboardStatus, updateSubscriptionPlan } =
    useDashboardStatusStore();

    // const dashboardStatus = dashboardrStatusStore((state) => state.dashboardStatus);
    // const setDashboardStatus = dashboardrStatusStore((state) => state.setDashboardStatus);
    // const PaytoProceed = (price:any,dashboardStats:any)=>{
    //     if(dashboardStats==="Starter"){
    //         setDashboardStatus("Basic");
    //     }
    //     else{
    //       setDashboardStatus(dashboardStats);
    //     }
    //     console.log(price);
    //     router.push("/pages/dashboard");
    // }

    const PaytoProceed = async (price: any, planType: any) => {
        const selectedPlan = planType === "Starter" ? "Basic" : planType;
        
        try {
          // Call backend API to update subscription plan
          await updateSubscriptionPlan(selectedPlan);
    
          // Update UI state
          setDashboardStatus(selectedPlan);
    
          // Navigate to dashboard
          router.push("/pages/dashboard");
        } catch (error) {
          console.error("Subscription update failed:", error);
        }
      };
    const navigateTo = (pathname:any)=>{
        router.push(`/pages/${pathname}`);
    }
  return (
    <div className={styles.pricing}>
       <div className={styles.navbar}>
        <Image src={footer} width={200} height={45} alt="none" className={styles.sidebarIcon} />
        <div className={styles.notifycont}>
            <div className={styles.notify}><Image src={notifyIcon} width={16} height={16} alt="none" className={styles.notifyIcon}/><span>2</span></div>
            <div className={styles.logout} onClick={()=>{navigateTo('signin')}}><Image src={logoutIcon} width={16} height={16} alt="none" className={styles.logoutIcon}/><span>LOG OUT</span></div>
        </div>
        </div>
        <div className={styles.Title}>We Make Your ESG Strategy Powerful and Results-Driven!</div>
        <div className={styles.desc}>Choose a plan that suits your business needs</div>
        <div className={styles.PricePageCont}>
            {
                cardData.map((items:any,index:any)=>{
                    return(
                            dashboardStatus==="Basic" && items.priceType==="Starter"?<></>: <div className={styles.cardBox} key={index}>
                            <div className={styles.uppercont}>
                            <div className={styles.tagcontainer}>
                                {items.priceType==="Standard" && <div className={styles.tag}>POPULAR</div>}
                            </div>
                            <div className={styles.ImageContainer} style={{backgroundColor:items.priceType==="Standard"?"#FFFAE5":"#F6ECDE"}}>
                                {items.cardIcon}
                            </div>
                            <div className={styles.cardTitle}>{items.priceType}</div>
                            <div className={styles.cardPrice}><span>{items.price}</span><span className={styles.euroIconsymbol}>€</span><span className={styles.yeartxt}>/yr</span></div>
                            <div className={styles.dividerline}></div>
                            {
                                items.cardFeatures.map((featureitems:any,indexes:any)=>{
                                    return(
                                        <div key={indexes} className={styles.cardfeatures} style={{background:(items.priceType==="Standard" && indexes===0)?"#F1F8FF":"",color:(items.priceType==="Standard" && indexes===0)?"#1D2029":"",fontWeight:(items.priceType==="Standard" && indexes===0)?"600":"500"}}><Image src={desccheck} width={18} height={18} alt='none' className={styles.cardfeatureIcon}/>{featureitems}</div>
                                    )
                                })
                            }
                            </div>
                            <div className={styles.lowercont}>
                                <button onClick={()=>{PaytoProceed(items.price,items.priceType)}}>Choose this plan</button>
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Pricing