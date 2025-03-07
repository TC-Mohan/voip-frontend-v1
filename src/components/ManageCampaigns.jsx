import React, { useState, useEffect } from "react";
// import { columns, data } from "./CampaignData";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { BASE_API, CallGETAPI } from "../helper/Constants";

import "./Datatable.css";
import { tableCustomStyles } from "../helper/utils";
import Swal from "sweetalert2";
import { paginationConfig } from "./global/paginationUtils";
function ManageCampaigns() {
  const navigate = useNavigate();
  const [manageCampaign, setManageCampaign] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CallGETAPI("api/get-campaign");
      setManageCampaign(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Failed to fetch campaign data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this campaign!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        customClass: {
          popup: 'small-swal-popup'
        }
      });

      if (result.isConfirmed) {
        setIsLoading(true);
        const response = await CallGETAPI(`api/delete-campaign/${id}`);
        await fetchData();
        if (response.success) {
          // Update the local state immediately
          setManageCampaign(prevState => prevState.filter(campaign => campaign.campaign_id !== id));
          Swal.fire("Deleted!", "Your campaign has been deleted.", "success");
        } else {
          throw new Error(response.message || 'Failed to delete campaign');
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      // Swal.fire("Error", "Failed to delete the campaign", "error");
    } finally {
      setIsLoading(false);
    }
  };
 


  const filteredData = manageCampaign?.data?.filter((row) => {
    if(!row.status){
      return false;
    }
    const isStatusMatch =
      selectedState === "All" ||
      String(row.status).toLowerCase() === selectedState.toLowerCase();
    const isSearchMatch = row.campaignname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check if "Pause" is selected and activestatus is false
    const isPauseMatch =
      selectedState === "Pause" && row.activestatus === false;
    const isPlayMatch = selectedState === "Status" && row.activestatus === true;

    if (selectedState == "All") {
      return isStatusMatch && isSearchMatch;
    }
    if (selectedState == "Pause") {
      return isPauseMatch && isSearchMatch;
    }
    if (selectedState == "Status") {
      return isPlayMatch && isSearchMatch;
    }
  });

  const handlePlayPause = async (id) => {
    try {
      setIsLoading(true);
      // Send a GET request to update the play/pause status
      const response = await CallGETAPI(`api/activestatus-campaign/${id}`);
      // console.log(response);

      // Update the row in your local state
      const updatedData = manageCampaign.data.map((row) => {
        if (row.campaign_id === id) {
          return {
            ...row,
            activestatus: !row.activestatus, // Toggle the play/pause status
          };
        }
        return row;
      });

      // Update the state with the new data
      setManageCampaign({ ...manageCampaign, data: updatedData });
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating play/pause status:", error);
      // Handle error accordingly, e.g., show a notification to the user
    }
  };

  const columns = [
    {
      name: "ACTION",
      center: true,
      sortable: false,
      // selector: "null",
    selector: (row) => row.null,

      cell: (row) => (
        <>
          <button
            type="submit"
            className="btn btn-sm btn-outline-warning"
            onClick={() => editApiData(row.campaign_id)}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>{" "}
          
          {row.activestatus ? (
            <button
              type="submit"
              className="btn btn-sm btn-outline-warning"
              onClick={() => handlePlayPause(row.campaign_id)}
            >
              <i className="fa-solid fa-grip-lines fa-rotate-90"></i>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-outline-warning btn-play-pause"
              onClick={() => handlePlayPause(row.campaign_id)}
            >
              <i className="fas fa-play"></i>
            </button>
          )}
          <button
            type="submit"
            className="btn btn-sm btn-outline-warning"
            onClick={() => handleDelete(row.campaign_id)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          {/* <button type="submit" class="btn btn-sm btn-outline-warning "><i class="fa-regular fa-copy "></i></button>,
            <button type="submit" class="btn btn-sm btn-outline-warning "><i class="fa-regular fa-trash-can"></i></button> */}
        </>
      ),
    },

    {
      name: "ID",
      // selector: "uid",
    selector: (row) => row.uid,

      sortable: true,
      width: "10%",
      cell: (row) => (
        <p
          className="align-text-bottom text-nowrap"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.uid}
          {/* <button type="submit" class=" btn btn-sm btn-outline-warning"><i class="fa-regular fa-copy "></i></button> */}
        </p>
      ),
      // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
    },
    {
      name: "STATUS",
      // selector: "status",
    selector: (row) => row.status,

      sortable: true,
      compact: true,
      width: "6%",
      cell: (row) => (
        <span
          style={{
            color: row.activestatus ? "green" : "red",
            fontSize: "3rem",
            lineHeight: 0,
          }}
        >
          &bull;
        </span>
      ),
    },
    {
      name: "NAME",
      // selector: "campaignname",
    selector: (row) => row.campaignname,

      sortable: true,
      width: "10%",
    },
    {
      name: "COUNTRY",
      // selector: "country",
    selector: (row) => row.country,

      sortable: true,
      width: "12%",
    },
    {
      name: "RECORDING",
      // selector: "recordcalls",
    selector: (row) => row.recordcalls,

      sortable: true,
      width: "9%",
      cell: (row) => (
        <span
          style={{
            color: row.status ? "green" : "red",
            fontSize: "3rem",
            lineHeight: 0,
          }}
        >
          &bull;
        </span>
      ),
    },
    {
      name: "HOUR",
      // selector: "hour",
    selector: (row) => row.hour,

      width: "8%",
      cell: (row) => {
        // Assuming hourlyInput is a number, you can customize the display here
        const value = row.hourlyInput;
        return value ? `${value}/∞` : "0";
        // Display "value" if value exists, otherwise '0'
      },
    },

    {
      name: "DAY",
      // selector: "day",
      width: "8%",
      cell: (row) => {
        // Assuming hourlyInput is a number, you can customize the display here
        const value = row.hourlyInput;
        return value ? `${value}/∞` : "0";
        // Display "value" if value exists, otherwise '0'
      },
    },
    {
      name: "MONTH",
      // selector: "month",
    selector: (row) => row.month,

      width: "7%",
      cell: (row) => {
        // Assuming hourlyInput is a number, you can customize the display here
        const value = row.hourlyInput;
        return value ? `${value}/∞` : "0";
        // Display "value" if value exists, otherwise '0'
      },
    },
    // {
    //     name: "TOTAL",
        // selector: "total",
    //     width: "7%",
    // },
  ];
  const editApiData = (id) => {
    navigate(`/edit-campaign/${id}`);
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            {/* <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Buyers</li>
            </ol> */}
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body mt-3">
              <h1></h1>
              {/* Bordered Tabs Justified */}
              <div className="container-fluid ">
                <div className="row">
                  <div className="col-6 d-flex justify-content-start ">
                    <li
                      className="nav-item flex-fill d-flex "
                      role="presentation"
                    >
                      <input
                        className="form-control w-50 rounded-0 search"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        type="submit"
                        class="btn btn-primary rounded-0"
                        onClick={() => {}}
                      >
                        <i class="fa fa-search"></i>
                      </button>
                    </li>
                  </div>
                  <div className="col-6 d-flex justify-content-end ">
                    <div className="d-grid col-6">
                      <select
                        className="form-select rounded-0"
                        id="sel1"
                        name="sellist1"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                      >
                        <option value="All">All</option>
                        <option value="Live">Live</option>
                        <option value="Pause">Pause</option>
                        <option value="Status">Status</option>
                      </select>
                    </div>
                    <div>
                      <button type="button" class="btn border-light ">
                        <i class="fa-solid fa-gear"></i>
                      </button>
                    </div>
                  </div>
                  <div className=" d-flex justify-content-end">
                    <div className="pl-2"></div>
                  </div>
                </div>
              </div>
              <div className="container-fluid mt-4 text-center">
                <div className="row ">
                  <div className="col-12">
                    <h5 className="text-left">Campaigns</h5>
                  </div>
                </div>
              </div>
              {isLoading && (
                <div
                  className="d-flex justify-content-center my-5"
                  style={{ marginTop: "20px" }}
                >
                  <ReactLoading
                    type="spokes"
                    color="grey"
                    height={50}
                    width={50}
                  />
                </div>
              )}
              {!isLoading && (
                <div className="container-fluid mt-4 text-left">
                  <div className="row ">
                    <div
                      className="tab-content "
                      id="borderedTabJustifiedContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="bordered-justified-campaign"
                        role="tabpanel"
                        aria-labelledby="campaign-tab"
                      >
                        <div className="card" style={{ boxShadow: "none" }}>
                          <div
                            className="card-body"
                            style={{ padding: 0, overflowX: "auto" }}
                          >
                            <div className="main">
                              {/* <DataTableExtensions {...tableData}> */}
                              <DataTable
                                columns={columns}
                                data={filteredData || []}
                                noHeader
                                defaultSortField="id"
                                // sortIcon={<SortIcon />}
                                defaultSortAsc={true}
                                pagination
                                highlightOnHover
                                dense
                                customStyles={tableCustomStyles}
                                overflowY
                                {...paginationConfig()}
                              />
                              {/* </DataTableExtensions> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Repeat the above code for the other tabs */}
                    </div>
                  </div>
                </div>
              )}
              {/* End Bordered Tabs Justified */}
            </div>
          </div>
        </section>
      </main>
      {/* <footer footer id="footer" class="footer">
        <div class="copyright">
          &copy; Copyright 2023{" "}
          <strong>
            <span>Live PBX</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer> */}
    </>
  );
}
export default ManageCampaigns;
