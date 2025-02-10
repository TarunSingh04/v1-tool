"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Sidebar from "./sidebar/Sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logoutIcon from "../../assets/log-out.svg";
import notifyIcon from "../../assets/notifyIcon'.svg";
import searchIcon from "../../assets/searchIcon.svg";
import pageNotDisplayLogo from "../../assets/pageNotDisplayLogo.svg";
import searchExclaimation from "../../assets/searchHeadtile.svg";
import searchShowIcon from "../../assets/searchItemArrowIcon.svg";
import notificationWhiteIcon from "../../assets/notificationWhite.svg";
import DashboardIcon from "../../assets/dashboardIcon.svg";
import MytaskIcon from "../../assets/MytaskIcon.svg";
import ScoreCardIcon from "../../assets/ScorecardIcon.svg";
import ResportsIcon from "../../assets/ReportIcon.svg";
import CertificatesIcon from "../../assets/certificateIcon.svg";
import UtilityIcon from "../../assets/UtilityIcon.svg";
import NewsIcon from "../../assets/NewsIcon.svg";
import MarketplaceIcon from "../../assets/marketplaceIcon.svg";
import learningIcon from "../../assets/elearningIcon.svg";
import AIIcon from "../../assets/AIIcon.svg";
import SettingsIcon from "../../assets/settingsIcon.svg";
import BadgeIcon from "../../assets/BadgeIcon.svg";
import dashboardOverflowStore from "../../../components/store/dashboardOverflowStore";
import faqBlue from "../../../components/assets/faqIconBlue.svg";
import faqWhite from "../../../components/assets/faqIconWhite.svg";
import faqGrey from "../../../components/assets/faqIconGrey.svg";
import linkarrow from "../../../components/assets/Linkarrow.svg";
import { useAuth } from "@/store/AuthContext";
import useNotificationsStore from "../../../components/store/notificationsStore";

const SidebarTabs = [
  {
    tabName: "Dashboard",
    tagNavigate: "/pages/dashboard",
  },
  {
    tabName: "My Tasks",
    tagNavigate: "/pages/mytasks",
  },
  {
    tabName: "Scorecard",
    tagNavigate: "/pages/scorecard",
  },
  {
    tabName: "ESG Progress Report",
    tagNavigate: "/pages/reports",
  },
  {
    tabName: "Sustainability Badge",
    tagNavigate: "/pages/sustainability-badge",
  },
  {
    tabName: "Certificates",
    tagNavigate: "/pages/certificates",
  },
  {
    tabName: "Utilities",
    tagNavigate: "/pages/utilities",
  },
  {
    tabName: "ESG News",
    tagNavigate: "/pages/esgnews",
  },
  {
    tabName: "Marketplace",
    tagNavigate: "/pages/marketplace",
  },
  {
    tabName: "E-learning modules",
    tagNavigate: "/pages/learning",
  },
  {
    tabName: "AI Assistant",
    tagNavigate: "/pages/ai-assistant",
  },
  {
    tabName: "Settings",
    tagNavigate: "/pages/settings",
  },
];
interface Notification {
  id: string;
  notificationTitle: string;
  notificationMessage: string;
  notificationSection: string;
  notificationTime: string;
}

