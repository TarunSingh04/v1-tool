// import React, { useCallback, useEffect, useRef, useState } from "react";
// import styles from "./styles.module.scss";
// import Image from "next/image";
// import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";
// import searchIcon from "../../assets/searchIcon.svg";
// import filter from "../../assets/Filter.svg";
// import sortfilter from "../../assets/sortfilter.svg";
// import FiltersPopup from "./filter/Filter";
// import popupCheck from "../../assets/popupcheck.svg";
// import linksTab from "../../assets/linksbtn.svg";
// import { News_data } from "./news_data";

// const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URI}`;

// const Esgnews = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [filteredNews, setFilteredNews] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortFilterSelected, setSortFilterSelected] = useState(1);
//   const [popsortFilter, setPopSortFilter] = useState(false);
//   const [order, setOrder] = useState("desc");
//   const [sortBy, setSortBy] = useState("date");
//   const [limit, setLimit] = useState(30);

//   const isFirstRender = useRef(true);

//   const handleSearch = (e: any) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     if (term === "") {
//       setFilteredNews(newsData);
//     } else {
//       const filtered = newsData.filter((item: any) =>
//         item.headline.toLowerCase().includes(term)
//       );
//       setFilteredNews(filtered);
//     }
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
//       console.log(data.data.data)
//       setNewsData(data.data.data);
//       setFilteredNews(data.data.data);
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

//   const formatDate = (dateString: any) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   // const handleSearch = (e: any) => {
//   //   setSearchTerm(e.target.value);
//   // };

//   const handleSortFilter = (filterNum: any) => {
//     setSortFilterSelected(filterNum);
//     switch (filterNum) {
//       case 1:
//         setSortBy("date");
//         setOrder("desc");
//         break;
//       case 2:
//         setSortBy("date");
//         setOrder("asc");
//         break;
//       case 3:
//         setSortBy("headline");
//         setOrder("asc");
//         break;
//       case 4:
//         setSortBy("headline");
//         setOrder("desc");
//         break;
//       default:
//         setSortBy("date");
//         setOrder("desc");
//     }
//   };

//   //   const selectSortFilter = (filterNum: number) => {
//   //     setsortFilterSelected(filterNum);
//   //   };
//   const truncateSummary = (summary: any) => {
//     return summary.length > 136 ? summary.slice(0, 136) + "..." : summary;
//   };

//   const truncateSummaryHeadline = (summary: any) => {
//     return summary.length > 50 ? summary.slice(0, 50) + "..." : summary;
//   };

//   const truncatearticleSummaryHeadline = (summary: any) => {
//     return summary.length > 70 ? summary.slice(0, 70) + "..." : summary;
//   };

//   //   const formatDate = (dateString: any) => {
//   //     const date = new Date(dateString);
//   //     const options: any = { day: "numeric", month: "long", year: "numeric" };
//   //     return date.toLocaleDateString("en-US", options);
//   //   };

//   return (
//     <div className={styles.EsgNewsContainer}>
//       <div className={styles.sectionHeader}>
//         <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
//         <p>
//           <span>/</span>ESG News
//         </p>
//       </div>

//       <div className={styles.subHeader}>
//         <div className={styles.seactionName}>ESG News</div>
//         <div className={styles.sectionFilters}>
//           <div className={styles.sortFilter}>
//             <div
//               className={styles.sortFilter2}
//               onClick={() => {
//                 setPopSortFilter(!popsortFilter);
//               }}
//             >
//               <Image
//                 src={sortfilter}
//                 width={16}
//                 height={16}
//                 alt="none"
//                 className={styles.filterIcon}
//               />
//               SORT BY
//             </div>
//             {popsortFilter && (
//               <div className={styles.popUp}>
//                 {["Newest First", "Oldest First", "A-Z", "Z-A"].map(
//                   (label, index) => (
//                     <div
//                       key={index}
//                       className={
//                         sortFilterSelected === index + 1
//                           ? styles.popUpoptionshadow
//                           : styles.popUpoption
//                       }
//                       onClick={() => handleSortFilter(index + 1)}
//                     >
//                       <p>{label}</p>
//                       <Image
//                         src={popupCheck}
//                         width={17}
//                         height={17}
//                         alt="news image"
//                         className={
//                           sortFilterSelected !== index + 1
//                             ? styles.hidden
//                             : styles.show
//                         }
//                       />
//                     </div>
//                   )
//                 )}
//               </div>
//             )}
//           </div>
//           {/* <FiltersPopup data={newsData} onFilteredDataChange={setFilteredNews} /> */}
//           <div className={styles.searchbar}>
//             <Image
//               src={searchIcon}
//               width={26}
//               height={26}
//               alt="none"
//               className={styles.searchIcon}
//             />
//             <input
//               type="text"
//               placeholder="Search News"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </div>
//         </div>
//       </div>

//       <div className={styles.Esgnews}>
//         <div className={styles.NewsData1}>
//           {filteredNews.map((items: any, index) => {
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
//                       {items.tags
//                         .split(", ")
//                         .slice(0, 2)
//                         .map((tag: any, i: any) => (
//                           <span key={i}>{tag}</span>
//                         ))}
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
//                       By : <span>{items.author}</span>

//                       </div>
//                     </div>
//                     <div className={styles.newcontentfooter}>
//                       <a
//                         href={items.post_url}
//                         target="_blank"
//                         className={styles.linkTab}
//                         style={{cursor:"pointer"}}
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

//         <div className={styles.Header}>Finance</div>

//         <div className={styles.NewsData}>
//           {filteredNews.map((items: any, index) => {
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
//                         {items.tags
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
//                       style={{cursor:"pointer"}}
//                     >
//                       <Image src={linksTab} width={20} height={20} alt="none" />
//                     </a>
//                   </div>
//                 </div>
//               )
//             );
//           })}
//         </div>

