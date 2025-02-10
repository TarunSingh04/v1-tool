"use client"
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { GrScorecard } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";
import { SlBadge } from "react-icons/sl";
import { PiCertificateThin } from "react-icons/pi";
import { LuShoppingCart } from "react-icons/lu";
import { LuBookMarked } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";  // Import usePathname
import DashboardIcon from "../../../assets/dashboardIcon.svg";
import MytaskIcon from "../../../assets/MytaskIcon.svg";
import ScoreCardIcon from "../../../assets/ScorecardIcon.svg";
import ResportsIcon from "../../../assets/ReportIcon.svg"
import CertificatesIcon from "../../../assets/certificateIcon.svg";
import UtilityIcon from "../../../assets/UtilityIcon.svg";
import NewsIcon from "../../../assets/NewsIcon.svg";
import MarketplaceIcon from "../../../assets/marketplaceIcon.svg";
import learningIcon from "../../../assets/elearningIcon.svg";
import AIIcon from  "../../../assets/AIIcon.svg";
import SettingsIcon from "../../../assets/settingsIcon.svg";
import BadgeIcon from "../../../assets/BadgeIcon.svg";
import Image from "next/image";
import footer from "../../../assets/sidebarFooter.svg"
import EditIcon from "../../../assets/EditIcon.svg";
import profileImage from "../../../assets/profileImg2.png";
import dashboardrStatusStore from "@/app/components/store/dashboarsStatusStore";

const SidebarTabs = [
  {
    tabName: "Dashboard",
    tagNavigate: "/pages/dashboard",
    tabIcon: <Image src={DashboardIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:true
  },
  {
    tabName: "My Tasks",
    tagNavigate: "/pages/mytasks",
    tabIcon: <Image src={MytaskIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:false
  },
  {
    tabName: "Scorecard",
    tagNavigate: "/pages/scorecard",
    tabIcon: <Image src={ScoreCardIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:false
  },
  {
    tabName: "ESG Progress Report",
    tagNavigate: "/pages/reports",
    tabIcon: <Image src={ResportsIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:false
  },
  {
    tabName: "Sustainability Badge",
    tagNavigate: "/pages/sustainability-badge",
    tabIcon: <Image src={BadgeIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:false
  },
  {
    tabName: "Certificates",
    tagNavigate: "/pages/certificates",
    tabIcon: <Image src={CertificatesIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:false
  },
  {
    tabName: "Utlities",
    tagNavigate: "/pages/utilities",
    tabIcon: <Image src={UtilityIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:false
  },
  {
    tabName: "ESG News",
    tagNavigate: "/pages/esgnews",
    tabIcon: <Image src={NewsIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:true
  },
  {
    tabName: "Marketplace",
    tagNavigate: "/pages/marketplace",
    tabIcon: <Image src={MarketplaceIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:false
  },
  {
    tabName: "E-learning modules",
    tagNavigate: "/pages/learning",
    tabIcon: <Image src={learningIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:false
  },
  {
    tabName: "AI Assitant",
    tagNavigate: "/pages/ai-assistant",
    tabIcon: <Image src={AIIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:true
  },
  {
    tabName: "Settings",
    tagNavigate: "/pages/settings",
    tabIcon: <Image src={SettingsIcon} width={18} height={18} alt="none" className={styles.sidebarIcon} />,
    dividerLine:false
  },
];

interface SidebarProps {
  defaultRoute: string; // Accept the route as a prop
}

const Sidebar: React.FC<SidebarProps> = ({ defaultRoute }) => {  
  const dashboardStatus = dashboardrStatusStore((state) => state.dashboardStatus);
  const navigate = useRouter();
  const [companyName, setcompanyName] = useState("");
  const [registrationNumber, setregistrationNumber] = useState("");
  const navigateTo = (tabpath: string) => {
    navigate.push(tabpath);
  };
  const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
  
        const data = await response.json();
    
        if (response.ok && data) {
          console.log(data)
          setcompanyName(data?.onboarding?.companyName);
          setregistrationNumber(data?.onboarding?.companyRegistrationNumber)
        } else {
          console.error(
            "Failed to fetch user data:",
            data?.error ?? "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    // Fetch data when component loads
    useEffect(() => {
      fetchUserData();
    }, []);

  const filteredTabs = SidebarTabs.filter((tab) => {
    if (dashboardStatus === "Free") {
      return !["Scorecard", "ESG Progress Report", "Sustainability Badge", "ESG News"].includes(tab.tabName);
    }
    if (dashboardStatus === "Basic") {
      return !["ESG Progress Report", "Sustainability Badge", "ESG News"].includes(tab.tabName);
    }
    return true; // Show all for other statuses
  });

  return (
    <div className={styles.Sidebar}>
      <div className={styles.upperSection}>
        <div className={styles.header}>
          <div className={styles.profileCont}>
          <div className={styles.profilesubcont}>
          <Image src={profileImage} width={45} height={45} alt="none" className={styles.profileImage} />
          <div className={styles.profileInfo}>
            <p>{companyName}</p>
            <span>{registrationNumber}</span>
          </div>
          </div>
          <Image src={EditIcon} width={18} height={18} alt="none" className={styles.headIcon} onClick={()=>{navigate.push(`/pages/settings?pageStatus=${3}`)}}/>
          </div>
        </div>

        <div className={styles.Menu}>
          {filteredTabs.map((tabs, index) => {
            return (
              <>
              <div
                className={defaultRoute === tabs.tagNavigate ? styles.tabActivate : styles.tabs}
                key={index}
                onClick={() => {
                  navigateTo(tabs.tagNavigate || defaultRoute);
                }}
              >
                {tabs.tabIcon}
                <p className={styles.tabName}>{tabs.tabName}</p>
              </div>
              {tabs.dividerLine && <div className={styles.dividerLineClass}></div>}
              </>
            );
          })}
        </div>
      </div>
      <div className={styles.SidebarFooter}>
         <Image src={footer} width={180} height={60} alt="none" style={{marginLeft:"20px"}}/>
      </div>
    </div>
  );
};

export default Sidebar;
