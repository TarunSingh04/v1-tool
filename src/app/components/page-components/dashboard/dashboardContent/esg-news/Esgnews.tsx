// "use client";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import styles from "./style.module.scss";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import sectionHeaderIcon from "../../../../assets/sectionNameIcon.svg";
// import searchIcon from "../../../../assets/searchIcon.svg";
// import sortfilter from "../../../../assets/sortfilter.svg";
// import FiltersPopup from "./filter/Filter";
// import popupCheck from "../../../../assets/popupcheck.svg";
// import linksTab from "../../../../assets/linksbtn.svg";

// const News_data = [
//   {
//     Headline:
//       "Apple, Google, Meta and Microsoft&#8217;s Data Centre Emissions May Be 7.62 Times Higher Than Reported",
//     Summary:
//       "Emissions from company-owned data centres of big technology giants Google, Microsoft, Meta and Apple are likely around 7.62 times higher than officially reported, according to a recent analysis by the Guardian. These companies\u2019 emissions still dwarf those of Amazon, the largest emitter of the big five tech conglomerates. Amazon\u2019s emissions were more than double that [\u2026]\n",
//     URL: "https://impakter.com/apple-google-meta-and-microsofts-data-centre-emissions-may-be-7-62-times-higher-than-reported/",
//     Image_URL:
//       "https://impakter.com/wp-content/uploads/2024/09/google-servers-dedicated-7448-e1726829708815.jpg",
//     Date: "2024-09-20",
//     Categories: [
//       "AI &amp; MACHINE LEARNING",
//       "Business",
//       "Corporations",
//       "ESG News",
//       "Tech",
//     ],
//     Tags: [
//       "AI",
//       "Apple",
//       "artificial intelligence",
//       "big tech",
//       "Carbon Emissions",
//       "Data centres",
//       "Google",
//       "Meta",
//       "Microsoft",
//       "The Guardian",
//     ],
//   },
//   {
//     Headline:
//       "CEOs Shift Focus From Sustainability to AI and Inflation, Survey Finds",
//     Summary:
//       "The survey, conducted globally, found that corporate concern on sustainability has made way for more time-sensitive concerns, such as AI adoption and inflation. As a result, while 81% of CEOs acknowledge the long-term significance of keeping up with sustainability efforts, only 47% are actively prioritizing it.\u00a0 This trend is largely driven by rising costs and [\u2026]\n",
//     URL: "https://impakter.com/ceos-shift-focus-from-sustainability-to-ai-and-inflation-survey-finds/",
//     Image_URL:
//       "https://impakter.com/wp-content/uploads/2024/09/image-from-rawpixel-id-3284178-jpeg-e1726666469392.jpg",
//     Date: "2024-09-18",
//     Categories: ["Business", "ESG FINANCE", "ESG News"],
//     Tags: [
//       "AI",
//       "artificial intelligence",
//       "Bain &amp; Company",
//       "CEOs",
//       "Corporate Sustainability",
//       "ESG",
//       "inflation",
//       "Sustainability",
//     ],
//   },
//   {
//     Headline:
//       "Shein Is Officially the Biggest Polluter in Fast Fashion. AI Is Making Things Worse",
//     Summary:
//       "In 2023, the fast fashion giant Shein was everywhere. Crisscrossing the globe, airplanes ferried small packages of its ultra-cheap clothing from\u00a0thousands of suppliers\u00a0to tens of millions of customer mailboxes in 150 countries. Influencers\u2019 \u201c#sheinhaul\u201d videos advertised the company\u2019s trendy styles on social media, garnering\u00a0billions of views. At every step, data was created, collected, and analyzed. [\u2026]\n",
//     URL: "https://impakter.com/shein-is-officially-the-biggest-polluter-in-fast-fashion-ai-is-making-things-worse/",
//     Image_URL: "https://impakter.com/wp-content/uploads/2024/09/Untitled.jpg",
//     Date: "2024-09-13",
//     Categories: ["Business", "ESG News"],
//     Tags: [
//       "AI",
//       "artificial intelligence",
//       "CCN",
//       "Covering Climate Now",
//       "fashion",
//       "fast fashion",
//       "Grist",
//       "Pollution",
//       "shein",
//     ],
//   },
//   {
//     Headline: "Apple and Google Lose EU Court Battles, Forced to Pay Billions",
//     Summary:
//       "This week at the European Court of Justice (ECJ) in Brussels, Apple lost a major, \u20ac13 billion Irish tax case. The ruling came as the European Commission has increased efforts to suppress \u201csweetheart\u201d tax deals for multinational corporations. This comes after a legal battle that started in 2016 in which the iPhone maker claimed the [\u2026]\n",
//     URL: "https://impakter.com/apple-and-google-lose-eu-court-battles-forced-to-pay-billions/",
//     Image_URL:
//       "https://impakter.com/wp-content/uploads/2024/09/grande-salle-e1726062169364.jpg",
//     Date: "2024-09-11",
//     Categories: ["Business", "Corporations", "ESG News", "Society"],
//     Tags: [
//       "Amazon",
//       "Apple",
//       "ECJ",
//       "EU",
//       "European Commission",
//       "European Court of Justice",
//       "European General Court",
//       "Google",
//       "Ireland",
//       "multinational corporations",
//     ],
//   },
//   {
//     Headline: "How Fast Fashion Is Damaging the Environment",
//     Summary:
//       "From textile transportation to coal-powered sweatshops to wasted clothes, the impact of fast fashion on the environment cannot be ignored. In 2023, the United Nations Environment Program (UNEP) stated that the fashion industry is contributing to 10% of global carbon emissions annually \u2014 more than international flights and maritime shipping combined. The industry\u2019s greenhouse gas [\u2026]\n",
//     URL: "https://impakter.com/how-fast-fashion-is-damaging-the-environment/",
//     Image_URL:
//       "https://impakter.com/wp-content/uploads/2024/09/GP04CXR_Low-res-with-credit-line-800px-e1725460218612.jpg",
//     Date: "2024-09-04",
//     Categories: ["Business", "Environment", "Fashion"],
//     Tags: [
//       "carbon footprint",
//       "fashion industry",
//       "fast fashion",
//       "Fast fashion and the environment",
//       "Textile waste",
//       "Waste",
//     ],
//   },
//   {
//     Headline:
//       "A New Era in Environmental Accountability: SpaceX Launches Methane-Tracking Satellite",
//     Summary:
//       "SpaceX, the private aerospace company founded by Elon Musk, has launched into space nonprofit Carbon Mapper\u2019s groundbreaking satellite aimed at monitoring methane emissions on a global scale. Launched from the Vandenberg Space Force in California on Aug. 16, the Tanager 1 satellite will track methane emissions with unparalleled accuracy \u2014\u00a0\u201cdown to the level of individual [\u2026]\n",
//     URL: "https://impakter.com/spacex-launches-methane-tracking-satellite-tanager-1-a-new-era-in-environmental-accountability/",
//     Image_URL:
//       "https://impakter.com/wp-content/uploads/2024/08/1-PIA26411_Tanager-Rendering.jpg",
//     Date: "2024-08-23",
//     Categories: [
//       "Business",
//       "Climate Change",
//       "ESG News",
//       "Pollution",
//       "Science",
//       "Tech",
//     ],
//     Tags: [
//       "IEA",
//       "Methane",
//       "Methane Tracking",
//       "Methane-Tracking Satellite",
//       "NASA",
//       "SpaceX",
//       "Tanager 1",
//     ],
//   },
// ];

