import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import DataTable from "./ultities-tables/Datatable";
import utility_section_data from "../../utilities/utility_section_data";
import Image from "next/image";
import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import filter from "../../assets/Filter.svg";
import sortfilter from "../../assets/sortfilter.svg";
import popupCheck from "../../assets/popupcheck.svg";
import MultiSelect from "../onboarding-questionaires/questionaire-content/multi-select/MultiSelect";
import sector_data from "../../utilities/sectors_data";
import { MdClose } from "react-icons/md";
import DataTableLogo from "../../assets/dataTablelogo.svg";
import dashboardOverflowStore from "../../store/dashboardOverflowStore";
import utility_sector from "../../utilities/utility_sector";
import DataTable2 from "./ultities-tables/Datatable2";
import SingleSelect from "../onboarding-questionaires/questionaire-content/single-select/SingleSelect";
import SingleSelect2 from "../onboarding-questionaires/questionaire-content/single-select2/SingleSelect2";
import country_data from "../../utilities/country_data";
import useNotificationsStore from "../../../components/store/notificationsStore";

const getBackgroundColor = (rating: any) => {
  switch (rating) {
    case "A":
      return "#6e8e7f";
    case "B":
      return "#b0d1ab";
    case "C":
      return "#ecce1d";
    case "D":
      return "#ed8a38";
    case "E":
      return "#ea5556";
    case "F":
      return "#ea5556";
    default:
      return "#fff"; // default background color if rating doesn't match
  }
};