const withDashboardLayout = (WrappedComponent: any, route: string) => {
  const DashboardLayout: React.FC = () => {
    const navigate = useRouter();
    const dashboardOverflow = dashboardOverflowStore(
      (state) => state.dashboardOverflow
    );
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<typeof SidebarTabs>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [notificationsShow, setnotificationsShow] = useState<boolean>(false);
    const [faqShow, setfaqShow] = useState(false);
    // const [notifications, setnotifications] = useState([
    //   {
    //     id: 1,
    //     notificationTitle: "utilities",
    //     notificationMessage: "A new utility has been submitted for review.",
    //     notificationSection: "/pages/utilities",
    //     notificationTime: "4 hours ago",
    //   },
    //   {
    //     id: 2,
    //     notificationTitle: "certificates",
    //     notificationMessage:
    //       "A new certificates has been submitted for review.",
    //     notificationSection: "/pages/utilities",
    //     notificationTime: "6 hours ago",
    //   },
    //   {
    //     id: 3,
    //     notificationTitle: "marketplace",
    //     notificationMessage:
    //       "A new certificates has been submitted for review.",
    //     notificationSection: "/pages/marketplace",
    //     notificationTime: "6 hours ago",
    //   },
    //   {
    //     id: 4,
    //     notificationTitle: "learning",
    //     notificationMessage:
    //       "A new certificates has been submitted for review.",
    //     notificationSection: "/pages/learning",
    //     notificationTime: "6 hours ago",
    //   },
    // ]);

    // const [notifications, setNotifications] = useState<Notification[]>([]);
    const { notifications, fetchNotifications, removeNotification } = useNotificationsStore();
    const { logout, accessToken } = useAuth();
    const [user_Id, setuser_Id] = useState("");


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
            setuser_Id(data?.id)
          } else {
            console.error(
              "Failed to fetch user data:",
              data?.error ?? "Unknown error"
            );
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
        }
      };
    
      // Fetch data when component loads
      useEffect(() => {
        fetchUserData();
      }, []);
    // useEffect(() => {
    //   if (!accessToken) {
    //     navigate.push("/pages/login-user"); // Redirect if not authenticated
    //   }
    // }, [accessToken, navigate]);

    // Fetch notifications from the backend
    // const fetchNotifications = async () => {
    //   try {
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/notifications`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //         },
    //       }
    //     );

    //     if (response.ok) {
    //       const data = await response.json();
    //       const formattedNotifications: Notification[] = data.notifications.map(
    //         (notification: any) => ({
    //           id: notification._id,
    //           notificationTitle: notification.category,
    //           notificationMessage: notification.heading,
    //           notificationSection: notification.section || "/",
    //           notificationTime: notification.delta,
    //         })
    //       );
    //       setNotifications(formattedNotifications);
    //     } else {
    //       console.error("Failed to fetch notifications:", response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching notifications:", error);
    //   }
    // };

    // Mark a notification as seen when discarded
    // const discardNotification = async (id: string) => {
    //   try {
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/notifications/${id}`,
    //       {
    //         method: "DELETE",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //         },
    //       }
    //     );

    //     if (response.ok) {
    //       setNotifications((prevNotifications) =>
    //         prevNotifications.filter((notification) => notification.id !== id)
    //       );
    //     } else {
    //       console.error("Failed to discard notification:", response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Error discarding notification:", error);
    //   }
    // };

    // Calculate relative time for notifications
    // const calculateTimeAgo = (created_at: string) => {
    //   const currentTime = new Date();
    //   const notificationTime = new Date(created_at);
    //   const diffInSeconds = Math.floor((currentTime.getTime() - notificationTime.getTime()) / 1000);

    //   if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    //   const diffInMinutes = Math.floor(diffInSeconds / 60);
    //   if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    //   const diffInHours = Math.floor(diffInMinutes / 60);
    //   if (diffInHours < 24) return `${diffInHours} hours ago`;
    //   const diffInDays = Math.floor(diffInHours / 24);
    //   return `${diffInDays} days ago`;
    // };

    // Calculate relative time for notifications considering user's local timezone
    const calculateTimeAgo = (created_at: string) => {
      const currentTime = new Date();

      // Convert the created_at UTC time to the user's local time
      const notificationTime = new Date(created_at);

      // Get the user's local timezone from the browser
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Adjust for the user's timezone
      const userTime = new Date(
        notificationTime.toLocaleString("en-US", { timeZone: userTimezone })
      );

      const diffInSeconds = Math.floor(
        (currentTime.getTime() - userTime.getTime()) / 1000
      );

      if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours} hours ago`;
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    };

    useEffect(() => {
      if (accessToken) {
        fetchNotifications();
      }
    }, [accessToken]);

    useEffect(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        setShowSuggestions(false);
        return;
      }

      const filteredResults = SidebarTabs.filter((tab) =>
        tab.tabName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredResults);
      setShowSuggestions(true);
    }, [searchQuery]);

    const navigateTo = (pathname: string) => {
      navigate.push(pathname);
    };

    // const discardNotification = (id: number) => {
    //   setnotifications((prevNotifications) =>
    //     prevNotifications.filter((notification) => notification.id !== id)
    //   );
    // };

    return (
      <div
        className={styles.dashboardPageCont}
        style={{ overflow: dashboardOverflow ? "hidden" : "auto" }}
      >
        <div className={styles.pageNotDisplay}>
          <Image src={pageNotDisplayLogo} width={160} height={115} alt="none" />
          <p className={styles.pageNotDisplaytitle}>
            Oops! Best Viewed on Desktop
          </p>
          <p className={styles.pageNotDisplaysubtitle}>
            For the Best Experience, Switch to Desktop!
          </p>
          <p className={styles.pageNotDisplaydesc}>
            You&apos;re on a mobile or tablet. For the full experience and all
            site features, please visit us on your desktop.
          </p>
        </div>
        <div className={styles.dashboardPage}>
          <Sidebar defaultRoute={route} />
          <div className={styles.siderbarSpace}></div>
          <div className={styles.Content}>
            <div className={styles.navbar}>
              <div className={styles.searchbar}>
                <Image
                  src={searchIcon}
                  width={26}
                  height={26}
                  alt="none"
                  className={styles.searchIcon}
                />
                <input
                  type="text"
                  placeholder="Search anything"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {showSuggestions && (
                  <div className={styles.suggestionBox}>
                    <div className={styles.headline}>
                      <Image
                        src={searchExclaimation}
                        width={15}
                        height={15}
                        alt="none"
                        className={styles.exclaimIcon}
                      />
                      <p>Search results {searchResults.length} found</p>
                    </div>
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <div
                          key={index}
                          className={styles.suggestionItem}
                          onClick={() => navigateTo(result.tagNavigate)}
                        >
                          <p className={styles.tabName}>
                            {result.tabName}
                            <Image
                              src={searchShowIcon}
                              width={10}
                              height={10}
                              alt="none"
                            />
                          </p>
                          <p className={styles.description}>
                            Search details in the grey sub line
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noResults}>
                        No relevant pages found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.notifycont}>
                <div
                  className={styles.faqCont}
                  style={{
                    color: !faqShow ? "#1492EF" : "#FFFFFF",
                    background: faqShow ? "#1492EF" : "#F1F8FF",
                  }}
                  onClick={() => {
                    setfaqShow(!faqShow);
                  }}
                >
                  {!faqShow && (
                    <Image src={faqBlue} width={20} height={20} alt="none" />
                  )}
                  {faqShow && (
                    <Image src={faqWhite} width={20} height={20} alt="none" />
                  )}
                </div>
                <div
                  className={styles.notify}
                  style={{
                    color: !notificationsShow ? "#1492EF" : "#FFFFFF",
                    background: notificationsShow ? "#1492EF" : "#F1F8FF",
                  }}
                  onClick={() => {
                    setnotificationsShow(!notificationsShow);
                  }}
                >
                  {!notificationsShow && (
                    <Image
                      src={notifyIcon}
                      width={16}
                      height={16}
                      alt="none"
                      className={styles.notifyIcon}
                    />
                  )}
                  {notificationsShow && (
                    <Image
                      src={notificationWhiteIcon}
                      width={16}
                      height={16}
                      alt="none"
                      className={styles.notifyIcon}
                    />
                  )}
                  <span
                    style={{
                      color: !notificationsShow ? "#1492EF" : "#FFFFFF",
                    }}
                  >
                    {notifications.length}
                  </span>
                </div>
                <div
                  className={styles.logout}
                  onClick={() => {
                    logout();
                    navigateTo("/pages/signin");
                  }}
                >
                  <Image
                    src={logoutIcon}
                    width={16}
                    height={16}
                    alt="none"
                    className={styles.logoutIcon}
                  />
                  <span>LOG OUT</span>
                </div>
                {notificationsShow && (
                  <div className={styles.notificationSection}>
                    {notifications.length !== 0 && (
                      <div className={styles.noticationssubcont}>
                        {notifications.map((notificationItems, index) => (
                          <div
                            className={
                              notifications.length !== index + 1
                                ? styles.notifyBox
                                : styles.notifyBox1
                            }
                            key={notificationItems.id}
                          >
                            <div className={styles.notificationImg}>
                              {notificationItems.notificationTitle ===
                                "dashboard" && (
                                <Image
                                  src={DashboardIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "mytask" && (
                                <Image
                                  src={MytaskIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "scorecard" && (
                                <Image
                                  src={ScoreCardIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "report" && (
                                <Image
                                  src={ResportsIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "sustainability badge" && (
                                <Image
                                  src={BadgeIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "certificates" && (
                                <Image
                                  src={CertificatesIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "utilities" && (
                                <Image
                                  src={UtilityIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "news" && (
                                <Image
                                  src={NewsIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "marketplace" && (
                                <Image
                                  src={MarketplaceIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "learning" && (
                                <Image
                                  src={learningIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "aiassistant" && (
                                <Image
                                  src={AIIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                              {notificationItems.notificationTitle ===
                                "settings" && (
                                <Image
                                  src={SettingsIcon}
                                  width={18}
                                  height={18}
                                  alt="none"
                                  className={styles.sidebarIcon}
                                />
                              )}
                            </div>
                            <div className={styles.notificationtextBox}>
                              <div className={styles.notifyMessage}>
                                {notificationItems.notificationMessage}
                              </div>
                              <div className={styles.notifySectionTitle}>
                                {notificationItems.notificationTitle}
                              </div>
                              <div className={styles.notifytime}>
                                {notificationItems.notificationTime} ago
                              </div>
                              <div className={styles.notifybtnCont}>
                                <button
                                  className={styles.discardbtn}
                                  onClick={() =>
                                    removeNotification(notificationItems.id,user_Id)
                                  }
                                >
                                  DISCARD
                                </button>
                                <button
                                  onClick={() => {
                                    navigate.push(
                                      notificationItems.notificationSection
                                    );
                                  }}
                                  className={styles.viewbtn}
                                >
                                  VIEW
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {notifications.length === 0 && (
                      <div className={styles.noNotificationsMessage}>
                        No New Notifications Found.
                      </div>
                    )}
                  </div>
                )}
                {faqShow && (
                  <div className={styles.faqBox}>
                    <p className={styles.faqHelptxt}>
                      <Image
                        src={faqGrey}
                        width={13}
                        height={13}
                        alt="none"
                        style={{ marginRight: "6px" }}
                      />
                      Help Categories
                    </p>
                    <p
                      className={styles.faqRouteLinks}
                      onClick={() => {
                        navigate.push("/pages/terms-and-condition");
                      }}
                    >
                      Terms & conditions
                      <Image
                        src={linkarrow}
                        width={7}
                        height={7}
                        alt="none"
                        style={{ marginLeft: "5px" }}
                      />
                    </p>
                    <p
                      className={styles.faqRouteLinks}
                      onClick={() => {
                        navigate.push("/pages/privacy");
                      }}
                    >
                      Privacy policy
                      <Image
                        src={linkarrow}
                        width={7}
                        height={7}
                        alt="none"
                        style={{ marginLeft: "5px" }}
                      />
                    </p>
                  </div>
                )}
              </div>
            </div>
            <WrappedComponent />
          </div>
        </div>
      </div>
    );
  };

  return DashboardLayout;
};

export default withDashboardLayout;