// const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URI}`;

// const Esgnews = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [oldNews, setoldNews] = useState(News_data.slice(5));
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [dateOrder, setDateOrder] = useState<string>("latest"); // 'latest' or 'oldest'
//   const [sortFilterSelected, setsortFilterSelected] = useState(1);
//   const [popsortFilter, setpopsortFilter] = useState(false);
//   const [order, setOrder] = useState("desc");
//   const [sortBy, setSortBy] = useState("date");
//   const [limit, setLimit] = useState(30);
//   const router = useRouter();
//   const isFirstRender = useRef(true);

//   const navigateTo = () => {
//     router.push("/pages/esgnews");
//   };

//   // Fetch news data from backend API
//   const fetchNews = useCallback(async () => {
//     const params = new URLSearchParams({
//       sort_by: sortBy,
//       order: order,
//       limit: limit.toString(),
//     }).toString();

//     try {
//       const response = await fetch(`${BASE_URL}/get_news?${params}`);
//       if (!response.ok) throw new Error("Failed to fetch news");

//       const data = await response.json();
//       console.log(data.data.data);
//       setNewsData(data.data.data);
//     } catch (error) {
//       console.error("Error fetching news:", error);
//     }
//   }, [sortBy, order, limit]);

//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }
//     fetchNews();
//   }, [fetchNews]);