//         {/* <div className={styles.NewsData}> 
//         {News_data.map((items, index) => {
//           return (
//             index>5 && index<10 &&
//               <div key={index} className={styles.newsCont}>
//                 <div className={styles.newsFirstCont}>
//                 <Image src={items.Image_URL} width={240} height={160} alt='none' className={styles.newsImg} />
//                 <div className={styles.newscontentheader}>
//                 <p className={styles.Tagtext}><span>{items.Tags[0]}</span> <span>{items.Tags[1]}</span></p>
//                 <p className={styles.date}>{formatDate(items.Date)}</p>
//                 </div>
//                 <a href={items.URL} target="_blank" className={styles.links}><p className={styles.Headline}>{truncateSummaryHeadline(items.Headline)}</p></a>
//                 <p className={styles.Summary}>{truncateSummary(items.Summary)}</p>
//                 </div>
//                 <div className={styles.newcontentfooter}>
//                 <div className={styles.author}>By : <span>ketih richards</span></div>
//                 <a href={items.URL} target="_blank" className={styles.linkTab}><Image src={linksTab} width={20} height={20} alt='none'/></a>
//                 </div>
//               </div>
//             )
//         })}
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Esgnews;
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import filter from "../../assets/Filter.svg";
import sortfilter from "../../assets/sortfilter.svg";
import popupCheck from "../../assets/popupcheck.svg";
import linksTab from "../../assets/linksbtn.svg";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URI}`;

const Esgnews = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortFilterSelected, setSortFilterSelected] = useState(1);
  const [popsortFilter, setPopSortFilter] = useState(false);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("date");
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(true);

  const isFirstRender = useRef(true);

  const handleSearch = (e: any) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredNews(newsData);
    } else {
      const filtered = newsData.filter((item: any) =>
        item.headline.toLowerCase().includes(term)
      );
      setFilteredNews(filtered);
    }
  };

  const fetchNews = useCallback(async () => {
    const params = new URLSearchParams({
      sort_by: sortBy,
      order: order,
      limit: limit.toString(),
    }).toString();

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/get_news?${params}`);
      if (!response.ok) throw new Error("Failed to fetch news");

      const data = await response.json();
      setNewsData(data.data.data);
      setFilteredNews(data.data.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }, [sortBy, order, limit]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchNews();
  }, [fetchNews]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSortFilter = (filterNum: any) => {
    setSortFilterSelected(filterNum);
    switch (filterNum) {
      case 1:
        setSortBy("date");
        setOrder("desc");
        break;
      case 2:
        setSortBy("date");
        setOrder("asc");
        break;
      case 3:
        setSortBy("headline");
        setOrder("asc");
        break;
      case 4:
        setSortBy("headline");
        setOrder("desc");
        break;
      default:
        setSortBy("date");
        setOrder("desc");
    }
  };

  const truncateSummary = (summary: any) => {
    return summary.length > 136 ? summary.slice(0, 136) + "..." : summary;
  };

  const truncateSummaryHeadline = (summary: any) => {
    return summary.length > 50 ? summary.slice(0, 50) + "..." : summary;
  };

  const truncatearticleSummaryHeadline = (summary: any) => {
    return summary.length > 70 ? summary.slice(0, 70) + "..." : summary;
  };

  return (
    <div className={styles.EsgNewsContainer}>
      <div className={styles.sectionHeader}>
        <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
        <p>
          <span>/</span>ESG News
        </p>
      </div>

      <div className={styles.subHeader}>
        <div className={styles.seactionName}>ESG News</div>
        <div className={styles.sectionFilters}>
          <div className={styles.sortFilter}>
            <div
              className={styles.sortFilter2}
              onClick={() => {
                setPopSortFilter(!popsortFilter);
              }}
            >
              <Image
                src={sortfilter}
                width={16}
                height={16}
                alt="none"
                className={styles.filterIcon}
              />
              SORT BY
            </div>
            {popsortFilter && (
              <div className={styles.popUp}>
                {["Newest First", "Oldest First", "A-Z", "Z-A"].map(
                  (label, index) => (
                    <div
                      key={index}
                      className={
                        sortFilterSelected === index + 1
                          ? styles.popUpoptionshadow
                          : styles.popUpoption
                      }
                      onClick={() => handleSortFilter(index + 1)}
                    >
                      <p>{label}</p>
                      <Image
                        src={popupCheck}
                        width={17}
                        height={17}
                        alt="news image"
                        className={
                          sortFilterSelected !== index + 1
                            ? styles.hidden
                            : styles.show
                        }
                      />
                    </div>
                  )
                )}
              </div>
            )}
          </div>
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
              placeholder="Search News"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {loading && <div className={styles.loader}></div>}

      {!loading && (
        <div className={styles.Esgnews}>
          <div className={styles.NewsData1}>
            {filteredNews.map((items: any, index) => {
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
                        {items.tags
                          .split(", ")
                          .slice(0, 2)
                          .map((tag: any, i: any) => (
                            <span key={i}>{tag}</span>
                          ))}
                      </p>
                    </div>
                    <div className={styles.articleInfo}>
                      <div className={styles.articleheaderInfo}>
                        <div className={styles.newscontentheader}>
                          <p className={styles.date}>
                            {formatDate(items.date)}
                          </p>
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
                          style={{ cursor: "pointer" }}
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

          <div className={styles.Header}>Finance</div>

          <div className={styles.NewsData}>
            {filteredNews.map((items: any, index) => {
              return (
                index > 1 && (
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
                        style={{ cursor: "pointer" }}
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
        </div>
      )}
    </div>
  );
};

export default Esgnews;
