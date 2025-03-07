import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import EditTarget from "./EditTarget";
import { ToastContainer, toast } from "react-toastify";
import { BASE_API, CallGETAPI, CallPOSTAPI } from "../../helper/Constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../Datatable.css";
import { tableCustomStyles } from "../../helper/utils";
import { paginationConfig } from "../global/paginationUtils";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ManageTargets({ user_id }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("All");
  const [liveCalls, setLiveCalls] = useState({});
  const [manageTarget, setManageTarget] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState("");
  const [editId, setEditId] = useState(null);
  
  // Split loading states for each API
  const [isTargetLoading, setIsTargetLoading] = useState(true);
  const [isCallsLoading, setIsCallsLoading] = useState(true);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  
  const [summaryData, setSummaryData] = useState({});
  const [callCounts, setCallCounts] = useState({});
  const API_SERVER_URL = window.CAMPAIN_WWS_URL;
  const [editValues, setEditValues] = useState({
    name: "",
    buyer_id: "",
    type: "",
    number: "",
    timeout: "",
    ivr: "",
    recording: "",
    timezone: "",
    operation: "",
    capon: "",
    callcap: "",
    monthly: "",
    monthlyInput: "",
    daily: "",
    hourly: "",
    max: "",
    maxInput: "",
    dailyInput: "",
    hourlyInput: "",
    unlimited: "",
    duplicate: ""
  });

  const handleEdit = (row) => {
    setEditId(row.target_id);
    setEditValues({
      name: row.name,
      buyer_id: row.buyer_id,
      type: row.type,
      number: row.number,
      timeout: row.timeout,
      ivr: row.ivr,
      recording: row.recording,
      timezone: row.timezone,
      operation: row.operation,
      capon: row.capon,
      callcap: row.callcap,
      monthly: row.monthly,
      monthlyInput: row.monthlyInput,
      daily: row.daily,
      dailyInput: row.dailyInput,
      hourly: row.hourly,
      max: row.max,
      maxInput: row.maxInput,
      hourlyInput: row.hourlyInput,
      unlimited: row.unlimited,
      duplicate: row.duplicate
    });
  };
  
  const onEditChange = (field, value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const onSave = async () => {
    try {
      setIsTargetLoading(true);
      if (!editId) {
        console.error("Invalid editId:", editId);
        return;
      }
  
      // Check if any of monthly, daily, or hourly inputs have values
      const hasMonthlyValue = editValues.monthly && editValues.monthlyInput && editValues.monthlyInput !== "0";
      const hasDailyValue = editValues.daily && editValues.dailyInput && editValues.dailyInput !== "0";
      const hasHourlyValue = editValues.hourly && editValues.hourlyInput && editValues.hourlyInput !== "0";
  
      // Set unlimited to 0 if any of the inputs have values, otherwise set to 1
      const unlimited = (!hasMonthlyValue && !hasDailyValue && !hasHourlyValue) ? "1" : "0";
  
      // Prepare the payload with the calculated unlimited value
      const payload = {
        ...editValues,
        monthlyInput: editValues.monthlyInput || "0",
        dailyInput: editValues.dailyInput || "0",
        hourlyInput: editValues.hourlyInput || "0",
        unlimited: unlimited // Set the calculated unlimited value
      };
  
      // Send a PUT request to update the data on the server
      const response = await CallPOSTAPI(`api/update-target/${editId}`, payload);
  
      if (response?.data?.success) {
        toast.success("Target updated successfully!");
        fetchTargets(); // Only refresh the targets data
        setShowEditModal(false); // Close the modal
      } else {
        toast.error(response.data.message || "Target with this name already exists");
      }
  
      // Clear the edit state
      setEditId(null);
      setEditValues({
        name: "",
        buyer_id: "",
        type: "",
        number: "",
        timeout: "",
        ivr: "",
        recording: "",
        timezone: "",
        operation: "",
        capon: "",
        callcap: "",
        monthly: false,
        monthlyInput: "",
        daily: false,
        dailyInput: "",
        hourly: false,
        hourlyInput: "",
        max: false,
        maxInput: "",
        unlimited: "",
        duplicate: false
      });
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("An error occurred while updating the target.");
    } finally {
      setIsTargetLoading(false);
    }
  };

  const onCancel = () => {
    // Clear the edit state
    setEditId(null);
    setEditValues({
      name: "",
      buyer_id: "",
      type: "",
      number: "",
      timeout: "",
      ivr: "",
      recording: "",
      timezone: "",
      operation: "",
      capon: "",
      callcap: "",
      monthly: "",
      daily: "",
      hourly: "",
      max: "",
      monthlyInput: "",
      dailyInput: "",
      hourlyInput: "",
      maxInput: "",
      unlimited:"",
      duplicate: ""
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await CallGETAPI("api/get-target");
      const targets = response?.data?.data?.targetsWithBuyers || [];
      const targetToDelete = targets.find(target => target.target_id === id);

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
        didOpen: () => {
          const swalPopup = document.querySelector('.swal2-popup');
          if (swalPopup) {
            swalPopup.style.width = '380px';
            swalPopup.style.height = '200px';
            swalPopup.style.padding = '5px';
          }
        }
      });
      if (result.isConfirmed) {
        if (targetToDelete?.campaign_id) {
          Swal.fire({
            title: "This target is already assigned to the campaign",
            text: "you cannot delete this Target?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
          });
          return;
        }
        
        const deleteResponse = await CallGETAPI(`api/delete-target/${id}`);
        if (deleteResponse?.data?.message === 'Target deleted successfully') {
          await fetchTargets(); // Only fetch targets after deletion
  
          Swal.fire({
            title: "Deleted!",
            text: "Your target has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        } else {
          // Handle error if deletion fails
          Swal.fire({
            title: "Error!",
            text: deleteResponse?.data?.message || "Failed to delete the target.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      // Handle error accordingly
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the target.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const handleToggleEditModal = (target_id, row) => {
    setShowEditModal(!showEditModal);
    if (!showEditModal) {
      setEditId(target_id);
      setEditValues({
        name: row.name,
        buyer_id: row.buyer_id,
        buyername: row.buyername || "",
        type: row.type,
        number: row.number,
        timeout: row.timeout,
        ivr: row.ivr,
        recording: row.recording,
        timezone: row.timezone,
        operation: row.operation,
        capon: row.capon,
        callcap: row.callcap,
        monthly: row.monthly,
        daily: row.daily,
        hourly: row.hourly,
        max: row.max,
        monthlyInput: row.monthlyInput,
        dailyInput: row.dailyInput,
        hourlyInput: row.hourlyInput,
        maxInput: row.maxInput,
        unlimited: row.unlimited,
        duplicate: row.duplicate
      });
    } else {
      setEditId(null);
      setEditValues({
        name: "",
        buyer_id: "",
        buyername: "",
        type: "",
        number: "",
        timeout: "",
        ivr: "",
        recording: "",
        timezone: "",
        operation: "",
        capon: "",
        callcap: "",
        monthly: "",
        daily: "",
        hourly: "",
        max: "",
        monthlyInput: "",
        dailyInput: "",
        hourlyInput: "",
        maxInput: "",
        unlimited: "",
        duplicate: ""
      });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Separate fetch functions for each API
  const fetchTargets = async () => {
    try {
      setIsTargetLoading(true);
      const response = await CallGETAPI("api/get-target");
      
      const responseData = response?.data?.data?.targetsWithBuyers || [];
      
      // Map active status
      const activeStatusArray = responseData.map((item) => ({
        target_id: item.target_id,
        activestatus: item.activestatus,
      }));
      
      setIsActive(activeStatusArray);
      
      // Merge with existing data if available
      setManageTarget(prevData => {
        if (prevData.length === 0) {
          return responseData.map(target => ({
            ...target,
            total_calls: 0,
            callCount: callCounts[target.number] || 0
          }));
        } else {
          return responseData.map(target => {
            const existing = prevData.find(item => item.target_id === target.target_id) || {};
            return {
              ...target,
              total_calls: existing.total_calls || 0,
              callCount: callCounts[target.number] || 0
            };
          });
        }
      });
      
      return responseData;
    } catch (error) {
      console.error("Error fetching targets:", error);
      setError("Failed to load targets. Please try again.");
      return [];
    } finally {
      setIsTargetLoading(false);
    }
  };

  const fetchTotalCalls = async (targetData) => {
    try {
      setIsCallsLoading(true);
      const response = await CallGETAPI("api/get-Total-Count-forwarding");
      const totalCallsData = response?.data?.data || [];
      
      // Create a map of total calls by call_to number
      const totalCallsMap = {};
      totalCallsData.forEach(callData => {
        totalCallsMap[callData.call_to] = callData.total_calls;
      });
      
      // Update target data with total calls
      setManageTarget(prevData => 
        prevData.map(target => ({
          ...target,
          total_calls: totalCallsMap[target.number] || 0
        }))
      );
      
      return totalCallsData;
    } catch (error) {
      console.error("Error fetching total calls:", error);
      return [];
    } finally {
      setIsCallsLoading(false);
    }
  };

  const fetchTargetSummary = async () => {
    try {
      setIsSummaryLoading(true);
      const response = await CallGETAPI(`api/optimized-target-summary?user_id=${user_id}`);
      if (response?.data?.success) {
        // Convert array to object with targetname as key for easier lookup
        const summaryObject = response.data.data.reduce((acc, curr) => {
          acc[curr.targetname.toLowerCase()] = curr;
          return acc;
        }, {});
        setSummaryData(summaryObject);
      } else {
        setSummaryData({});
      }
    } catch (error) {
      console.error("Error fetching optimized target summary:", error);
      setSummaryData({});
    } finally {
      setIsSummaryLoading(false);
    }
  };

  // Handle SSE messages
  const handleSSEMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'update' && data.data.campaignCalls) {
        // Create a map of call counts by target number (DID)
        const newCallCounts = {};
        data.data.campaignCalls.forEach(call => {
          if (call.did) {
            newCallCounts[call.did] = (newCallCounts[call.did] || 0) + 1;
          }
        });
        setCallCounts(newCallCounts);
        
        // Update manageTarget with new call counts
        setManageTarget(prevTargets => 
          prevTargets.map(target => ({
            ...target,
            callCount: newCallCounts[target.number] || 0
          }))
        );
      }
    } catch (error) {
      console.error('Error processing SSE message:', error);
    }
  }, []);

  // Set up SSE connection in a single useEffect
  useEffect(() => {
    if (!user_id) return;

    const eventSource = new EventSource(
      `${API_SERVER_URL}/api/live-calls/stream?user_id=${user_id}`
    );

    eventSource.onmessage = handleSSEMessage;
    eventSource.onerror = (error) => {
      console.error('SSE Connection Error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user_id, handleSSEMessage, API_SERVER_URL]);

  // Initializing data - Fetch all APIs but don't wait for all of them
  useEffect(() => {
    // Create a single loading function that fetches all data independently
    const loadAllData = async () => {
      // Start all fetches in parallel
      const targetsPromise = fetchTargets();
      
      // Chain the other fetches but don't block rendering
      targetsPromise.then(() => {
        fetchTotalCalls();
        fetchTargetSummary();
      });
    };
    
    loadAllData();
    // Only run this effect once when component mounts
  }, [user_id]);

  const fetchDataByOption = async (option) => {
    try {
      setIsTargetLoading(true);

      let activestatus = "";
      if (option === "Status") {
        activestatus = "1";
      } else if (option === "Pause") {
        activestatus = "0";
      }

      const response = await CallGETAPI(
        `$api/search?activestatus=${activestatus}`
      );
      const responseData = response?.data?.data || [];
      const activeStatusArray = responseData.map((item) => ({
        target_id: item.target_id,
        activestatus: item.activestatus,
      }));

      setIsActive(activeStatusArray);
      setManageTarget(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to filter data. Please try again.");
    } finally {
      setIsTargetLoading(false);
    }
  };

  const handlePlayPause = async (id) => {
    try {
      setIsTargetLoading(true);
      const response = await CallGETAPI(`api/activestatus/${id}`);
      
      if (response?.data?.status) {
        // Update the row in your local state
        const updatedData = manageTarget.map((row) => {
          if (row.target_id === id) {
            return {
              ...row,
              activestatus: !row.activestatus, // Toggle the play/pause status
            };
          }
          return row;
        });

        // Update the state with the new data
        setManageTarget(updatedData);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.error("Error updating play/pause status:", error);
      toast.error("Failed to update status.");
    } finally {
      setIsTargetLoading(false);
    }
  };

  // Filter the data based on the selected option and search term
  const filteredData = manageTarget.filter((item) => {
    const includesSearchTerm = Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedOption === "All") {
      return includesSearchTerm; // Show all data
    } else if (selectedOption === "Status") {
      return includesSearchTerm && item.activestatus === true; // Compare as boolean
    } else if (selectedOption === "Pause") {
      return includesSearchTerm && item.activestatus === false; // Compare as boolean
    }

    return false;
  });

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    fetchDataByOption(selectedValue);
  };

  // Create placeholder rows for initial loading state
  const placeholderData = isTargetLoading ? Array(5).fill({
    target_id: 'loading',
    name: 'Loading...',
    uid: 'Loading...',
    buyername: 'Loading...',
    number: 'Loading...',
    hourly_val: null,
    daily_val: null,
    monthly_val: null,
    maxInput: 'Loading...',
    callCount: 0,
    total_calls: 0,
    activestatus: false
  }) : [];

  const columns = [
    {
      name: "ACTION",
      center: true,
      sortable: false,
      selector: (row) => row.null,
      cell: (row) => {
        // Don't render action buttons for placeholder rows
        // if (row.target_id === 'loading') {
        //   return <Skeleton width={60} height={25} />;
        // }
        
        return (
          <>
            <button
              type="button"
              className="btn btn-sm btn-outline-warning"
              onClick={() => handleToggleEditModal(row.target_id, row)}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-warning"
              onClick={() => handleDelete(row.target_id)}
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </>
        );
      },
    },

    { 
      name: "Name", 
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => {
        if (row.target_id === 'loading') {
          return <Skeleton width={80} />;
        }
        return row.name;
      } 
    },
    {
      name: "UID",
      sortable: true,
      selector: (row) => row.uid,
      cell: (row) => {
        if (row.target_id === 'loading') {
          return <Skeleton width={100} />;
        }
        // Display only first 6 characters followed by ellipsis
        return `${row.uid.substring(0, 9)}...`;
      }
    },
    {
      name: "buyer",
      selector: (row) => row.buyername,
      sortable: true,
      cell: (row) => {
        if (row.target_id === 'loading') {
          return <Skeleton width={70} />;
        }
        return row.buyername;
      }
    },
    {
      name: "Destination",
      sortable: true,
      selector: (row) => row.number,
      cell: (row) => {
        if (row.target_id === 'loading') {
          return <Skeleton width={100} />;
        }
        return row.number;
      }
    },
    {
      name: "Hour",
      selector: (row) => row.hourlyInput,
      cell: (row) => {
        if (row.target_id === 'loading') {
          return <Skeleton width={30} />;
        }
        
        const value = row.hourly_val;
        const hourlyVal = row.hourly_val || 0;
        return value === null ? "∞" : `${hourlyVal}/${value}`;
      }
    },
    {
      name: "Day",
      selector: (row) => row.dailyInput,
      cell: (row) => {
        if (row.target_id === 'loading') {
          return <Skeleton width={30} />;
        }
        
        const value = row.daily_val;
        const dailyVal = row.daily_val || 0;
        return value === null ? "∞" : `${dailyVal}/${value}`;
      },
    },
    {
      name: "Month",
      selector: (row) => row.monthlyInput,
      cell: (row) => {
        if (row.target_id === 'loading') {
          return <Skeleton width={30} />;
        }
        
        const value = row.monthly_val;
        const monthlyVal = row.monthly_val || 0;
        return value === null ? "∞" : `${monthlyVal}/${value}`;
      },
    },
    {
      name: "CC",
      selector: (row) => row.maxInput,
      sortable: true,
      cell: (row) => {
        if (row.target_id === 'loading') {
          return <Skeleton width={30} />;
        }
        return row.maxInput;
      }
    },
    {
      name: "LIVE COUNT",
      sortable: true,
      selector: (row) => row.callCount || 0,
      cell: (row) => {
        // Show skeleton only when the specific API is loading
        if (row.target_id === 'loading' || isCallsLoading) {
          return <div className="skeleton-cell"><Skeleton width={30} /></div>;
        }
        return (row.callCount || 0);
      }
    },
    {
      name: "DUPLICATE",
      sortable: true,
      selector: (row) => {
        if (row.target_id === 'loading') return 0;
        const summary = summaryData[row.name.toLowerCase()];
        return summary ? summary.duplicate : 0;
      },
      cell: (row) => {
        // Show skeleton only when the specific API is loading
        if (row.target_id === 'loading' || isSummaryLoading) {
          return <div className="skeleton-cell"><Skeleton width={30} /></div>;
        }
        return (summaryData[row.name.toLowerCase()]?.duplicate || 0);
      }
    },
    {
      name: "TOTAL CALLS",
      sortable: true,
      selector: (row) => row.total_calls || 0,
      cell: (row) => {
        // Show skeleton only when the specific API is loading
        if (row.target_id === 'loading' || isCallsLoading) {
          return <div className="skeleton-cell"><Skeleton width={30} /></div>;
        }
        return (row.total_calls || 0);
      }
    },
    {
      name: "Status",
      selector: (row) => row.activestatus,
      sortable: true,
      cell: (row) => {
        if (row.target_id === 'loading') {
          return <Skeleton circle={true} width={20} height={20} />;
        }
        
        return (
          <span
            style={{
              color: row.activestatus ? "green" : "red",
              fontSize: "3rem",
              lineHeight: 0,
            }}
          >
            &bull;
          </span>
        );
      },
    },
  ];

  // Display error message if there's an error
  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
        <button 
          className="btn btn-outline-danger btn-sm float-end" 
          onClick={() => {
            setError(null);
            fetchTargets();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <main id="main" className="main">
        <div>
          <div className="pagetitle">
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Targets</li>
              </ol>
            </nav>
          </div>
          <section>
            <div className="card">
              <div className="card-body mt-3">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-6 d-flex justify-content-start">
                      <li className="nav-item flex-fill d-flex" role="presentation">
                        <input
                          className="form-control w-50 rounded-0"
                          type="text"
                          placeholder="Search"
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                        <button type="submit" className="btn btn-primary rounded-0">
                          <i className="fa fa-search"></i>
                        </button>
                      </li>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      <div className="d-grid col-6">
                        <select
                          className="form-select rounded-0"
                          id="sel1"
                          name="sellist1"
                          value={selectedOption}
                          onChange={handleSelectChange}
                        >
                          <option>All</option>
                          <option>Live</option>
                          <option>Pause</option>
                          <option>Status</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-4 text-center">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="text-left">Manage Targets</h5>
                    </div>
                  </div>
                </div>

                <div className="container-fluid mt-4 text-left">
                  <div className="row">
                    <div className="tab-content" id="borderedTabJustifiedContent">
                      <div
                        className="tab-pane fade show active"
                        id="bordered-justified-campaign"
                        role="tabpanel"
                        aria-labelledby="campaign-tab"
                      >
                        <div className="card" style={{ boxShadow: "none" }}>
                          <div className="card-body" style={{ padding: 0, overflowX: "auto" }}>
                            <div className="main">
                              <DataTable
                                columns={columns}
                                data={isTargetLoading ? placeholderData : filteredData}
                                searchable
                                noHeader
                                defaultSortField="id"
                                defaultSortAsc={true}
                                pagination
                                highlightOnHover
                                dense
                                customStyles={tableCustomStyles}
                                progressPending={false} // We're handling loading states in cells
                                {...paginationConfig()}
                              />
                              {editId !== null && (
                                <EditTarget
                                  editValues={editValues}
                                  onEditChange={onEditChange}
                                  onSave={onSave}
                                  onCancel={onCancel}
                                  show={showEditModal}
                                  setShow={setShowEditModal}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default ManageTargets;