//   const selectSortFilter = (filterNum: number) => {
//     setsortFilterSelected(filterNum);
//   };
//   const truncateSummary = (summary: any) => {
//     return summary.length > 136 ? summary.slice(0, 136) + "..." : summary;
//   };

//   const truncateSummaryHeadline = (summary: any) => {
//     return summary.length > 50 ? summary.slice(0, 50) + "..." : summary;
//   };

//   const truncatearticleSummaryHeadline = (summary: any) => {
//     return summary.length > 70 ? summary.slice(0, 70) + "..." : summary;
//   };

//   const formatDate = (dateString: any) => {
//     const date = new Date(dateString);
//     const options: any = { day: "numeric", month: "long", year: "numeric" };
//     return date.toLocaleDateString("en-US", options);
//   };

//   return (
//     <div className={styles.EsgNewsContainer}>
//       <div className={styles.subHeader}>
//         <div className={styles.seactionName}>ESG News</div>
//         {/* <div className={styles.sectionFilters}>
//             <div className={styles.sortFilter}>
//                 <div className={styles.sortFilter2} onClick={()=>{setpopsortFilter(!popsortFilter)}}><Image src={sortfilter} width={16} height={16} alt='none' className={styles.filterIcon}/>SORT BY</div>
//                 {
//                     popsortFilter && <div className={styles.popUp}>
//                     <div className={sortFilterSelected===1?styles.popUpoptionshadow :styles.popUpoption}  onClick={()=>{selectSortFilter(1)}} ><p>Newest First</p>  <Image src={popupCheck} width={17} height={17} alt="news image" className={sortFilterSelected!==1?styles.hidden:styles.show} /></div>
//                     <div className={sortFilterSelected===2?styles.popUpoptionshadow :styles.popUpoption}  onClick={()=>{selectSortFilter(2)}} ><p>Oldest First</p>  <Image src={popupCheck} width={17} height={17} alt="news image" className={sortFilterSelected!==2?styles.hidden:styles.show} /></div>
//                     <div className={sortFilterSelected===3?styles.popUpoptionshadow :styles.popUpoption}  onClick={()=>{selectSortFilter(3)}} ><p>Alphabetically A-Z</p>  <Image src={popupCheck} width={17} height={17} alt="news image" className={sortFilterSelected!==3?styles.hidden:styles.show} /></div>
//                     <div className={sortFilterSelected===4?styles.popUpoptionshadow :styles.popUpoption}  onClick={()=>{selectSortFilter(4)}} ><p>Alphabetically Z-A</p>  <Image src={popupCheck} width={17} height={17} alt="news image" className={sortFilterSelected!==4?styles.hidden:styles.show} /></div>
//                 </div>
//                 }
//                 </div>
//             <FiltersPopup data={oldNews} onFilteredDataChange={setoldNews}/>
//             <div className={styles.searchbar}>
//             <Image src={searchIcon} width={26} height={26} alt="none" className={styles.searchIcon}/>
//             <input type="text" placeholder="Search News" />
//             </div>
//         </div> */}
//       </div>

