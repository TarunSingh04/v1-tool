"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import DataTable from "./certificate-tables/Datatable";
import certificate_3rd from "../../utilities/certificate_3rd";
import certificate_ISO from "../../utilities/certificate_Iso";
import certificate_others from "../../utilities/certificate_others";
import Image from "next/image";
import { MdClose, MdOutlineEuroSymbol } from "react-icons/md";
import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import filter from "../../assets/Filter.svg";
import sortfilter from "../../assets/sortfilter.svg";
import popupCheck from "../../assets/popupcheck.svg";
import SingleSelect from "../onboarding-questionaires/questionaire-content/single-select/SingleSelect";
import DragFile from "../onboarding-questionaires/questionaire-content/drag-and-drop/Dragfile";
import DataTable2 from "./certficate-discover-tables/Datatable2";
import country_data from "../../utilities/country_data";
import dashboardOverflowStore from "../../store/dashboardOverflowStore";
import useNotificationsStore from "../../store/notificationsStore";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [certificates_3rd, setcertificates_3rd] = useState(certificate_3rd);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [filteredCertificates2, setFilteredCertificates2] =
    useState(certificate_3rd);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [discoverCertificates, setDiscoverCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState({
    country: "",
    category: "",
    sector: "",
    status: "",
  });

  const [selectedCertificate, setselectedCertificate] = useState<any>(null);
  const [selectedUtility, setSelectedUtility] = useState<any>(null);
  const [cartificateNavigate, setcartificateNavigate] = useState(1);
  const [sortFilterSelected, setsortFilterSelected] = useState(1);
  const [sortFilterSelected2, setsortFilterSelected2] = useState(1);
  const [popsortFilter, setpopsortFilter] = useState(false);
  const [popsortFilter2, setpopsortFilter2] = useState(false);
  const [popFilter, setpopFilter] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [addCertificatePopUp, setaddCertificatePopUp] = useState(false);
  const [newCertificatesCountry, setnewCertificatesCountry] = useState<any>("");
  const [newCertificatesLink, setnewCertificatesLink] = useState<any>("");
  const [newCertificateNAme, setnewCertificateNAme] = useState<any>("");
  const [certificatefile, setcertificateFile] = useState<any>(null);
  const [overflowState, setoverflowState] = useState(false);
  // const dashboardOverflow = dashboardOverflowStore((state) => state.dashboardOverflow);
  const setDashboardOverflow = dashboardOverflowStore(
    (state) => state.setDashboardOverflow
  );

  // const toggleOverflow = () => {
  //   setDashboardOverflow(!dashboardOverflow); // Toggle the value
  // };

  // useEffect(() => {
  //   // Filter certificates whenever searchTerm changes
  //   handleSearch();
  // }, [searchTerm, certificates]);

  // useEffect(() => {
  //   // Filter certificates whenever searchTerm changes
  //   handleSearch2();
  // }, [searchTerm2, certificates_3rd]);

  const handleSearch = useCallback(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = certificates.filter((certificate: any) => {
      const name = certificate.certificateName ?? certificate.label ?? "";
      return name.toLowerCase().includes(lowercasedSearchTerm);
    });
    setFilteredCertificates(filtered);
  }, [certificates, searchTerm]);

  // useEffect for searchTerm
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleSearch2 = useCallback(() => {
    const lowercasedSearchTerm = searchTerm2.toLowerCase();
    const filtered = certificates_3rd.filter((certificate: any) => {
      const name = certificate.certificateName ?? certificate.label ?? "";
      return name.toLowerCase().includes(lowercasedSearchTerm);
    });
    setFilteredCertificates2(filtered);
  }, [certificates_3rd, searchTerm2]);

  useEffect(() => {
    handleSearch2();
  }, [handleSearch2]);

  // const handleSearch = () => {
  //   const lowercasedSearchTerm = searchTerm.toLowerCase();
  //   const filtered = certificates.filter((certificate: any) => {
  //     const name = certificate.certificateName ?? certificate.label ?? "";
  //     return name.toLowerCase().includes(lowercasedSearchTerm);
  //   });
  //   setFilteredCertificates(filtered);
  // };

  // const handleSearch2 = () => {
  //   const lowercasedSearchTerm = searchTerm2.toLowerCase();

  //   // Check if certificate_3rd is valid and filter
  //   const filtered: any = certificates_3rd.filter((certificate3: any) => {
  //     const name = certificate3.Name || ""; // Fallback to empty string if Name is undefined
  //     return name.toLowerCase().includes(lowercasedSearchTerm);
  //   });
  //   console.log(filtered);

  //   setFilteredCertificates2(filtered);
  // };

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        sort: sort,
        ...filters,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/certificates?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCertificates(data.certificates);
        setFilteredCertificates(data.certificates);
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to fetch certificates:", data.error);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sort, filters]);

  // Function to handle sorting
  // const handleSort = () => {
  //   let sortedCertificates = [...certificates];

  //   if (sortFilterSelected === 3) {
  //     // Sort A-Z
  //     sortedCertificates.sort((a: any, b: any) =>
  //       (a.certificateName || a.label || "").localeCompare(
  //         b.certificateName || b.label || "",
  //         "en",
  //         { sensitivity: "base" }
  //       )
  //     );
  //   } else if (sortFilterSelected === 4) {
  //     // Sort Z-A
  //     sortedCertificates.sort((a: any, b: any) =>
  //       (b.certificateName || b.label || "").localeCompare(
  //         a.certificateName || a.label || "",
  //         "en",
  //         { sensitivity: "base" }
  //       )
  //     );
  //   }

  //   setCertificates(sortedCertificates);
  // };

  // const handleSort2 = () => {
  //   let sortedCertificates = [...certificates_3rd];

  //   if (sortFilterSelected2 === 3) {
  //     // Sort A-Z
  //     sortedCertificates.sort((a: any, b: any) =>
  //       (a.Name || "").localeCompare(b.Name || "", "en", {
  //         sensitivity: "base",
  //       })
  //     );
  //   } else if (sortFilterSelected2 === 4) {
  //     // Sort Z-A
  //     sortedCertificates.sort((a: any, b: any) =>
  //       (b.Name || "").localeCompare(a.Name || "", "en", {
  //         sensitivity: "base",
  //       })
  //     );
  //   }

  //   setcertificates_3rd(sortedCertificates);
  // };

  // useEffect(() => {
  //   if (sortFilterSelected === 3 || sortFilterSelected === 4) {
  //     handleSort();
  //   }
  // }, [sortFilterSelected]);

  // useEffect(() => {
  //   if (sortFilterSelected === 3 || sortFilterSelected === 4) {
  //     handleSort2();
  //   }
  // }, [sortFilterSelected2]);

  // Memoized handleSort
  const handleSort = useCallback(() => {
    let sortedCertificates = [...certificates];

    if (sortFilterSelected === 3) {
      // Sort A-Z
      sortedCertificates.sort((a: any, b: any) =>
        (a.certificateName || a.label || "").localeCompare(
          b.certificateName || b.label || "",
          "en",
          { sensitivity: "base" }
        )
      );
    } else if (sortFilterSelected === 4) {
      // Sort Z-A
      sortedCertificates.sort((a: any, b: any) =>
        (b.certificateName || b.label || "").localeCompare(
          a.certificateName || a.label || "",
          "en",
          { sensitivity: "base" }
        )
      );
    }

    setCertificates(sortedCertificates);
  }, [certificates, sortFilterSelected]);

  // Memoized handleSort2
  const handleSort2 = useCallback(() => {
    let sortedCertificates = [...certificates_3rd];

    if (sortFilterSelected2 === 3) {
      // Sort A-Z
      sortedCertificates.sort((a: any, b: any) =>
        (a.Name || "").localeCompare(b.Name || "", "en", {
          sensitivity: "base",
        })
      );
    } else if (sortFilterSelected2 === 4) {
      // Sort Z-A
      sortedCertificates.sort((a: any, b: any) =>
        (b.Name || "").localeCompare(a.Name || "", "en", {
          sensitivity: "base",
        })
      );
    }

    setcertificates_3rd(sortedCertificates);
  }, [certificates_3rd, sortFilterSelected2]);

  // Sort certificates when sortFilterSelected changes
  // useEffect(() => {
  //   if (sortFilterSelected === 3 || sortFilterSelected === 4) {
  //     handleSort();
  //   }
  // }, [handleSort]);

  // // Sort certificates_3rd when sortFilterSelected2 changes
  // useEffect(() => {
  //   if (sortFilterSelected2 === 3 || sortFilterSelected2 === 4) {
  //     handleSort2();
  //   }
  // }, [handleSort2]);

  useEffect(() => {
    if (sortFilterSelected === 3 || sortFilterSelected === 4) {
      handleSort();
    }
  }, [sortFilterSelected, handleSort]);

  useEffect(() => {
    if (sortFilterSelected2 === 3 || sortFilterSelected2 === 4) {
      handleSort2();
    }
  }, [sortFilterSelected2, handleSort2]);

  const closeCertificatePopUp = () => {
    setaddCertificatePopUp(false);
    setDashboardOverflow(false);
  };
  const onCertificateFileChange = (files: any) => {
    console.log(files);
    setcertificateFile(files);
  };

  const openCertificatePopUp = () => {
    setaddCertificatePopUp(true);
    setDashboardOverflow(true);
  };

  const selectSortFilter = (filterNum: number) => {
    setsortFilterSelected(filterNum);
  };
  const selectSortFilter2 = (filterNum: number) => {
    setsortFilterSelected2(filterNum);
  };

  const handleCardClick = (certificate: any) => {
    setselectedCertificate(certificate);
  };
  const onFileChange = (files: any) => {
    console.log(files);
    setFile(files);
  };

  const closePopup = () => {
    setselectedCertificate(null);
    setDashboardOverflow(false);
  };

  const certificateContentChange = (scoreNum: any) => {
    setcartificateNavigate(scoreNum);
  };

  const fetchDiscoverCertificates = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/get_certificates/?page=${currentPage}&limit=10&sort=${sort}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Format data before storing it
        const formattedData = data.data.map((item: any) => ({
          id: item._id,
          certificateName: item["Certificate name"],
          website: item.Website,
          logo: item.Logo,
          score: item["GENERAL SCORE"],
          description: item.Description,
          pricing: `${item["Lowest Pricing from:"]} - ${item["Highest Pricing "]}`,
          e_percentage: item.E,
          s_percentage: item.S,
          g_percentage: item.G,
        }));

        setDiscoverCertificates(formattedData);
        setTotalPages(Math.ceil(data.total / 10)); // Assuming limit is 10
      } else {
        console.error("Failed to fetch discover certificates:", data.error);
      }
    } catch (error) {
      console.error("Error fetching discover certificates:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  useEffect(() => {
    if (cartificateNavigate === 1) {
      fetchCertificates();
    } else if (cartificateNavigate === 2) {
      fetchDiscoverCertificates();
    }
  }, [cartificateNavigate, fetchCertificates, fetchDiscoverCertificates]);

  const handleSaveCertificate = async () => {
    if (
      !newCertificateNAme ||
      !newCertificatesCountry ||
      !newCertificatesLink ||
      !certificatefile
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("certificateName", newCertificateNAme);
    formData.append("country", newCertificatesCountry);
    formData.append("websiteUrl", newCertificatesLink);
    formData.append("category", "Other");
    formData.append("sector", "TBD");
    formData.append("e_score", "0");
    formData.append("s_score", "0");
    formData.append("g_score", "0");
    formData.append("status", "Pending");
    formData.append("priority", "High");
    formData.append("completion_date", "TBD");
    formData.append("renewal_due_date", "TBD");
    // formData.append("file", certificatefile);

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/certificate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Certificate added successfully!");
        fetchCertificates();

        // Refresh notifications after adding a utility
        const { fetchNotifications } = useNotificationsStore.getState();
        fetchNotifications();
      } else {
        alert(data.error || "Failed to add certificate.");
      }
    } catch (error) {
      console.error("Error adding certificate:", error);
      alert("Failed to add certificate. Please try again.");
    } finally {
      // Reset fields
      setnewCertificateNAme("");
      setnewCertificatesCountry("");
      setnewCertificatesLink("");
      setcertificateFile(null);
      setaddCertificatePopUp(false);
      setDashboardOverflow(false);
    }
  };

  return (
    <div
      className={styles.Certificates}
      style={{ overflow: overflowState ? "hidden" : "auto" }}
    >
      <div className={styles.sectionHeader}>
        <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
        <p>
          <span>/</span>Certificates
        </p>
      </div>

      <div className={styles.mytasksubHeader}>
        <div className={styles.headerbox1}>
          <h2>Certificates</h2>
          <p>
            Track and list all your sustainability certifications, including ISO
            standards and third-party verified certifications. The Certificates
            section is designed to showcase your company`s compliance with
            recognized industry standards.
          </p>
        </div>
        <button
          className={styles.headerbtn}
          onClick={() => {
            openCertificatePopUp();
          }}
        >
          + Add certificate
        </button>
      </div>

      <div className={styles.scorecardBody}>
        <div className={styles.scorecardsubcontbar}>
          <p
            onClick={() => {
              certificateContentChange(1);
            }}
            className={
              cartificateNavigate === 1
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            MY CERTIFICATES
          </p>
          <p
            onClick={() => {
              certificateContentChange(2);
            }}
            className={
              cartificateNavigate === 2
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            DISCOVER
          </p>
        </div>
        <div className={styles.scorecardBodyContent}>
          {cartificateNavigate === 1 && (
            <div className={styles.subHeader}>
              <div className={styles.sectionFilters}>
                <div className={styles.sortFilter}>
                  <div
                    className={styles.sortFilter2}
                    onClick={() => {
                      setpopsortFilter(!popsortFilter);
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
                      {/* <div
                      className={
                        sortFilterSelected === 1
                          ? styles.popUpoptionshadow
                          : styles.popUpoption
                      }
                      onClick={() => {
                        selectSortFilter(1);
                      }}
                    >
                      <p>Newest First</p>{" "}
                      <Image
                        src={popupCheck}
                        width={17}
                        height={17}
                        alt="news image"
                        className={
                          sortFilterSelected !== 1 ? styles.hidden : styles.show
                        }
                      />
                    </div> */}
                      {/* <div
                      className={
                        sortFilterSelected === 2
                          ? styles.popUpoptionshadow
                          : styles.popUpoption
                      }
                      onClick={() => {
                        selectSortFilter(2);
                      }}
                    >
                      <p>Oldest First</p>{" "}
                      <Image
                        src={popupCheck}
                        width={17}
                        height={17}
                        alt="news image"
                        className={
                          sortFilterSelected !== 2 ? styles.hidden : styles.show
                        }
                      />
                    </div> */}
                      <div
                        className={
                          sortFilterSelected === 3
                            ? styles.popUpoptionshadow
                            : styles.popUpoption
                        }
                        onClick={() => {
                          selectSortFilter(3);
                        }}
                      >
                        <p>Alphabetically A-Z</p>{" "}
                        <Image
                          src={popupCheck}
                          width={17}
                          height={17}
                          alt="news image"
                          className={
                            sortFilterSelected !== 3
                              ? styles.hidden
                              : styles.show
                          }
                        />
                      </div>
                      <div
                        className={
                          sortFilterSelected === 4
                            ? styles.popUpoptionshadow
                            : styles.popUpoption
                        }
                        onClick={() => {
                          selectSortFilter(4);
                        }}
                      >
                        <p>Alphabetically Z-A</p>{" "}
                        <Image
                          src={popupCheck}
                          width={17}
                          height={17}
                          alt="news image"
                          className={
                            sortFilterSelected !== 4
                              ? styles.hidden
                              : styles.show
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className={styles.sortFilter}>
                <div
                  className={styles.sortFilter2}
                  onClick={() => setpopFilter(!popFilter)}
                >
                  <Image
                    src={filter}
                    width={16}
                    height={16}
                    alt="none"
                    className={styles.filterIcon}
                  />
                  FILTERS
                </div>
                {popFilter && (
                  <div className={styles.popUp1}>
                    <p className={styles.filterByHeadline}>Filter By:</p>

                    <div className={styles.twoselectcontainer}>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer1}>
                          <select className={styles.select1}>
                            <option value="" disabled selected>
                              Relevance
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer1}>
                          <select className={styles.select1}>
                            <option value="" disabled selected>
                              Location
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className={styles.twoselectcontainer}>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer1}>
                          <select className={styles.select1}>
                            <option value="" disabled selected>
                              Rating
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer1}>
                          <select className={styles.select1}>
                            <option value="" disabled selected>
                              Industry
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button className={styles.filterboxbtn}>
                      CLEAR FILTERS
                    </button>
                  </div>
                )}
              </div> */}
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
                    placeholder="Search by keywords"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          {cartificateNavigate === 2 && (
            <div className={styles.subHeader}>
              <div className={styles.sectionFilters}>
                <div className={styles.sortFilter}>
                  <div
                    className={styles.sortFilter2}
                    onClick={() => {
                      setpopsortFilter2(!popsortFilter2);
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
                  {popsortFilter2 && (
                    <div className={styles.popUp}>
                      {/* <div
                      className={
                        sortFilterSelected === 1
                          ? styles.popUpoptionshadow
                          : styles.popUpoption
                      }
                      onClick={() => {
                        selectSortFilter(1);
                      }}
                    >
                      <p>Newest First</p>{" "}
                      <Image
                        src={popupCheck}
                        width={17}
                        height={17}
                        alt="news image"
                        className={
                          sortFilterSelected !== 1 ? styles.hidden : styles.show
                        }
                      />
                    </div> */}
                      {/* <div
                      className={
                        sortFilterSelected === 2
                          ? styles.popUpoptionshadow
                          : styles.popUpoption
                      }
                      onClick={() => {
                        selectSortFilter(2);
                      }}
                    >
                      <p>Oldest First</p>{" "}
                      <Image
                        src={popupCheck}
                        width={17}
                        height={17}
                        alt="news image"
                        className={
                          sortFilterSelected !== 2 ? styles.hidden : styles.show
                        }
                      />
                    </div> */}
                      <div
                        className={
                          sortFilterSelected2 === 3
                            ? styles.popUpoptionshadow
                            : styles.popUpoption
                        }
                        onClick={() => {
                          selectSortFilter2(3);
                        }}
                      >
                        <p>Alphabetically A-Z</p>{" "}
                        <Image
                          src={popupCheck}
                          width={17}
                          height={17}
                          alt="news image"
                          className={
                            sortFilterSelected2 !== 3
                              ? styles.hidden
                              : styles.show
                          }
                        />
                      </div>
                      <div
                        className={
                          sortFilterSelected2 === 4
                            ? styles.popUpoptionshadow
                            : styles.popUpoption
                        }
                        onClick={() => {
                          selectSortFilter2(4);
                        }}
                      >
                        <p>Alphabetically Z-A</p>{" "}
                        <Image
                          src={popupCheck}
                          width={17}
                          height={17}
                          alt="news image"
                          className={
                            sortFilterSelected2 !== 4
                              ? styles.hidden
                              : styles.show
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className={styles.sortFilter}>
                <div
                  className={styles.sortFilter2}
                  onClick={() => setpopFilter(!popFilter)}
                >
                  <Image
                    src={filter}
                    width={16}
                    height={16}
                    alt="none"
                    className={styles.filterIcon}
                  />
                  FILTERS
                </div>
                {popFilter && (
                  <div className={styles.popUp1}>
                    <p className={styles.filterByHeadline}>Filter By:</p>

                    <div className={styles.twoselectcontainer}>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer1}>
                          <select className={styles.select1}>
                            <option value="" disabled selected>
                              Relevance
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer1}>
                          <select className={styles.select1}>
                            <option value="" disabled selected>
                              Location
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className={styles.twoselectcontainer}>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer1}>
                          <select className={styles.select1}>
                            <option value="" disabled selected>
                              Rating
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer1}>
                          <select className={styles.select1}>
                            <option value="" disabled selected>
                              Industry
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button className={styles.filterboxbtn}>
                      CLEAR FILTERS
                    </button>
                  </div>
                )}
              </div> */}
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
                    placeholder="Search by keywords"
                    value={searchTerm2}
                    onChange={(e) => setSearchTerm2(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          {cartificateNavigate === 1 && (
            <DataTable
              certificates={filteredCertificates}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
          {cartificateNavigate === 2 && (
            <DataTable2 certificates={filteredCertificates2} />
          )}
        </div>

        {addCertificatePopUp && (
          <div className={styles.container}>
            <div className={styles.boxCont1}>
              <div className={styles.subBox}>
                <div className={styles.closeheader}>
                  <MdClose
                    className={styles.closeIcon}
                    onClick={closeCertificatePopUp}
                  />
                </div>
                <h2 className={styles.title}>Add Your Certificate</h2>
                <p className={styles.description}>
                  Please upload the certificate and provide necessary details.
                </p>
              </div>
              <div className={styles.wrapperInputBox}>
                <p>Certificate Name</p>
                <input
                  type="text"
                  placeholder="Enter Certificate Name"
                  value={newCertificateNAme}
                  onChange={(e) => setnewCertificateNAme(e.target.value)}
                />
              </div>
              <div className={styles.wrapperInputBox}>
                <p>Select Country</p>
                <SingleSelect
                  placeholder="Select Your Country"
                  fieldData={country_data.sort((a, b) =>
                    a.label.localeCompare(b.label)
                  )}
                  setState={setnewCertificatesCountry}
                  state={newCertificatesCountry}
                />
              </div>
              <div className={styles.wrapperInputBox}>
                <p>Website Link</p>
                <input
                  type="text"
                  placeholder="Paste Website Url"
                  value={newCertificatesLink}
                  onChange={(e) => setnewCertificatesLink(e.target.value)}
                />
              </div>
              <DragFile
                onFileChange={onCertificateFileChange}
                fileState={certificatefile}
              />
              <button className={styles.button} onClick={handleSaveCertificate}>
                Save Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