const Utilitiescontent = () => {
  const [discoverUtilitiesData, setDiscoverUtilitiesData] = useState<any>([]);
  const [selectedUtility, setSelectedUtility] = useState<any>(null);
  const [utilityNavigate, setutilityNavigate] = useState(1);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sortFilterSelected, setsortFilterSelected] = useState(1);
  const [popsortFilter, setpopsortFilter] = useState(false);
  const [popFilter, setpopFilter] = useState(false);
  const [filterUtitlitySector, setFilterUtitlitySector] = useState<any>("");
  const [filterUtitlityCountry, setFilterUtitlityCountry] = useState<any>("");
  const [selectedRating, setSelectedRating] = useState<any>("");
  const [utiltiyPopUp, setutilityPopUp] = useState(false);
  const [sectorsSelected, setsectorsSelected] = useState<any>([]);

  const [filteredUtilitySectionData, setFilteredUtilitySectionData] = useState<
    typeof utility_section_data
  >([]);

  const [newUtilitiesData, setnewUtilitiesData] = useState<any>([]);
  const [filteredUtilities, setFilteredUtilities] = useState<any>([]); // For filtered results
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [newUtilitiesSector, setnewUtilitiesSector] = useState<any>([]);
  const [newUtilitiesName, setnewUtilitiesName] = useState<any>("");
  const [newUtilitiesLink, setnewUtilitiesLink] = useState<any>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const setDashboardOverflow = dashboardOverflowStore(
    (state) => state.setDashboardOverflow
  );

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleClearFilters = () => {
    setFilterUtitlitySector("");
    setFilterUtitlityCountry("");
    setSelectedRating("");
  };

  const closeutilityPopUp = () => {
    setutilityPopUp(false);
    setDashboardOverflow(false);
  };

  const saveUtilityOld = () => {
    if (
      !newUtilitiesName ||
      !newUtilitiesLink ||
      newUtilitiesSector.length === 0
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newUtility = {
      sector: newUtilitiesSector,
      name: newUtilitiesName,
      link: newUtilitiesLink,
    };

    console.log(newUtility);

    // Clear inputs
    setnewUtilitiesSector([]);
    setnewUtilitiesName("");
    setnewUtilitiesLink("");
    setutilityPopUp(false);
    setDashboardOverflow(false);
  };

  const openutilityPopUp = () => {
    setutilityPopUp(true);
    setDashboardOverflow(true);
  };

  const selectSortFilter = (filterNum: number) => {
    setsortFilterSelected(filterNum);
    if (utilityNavigate === 1) {
      fetchUtilities();
    } else {
      fetchDiscoverUtilities(); // Apply sort for Discover
    }
  };

  const handleFilterChange = (selected: any) => {
    setsectorsSelected(selected.map((item: any) => item.value));
    if (utilityNavigate === 1) {
      fetchUtilities(); // Apply filters for My Utilities
    } else {
      fetchDiscoverUtilities(); // Apply filters for Discover Utilities
    }
  };

  const utilityContentChange = (scoreNum: any) => {
    setutilityNavigate(scoreNum);
    setCurrentPage(1); // Reset page number
    if (scoreNum === 1) {
      fetchUtilities();
    } else {
      fetchDiscoverUtilities();
    }
  };

  const closePopup = () => {
    setSelectedUtility(null);
  };

  const getFlagImageUrl = (countryCode: string): string => {
    const baseUrl = "https://flagcdn.com/";
    const code = countryCode.toLowerCase();
    return `${baseUrl}${code}.svg`;
  };

  const saveUtility = async () => {
    if (
      !newUtilitiesName ||
      !newUtilitiesLink ||
      newUtilitiesSector.length === 0
    ) {
      alert("Please fill all fields.");
      return;
    }

    const accessToken = localStorage.getItem("access_token"); // Get access token

    const newUtility = {
      utilitySector: newUtilitiesSector.map((sector: any) => sector.value), // Extract 'value' from each sector
      utilityName: newUtilitiesName,
      websiteUrl: newUtilitiesLink,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/utility`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newUtility),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Failed to add utility");
      }

      // Refresh notifications after adding a utility
      const { fetchNotifications } = useNotificationsStore.getState();
      fetchNotifications();

      // alert("Utility added successfully!");
      fetchUtilities(); // Refresh utilities after adding
      closeutilityPopUp();
    } catch (error: any) {
      console.error("Error adding utility:", error);
      // alert(error.message || "An error occurred. Please try again.");
    } finally {
      // Clear inputs
      setnewUtilitiesSector([]);
      setnewUtilitiesName("");
      setnewUtilitiesLink("");
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered1 = [...newUtilitiesData]; // For DataTable1
      let filtered2 = [...utility_section_data]; // For DataTable2

      console.log("Applying filters...");

      // Apply Utility Sector Filter
      if (filterUtitlitySector) {
        filtered1 = filtered1.filter((item: any) =>
          item.sectorName?.includes(filterUtitlitySector)
        );
        filtered2 = filtered2.filter((item: any) =>
          item.sector?.includes(filterUtitlitySector)
        );
      }

      // Apply Country Filter
      if (filterUtitlityCountry) {
        filtered1 = filtered1.filter(
          (item: any) => item.country === filterUtitlityCountry
        );
        filtered2 = filtered2.filter(
          (item: any) => item.country === filterUtitlityCountry
        );
      }

      // Apply Rating Filter
      if (selectedRating) {
        filtered1 = filtered1.filter((item: any) => {
          const score = item.score;
          const rating = getRating(score); // Calculate rating from score
          return rating === selectedRating;
        });

        filtered2 = filtered2.filter(
          (item: any) => item.rating === selectedRating
        );
      }

      // Apply Sorting by Company Name for DataTable2
      filtered2.sort((a, b) => {
        if (sortDirection === "asc") {
          return a.companyName.localeCompare(b.companyName);
        } else {
          return b.companyName.localeCompare(a.companyName);
        }
      });

      // Update the filtered data for both tables
      setFilteredUtilities(filtered1);
      setFilteredUtilitySectionData(filtered2);
    };

    applyFilters();
  }, [
    filterUtitlitySector,
    filterUtitlityCountry,
    selectedRating,
    sortDirection, // Add sortDirection as a dependency
    newUtilitiesData,
  ]);

  const getRating = (score: number) => {
    if (score >= 90) {
      return "A";
    } else if (score >= 75) {
      return "B";
    } else if (score >= 55) {
      return "C";
    } else if (score >= 25) {
      return "D";
    } else {
      return "F";
    }
  };

  // useEffect(() => {
  //   if (utilityNavigate === 1) {
  //     fetchUtilities();
  //   } else {
  //     fetchDiscoverUtilities();
  //   }
  // }, [currentPage]);

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRating(event.target.value);
  };

  const fetchUtilities = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");
    const sortOptions = ["newest", "oldest", "a-z", "z-a"];
    const selectedSort = sortOptions[sortFilterSelected - 1];

    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      limit: "10",
      sort: selectedSort,
    });

    if (sectorsSelected.length > 0) {
      queryParams.append("utility_sector", sectorsSelected.join(","));
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/utilities?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Failed to fetch utilities");
      }
      setnewUtilitiesData(result.utilities);
      setFilteredUtilities(result.utilities);
      setTotalPages(result.total_pages);
    } catch (error: any) {
      console.error("Error fetching utilities:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  }, [sortFilterSelected, currentPage, sectorsSelected]);

  const fetchDiscoverUtilities = useCallback(async () => {
    const sortOptions = ["date", "name"];
    const selectedSort = sortOptions[sortFilterSelected - 1];
    const selectedOrder = sortFilterSelected === 1 ? "desc" : "asc";

    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      sort_by: selectedSort,
      sort_order: selectedOrder,
    });

    if (sectorsSelected.length > 0) {
      queryParams.append("sector", sectorsSelected.join(","));
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/get_utilities?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "Failed to fetch discover utilities");
      }

      const formattedData = result.data.static_utilities.data.map(
        (item: any) => ({
          id: item._id,
          utilityName: item["Company Name"],
          websiteUrl: item.Website,
          sector: item.Sector,
          country: item["Country ISO"].trim(),
          rating: item.Rating || "N/A",
          score: item.Score || "N/A",
          revenue: item["Company Revenue (million eur)"] || "N/A",
          employees: item["Sorted N. of Employees"] || "N/A",
          annualReport: item["Annual Report"],
          sustainabilityReport: item["Sustainability report"],
          certificates: item["Certificates (browse only)"] || "N/A",
        })
      );

      setDiscoverUtilitiesData(formattedData);
      setTotalPages(result.data.static_utilities.total_pages);
    } catch (error: any) {
      console.error("Error fetching discover utilities:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  }, [sortFilterSelected, currentPage, sectorsSelected]);

  useEffect(() => {
    if (utilityNavigate === 1) {
      fetchUtilities();
    } else {
      fetchDiscoverUtilities();
    }
  }, [utilityNavigate, currentPage, fetchUtilities, fetchDiscoverUtilities]);

  // useEffect(() => {
  //   if (utilityNavigate === 1) {
  //     fetchUtilities();
  //   } else {
  //     fetchDiscoverUtilities();
  //   }
  // }, [sortFilterSelected, sectorsSelected]);

  // const fetchUtilities = async () => {
  //   const accessToken = localStorage.getItem("access_token"); // Get access token
  //   const sortOptions = ["newest", "oldest", "a-z", "z-a"]; // Sorting options
  //   const selectedSort = sortOptions[sortFilterSelected - 1]; // Map sortFilterSelected to sort option

  //   const queryParams = new URLSearchParams({
  //     page: currentPage.toString(), // Add pagination
  //     limit: "10",
  //     sort: selectedSort,
  //   });

  //   // Add filter options if available
  //   if (sectorsSelected.length > 0) {
  //     queryParams.append("utility_sector", sectorsSelected.join(","));
  //   }

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/utilities?${queryParams.toString()}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     const result = await response.json();
  //     if (!response.ok) {
  //       throw new Error(result.detail || "Failed to fetch utilities");
  //     }
  //     setnewUtilitiesData(result.utilities);
  //     setFilteredUtilities(result.utilities);
  //     setTotalPages(result.total_pages);
  //   } catch (error: any) {
  //     console.error("Error fetching utilities:", error);
  //     alert(error.message || "An error occurred. Please try again.");
  //   }
  // };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      // Reset to full data if search is cleared
      setFilteredUtilities(newUtilitiesData);
    } else {
      const filtered = newUtilitiesData.filter(
        (utility: any) =>
          (utility.utilityName &&
            utility.utilityName.toLowerCase().includes(query.toLowerCase())) ||
          (utility.label &&
            utility.label.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredUtilities(filtered);
    }
  };

  // Fetch Discover Utilities
  // const fetchDiscoverUtilities = async () => {
  //   const sortOptions = ["date", "name"];
  //   const sortOrders = ["desc", "asc"];
  //   const selectedSort = sortOptions[sortFilterSelected - 1];
  //   const selectedOrder = sortFilterSelected === 1 ? "desc" : "asc";

  //   const queryParams = new URLSearchParams({
  //     page: currentPage.toString(),
  //     sort_by: selectedSort,
  //     sort_order: selectedOrder,
  //   });

  //   // Add filters dynamically
  //   if (sectorsSelected.length > 0) {
  //     queryParams.append("sector", sectorsSelected.join(","));
  //   }
  //   // if (selectedCountry) {
  //   //   queryParams.append("country", selectedCountry);
  //   // }
  //   // if (selectedRating) {
  //   //   queryParams.append("rating", selectedRating);
  //   // }

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URI}/get_utilities?${queryParams.toString()}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const result = await response.json();
  //     if (!response.ok) {
  //       throw new Error(result.detail || "Failed to fetch discover utilities");
  //     }

  //     const formattedData = result.data.static_utilities.data.map(
  //       (item: any) => ({
  //         id: item._id,
  //         utilityName: item["Company Name"],
  //         websiteUrl: item.Website,
  //         sector: item.Sector,
  //         country: item["Country ISO"].trim(),
  //         rating: item.Rating || "N/A",
  //         score: item.Score || "N/A",
  //         revenue: item["Company Revenue (million eur)"] || "N/A",
  //         employees: item["Sorted N. of Employees"] || "N/A",
  //         annualReport: item["Annual Report"],
  //         sustainabilityReport: item["Sustainability report"],
  //         certificates: item["Certificates (browse only)"] || "N/A",
  //       })
  //     );

  //     setDiscoverUtilitiesData(formattedData);
  //     setTotalPages(result.data.static_utilities.total_pages);
  //   } catch (error: any) {
  //     console.error("Error fetching discover utilities:", error);
  //     alert(error.message || "An error occurred. Please try again.");
  //   }
  // };

  // Fetch Discover Utilities on load
  useEffect(() => {
    if (utilityNavigate === 2) fetchDiscoverUtilities();
  }, [utilityNavigate, fetchDiscoverUtilities]);

  return (
    <div className={styles.Utilities}>
      <div className={styles.sectionHeader}>
        <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
        <p>
          <span>/</span>Utilities
        </p>
      </div>

      <div className={styles.mytasksubHeader}>
        <div className={styles.headerbox1}>
          <h2>Utilities</h2>
          <p>
            Monitor and evaluate the ESG scores of your utilities. Explore new
            utilities that prioritize sustainability in their operations and
            maintain transparency about their environmental impact.
          </p>
        </div>
        <button
          className={styles.headerbtn}
          onClick={() => {
            openutilityPopUp();
          }}
        >
          + Add Utilities
        </button>
      </div>
      <div className={styles.scorecardBody}>
        <div className={styles.scorecardsubcontbar}>
          <p
            onClick={() => {
              utilityContentChange(1);
            }}
            className={
              utilityNavigate === 1
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            My Utilities
          </p>
          <p
            onClick={() => {
              utilityContentChange(2);
            }}
            className={
              utilityNavigate === 2
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            Discover
          </p>
        </div>
        <div className={styles.scorecardBodyContent}>
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
                    </div>
                    <div
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
                        setSortDirection("asc");
                      }}
                    >
                      <p>Alphabetically A-Z</p>{" "}
                      <Image
                        src={popupCheck}
                        width={17}
                        height={17}
                        alt="news image"
                        className={
                          sortFilterSelected !== 3 ? styles.hidden : styles.show
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
                        setSortDirection("desc");
                      }}
                    >
                      <p>Alphabetically Z-A</p>{" "}
                      <Image
                        src={popupCheck}
                        width={17}
                        height={17}
                        alt="news image"
                        className={
                          sortFilterSelected !== 4 ? styles.hidden : styles.show
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.sortFilter}>
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
                    <div className={styles.selectContainer}>
                      <SingleSelect2
                        placeholder="Select Your Utility"
                        fieldData={utility_sector.sort((a, b) =>
                          a.label.localeCompare(b.label)
                        )}
                        setState={setFilterUtitlitySector}
                        state={filterUtitlitySector}
                      />
                    </div>

                    <div className={styles.twoselectcontainer}>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer}>
                          <SingleSelect2
                            placeholder="Country"
                            fieldData={country_data.sort((a, b) =>
                              a.label.localeCompare(b.label)
                            )}
                            setState={setFilterUtitlityCountry}
                            state={filterUtitlityCountry}
                          />
                        </div>
                      </div>
                      <div className={styles.select1Box}>
                        <div className={styles.selectContainer}>
                          <SingleSelect2
                            placeholder="Rating1"
                            fieldData={[
                              { label: "A", value: "A" },
                              { label: "B", value: "B" },
                              { label: "C", value: "C" },
                              { label: "D", value: "D" },
                              { label: "F", value: "F" },
                            ].sort((a, b) => a.label.localeCompare(b.label))}
                            setState={setSelectedRating}
                            state={selectedRating}
                          />
                          {/* <select
                            className={styles.select}
                            value={selectedRating}
                            onChange={handleRatingChange}
                          >
                            <option value="" disabled selected>
                              Rating
                            </option>
                            {["A", "B", "C", "D", "F"].map((rating) => (
                              <option key={rating} value={rating}>
                                {rating}
                              </option>
                            ))} */}
                          {/* </select> */}
                        </div>
                      </div>
                    </div>
                    <button
                      className={styles.filterboxbtn}
                      onClick={handleClearFilters}
                    >
                      CLEAR FILTERS
                    </button>
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
                  placeholder="Search by keywords"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          {utilityNavigate === 1 && (
            <DataTable
              utilities={filteredUtilities}
              setSelectedUtility={setSelectedUtility}
              SelectedUtility={selectedUtility}
              utilityNavigate={utilityNavigate}
              fetchUtilities={fetchUtilities}
              fetchDiscoverUtilities={fetchDiscoverUtilities}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
          {utilityNavigate === 2 && (
            <DataTable2
              setSelectedUtility={setSelectedUtility}
              SelectedUtility={selectedUtility}
              utility_section_data={filteredUtilitySectionData}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>

      {utiltiyPopUp && (
        <div className={styles.container}>
          <div className={styles.boxCont1}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={() => {
                    closeutilityPopUp();
                  }}
                />
              </div>
              <h2 className={styles.title}>Add Your Utility</h2>
              <p className={styles.description}>
                Please provide details about the utility.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utility Sector</p>
              <MultiSelect
                placeholder="Select Your Sectors"
                data={utility_sector.sort((a, b) =>
                  a.label.localeCompare(b.label)
                )}
                onChangeSelected={setnewUtilitiesSector}
                selectedData={newUtilitiesSector}
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utility name</p>
              <input
                type="text"
                value={newUtilitiesName}
                onChange={(e) => setnewUtilitiesName(e.target.value)}
                placeholder="Enter Utility Name"
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Website</p>
              <input
                type="text"
                value={newUtilitiesLink}
                onChange={(e) => setnewUtilitiesLink(e.target.value)}
                placeholder="Paste Website URL"
              />
            </div>
            <button className={styles.button} onClick={saveUtility}>
              SAVE UTILITY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Utilitiescontent;