//       <div className={styles.Esgnews}>
//         <div className={styles.NewsData1}>
//           {newsData.map((items: any, index) => {
//             return (
//               index < 2 && (
//                 <div key={index} className={styles.ArticleCont}>
//                   <div>
//                     <Image
//                       src={items.image_url}
//                       width={240}
//                       height={240}
//                       alt="none"
//                       className={styles.articleImg}
//                     />
//                     <p className={styles.Tagtextart}>
//                       <span>
//                         {items.tags
//                           .split(", ")
//                           .slice(0, 2)
//                           .map((tag: any, i: any) => (
//                             <span key={i}>{tag}</span>
//                           ))}
//                       </span>
//                     </p>
//                   </div>

//                   <div className={styles.articleInfo}>
//                     <div className={styles.articleheaderInfo}>
//                       <div className={styles.newscontentheader}>
//                         <p className={styles.date}>{formatDate(items.date)}</p>
//                       </div>
//                       <a
//                         href={items.URL}
//                         target="_blank"
//                         className={styles.links}
//                       >
//                         <p className={styles.Headline}>
//                           {truncatearticleSummaryHeadline(items.headline)}
//                         </p>
//                       </a>
//                       <p className={styles.Summary}>
//                         {truncateSummary(items.summary)}
//                       </p>
//                       <div className={styles.author}>
//                         By : <span>{items.author}</span>
//                       </div>
//                     </div>
//                     <div className={styles.newcontentfooter}>
//                       <a
//                         href={items.post_url}
//                         target="_blank"
//                         className={styles.linkTab}
//                       >
//                         <Image
//                           src={linksTab}
//                           width={20}
//                           height={20}
//                           alt="none"
//                         />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               )
//             );
//           })}
//         </div>

//         <div className={styles.NewsData}>
//           {newsData.map((items: any, index) => {
//             return (
//               index > 1 && (
//                 <div key={index} className={styles.newsCont}>
//                   <div className={styles.newsFirstCont}>
//                     <Image
//                       src={items.image_url}
//                       width={240}
//                       height={160}
//                       alt="none"
//                       className={styles.newsImg}
//                     />
//                     <div className={styles.newscontentheader}>
//                       <p className={styles.Tagtext}>
//                       {items.tags
//                           .split(", ")
//                           .slice(0, 2)
//                           .map((tag: any, i: any) => (
//                             <span key={i}>{tag}</span>
//                           ))}
//                       </p>
//                       <p className={styles.date}>{formatDate(items.date)}</p>
//                     </div>
//                     <a
//                       href={items.URL}
//                       target="_blank"
//                       className={styles.links}
//                     >
//                       <p className={styles.Headline}>
//                         {truncateSummaryHeadline(items.headline)}
//                       </p>
//                     </a>
//                     <p className={styles.Summary}>
//                       {truncateSummary(items.summary)}
//                     </p>
//                   </div>
//                   <div className={styles.newcontentfooter}>
//                     <div className={styles.author}>
//                       By : <span>{items.author}</span>
//                     </div>
//                     <a
//                       href={items.post_url}
//                       target="_blank"
//                       className={styles.linkTab}
//                     >
//                       <Image src={linksTab} width={20} height={20} alt="none" />
//                     </a>
//                   </div>
//                 </div>
//               )
//             );
//           })}
//         </div>
//         <div className={styles.newsbtncont}>
//           <div
//             className={styles.newsbtn}
//             onClick={() => {
//               navigateTo();
//             }}
//           >
//             View more
//             <Image
//               src={linksTab}
//               width={16}
//               height={16}
//               alt="none"
//               className={styles.newsTab}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Esgnews;
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import sectionHeaderIcon from "../../../../assets/sectionNameIcon.svg";
import searchIcon from "../../../../assets/searchIcon.svg";
import sortfilter from "../../../../assets/sortfilter.svg";
import popupCheck from "../../../../assets/popupcheck.svg";
import linksTab from "../../../../assets/linksbtn.svg";

const News_data = [
  // News data for fallback
];

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URI}`;

const Esgnews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateOrder, setDateOrder] = useState<string>("latest");
  const router = useRouter();
  const isFirstRender = useRef(true);

  const navigateTo = () => {
    router.push("/pages/esgnews");
  };

  const fetchNews = useCallback(async () => {
    const params = new URLSearchParams({
      sort_by: "date",
      order: "desc",
      limit: "30",
    }).toString();

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/get_news?${params}`);
      if (!response.ok) throw new Error("Failed to fetch news");

      const data = await response.json();
      setNewsData(data.data.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchNews();
    }
  }, [fetchNews]);

  const truncateSummary = (summary: any) => {
    return summary.length > 136 ? summary.slice(0, 136) + "..." : summary;
  };

  const truncateSummaryHeadline = (summary: any) => {
    return summary.length > 50 ? summary.slice(0, 50) + "..." : summary;
  };

  const truncatearticleSummaryHeadline = (summary: any) => {
    return summary.length > 70 ? summary.slice(0, 70) + "..." : summary;
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className={styles.EsgNewsContainer}>
      <div className={styles.subHeader}>
        <div className={styles.seactionName}>ESG News</div>
      </div>

      {loading && <div className={styles.loader}></div>}

      {!loading && (
        <div className={styles.Esgnews}>
          <div className={styles.NewsData1}>
            {newsData.map((items: any, index) => {
              return (
                index < 2 && (
                  <div key={index} className={styles.ArticleCont}>
                    <div>
                      <Image
                        src={items.image_url}
                        width={240}
                        height={240}
                        alt="none"
                        className={styles.articleImg}
                      />
                      <p className={styles.Tagtextart}>
                        <>
                          {items.tags
                            .split(", ")
                            .slice(0, 2)
                            .map((tag: any, i: any) => (
                              <span key={i}>{tag}</span>
                            ))}
                        </>
                      </p>
                    </div>

                    <div className={styles.articleInfo}>
                      <div className={styles.articleheaderInfo}>
                        <div className={styles.newscontentheader}>
                          <p className={styles.date}>{formatDate(items.date)}</p>
                        </div>
                        <a
                          href={items.URL}
                          target="_blank"
                          className={styles.links}
                        >
                          <p className={styles.Headline}>
                            {truncatearticleSummaryHeadline(items.headline)}
                          </p>
                        </a>
                        <p className={styles.Summary}>
                          {truncateSummary(items.summary)}
                        </p>
                        <div className={styles.author}>
                          By : <span>{items.author}</span>
                        </div>
                      </div>
                      <div className={styles.newcontentfooter}>
                        <a
                          href={items.post_url}
                          target="_blank"
                          className={styles.linkTab}
                        >
                          <Image
                            src={linksTab}
                            width={20}
                            height={20}
                            alt="none"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>

          <div className={styles.NewsData}>
            {newsData.map((items: any, index) => {
              return (
                index > 1  && index< 10 && (
                  <div key={index} className={styles.newsCont}>
                    <div className={styles.newsFirstCont}>
                      <Image
                        src={items.image_url}
                        width={240}
                        height={160}
                        alt="none"
                        className={styles.newsImg}
                      />
                      <div className={styles.newscontentheader}>
                        <p className={styles.Tagtext}>
                          {items.tags
                            .split(", ")
                            .slice(0, 2)
                            .map((tag: any, i: any) => (
                              <span key={i}>{tag}</span>
                            ))}
                        </p>
                        <p className={styles.date}>{formatDate(items.date)}</p>
                      </div>
                      <a
                        href={items.URL}
                        target="_blank"
                        className={styles.links}
                      >
                        <p className={styles.Headline}>
                          {truncateSummaryHeadline(items.headline)}
                        </p>
                      </a>
                      <p className={styles.Summary}>
                        {truncateSummary(items.summary)}
                      </p>
                    </div>
                    <div className={styles.newcontentfooter}>
                      <div className={styles.author}>
                        By : <span>{items.author}</span>
                      </div>
                      <a
                        href={items.post_url}
                        target="_blank"
                        className={styles.linkTab}
                      >
                        <Image
                          src={linksTab}
                          width={20}
                          height={20}
                          alt="none"
                        />
                      </a>
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className={styles.newsbtncont}>
            <div
              className={styles.newsbtn}
              onClick={() => {
                navigateTo();
              }}
            >
              View more
              <Image
                src={linksTab}
                width={16}
                height={16}
                alt="none"
                className={styles.newsTab}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Esgnews;
