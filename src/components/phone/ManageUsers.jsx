import React from "react";
import DataTable from "react-data-table-component";
import { Phonedatacolumns, Phonedata } from "./PhoneData";
import { Sipdatacolumns, sipdata } from "./PhoneData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactLoading from "react-loading";
import EditPasswordModal from "../models/EditPasswordModal";
import AddCallerId from '../models/AddCallerId';
import { FaCopy } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import {
  BASE_API,
  CallGETAPI,
  CallPOSTAPI,
  DecryptToken,
} from "../../helper/Constants";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/esm/Spinner";
import EditCallerIdModal from "../models/EditCallerIdModel";
import { paginationConfig } from "../global/paginationUtils";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ManageUsers() {
  const [dataLoading, setDataLoading] = useState(true);
  const [sipDataLoading, setSipDataLoading] = useState(true);
  const [sipData, setSipData] = useState([]);
  const [show, setShow] = useState(false);
  const [extensionCount, setExtensionCount] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editedPassword, setEditedPassword] = useState("");
  const [copiedId, setCopiedId] = useState(null); // Store the ID that was copied
  const [copiedPassword, setCopiedPassword] = useState(null); // Store the password that was copied
  const [extensionPrice, setExtensionPrice] = useState(null);
  const [extensionsAdded, setExtensionsAdded] = useState(false);
  const [showEditCallerIdModal, setShowEditCallerIdModal] = useState(false);
  const [selectedExtNumber, setSelectedExtNumber] = useState(null);
  const [selectedCallerId, setSelectedCallerId] = useState(null);
  const [extensionStatuses, setExtensionStatuses] = useState({});
  const sip = useSelector((state) => state.wallet.extension_number);
  const [statusLoading, setStatusLoading] = useState(false);
  const id = Math.floor(Math.random() * 900000) + 100000; // Generate random ID
  const handleClose = () => setShow(false);
  const [data, setData] = useState([]);
  const [editedCallerIds, setEditedCallerIds] = useState({});
  const [sipStatusData, setSipStatusData] = useState([]);
  const [transportType, setTransportType] = useState("transport-ws"); // Add new state for transport type

  useEffect(() => {
    const fetchExtensionStatus = async () => {
      setStatusLoading(true); // Set loading state to true while fetching
      try {
        // Call the new API endpoint instead of the previous one
        const response = await fetch("https://sip.livepbxphone.us/winet/sip_status.php");
        
        if (response.ok) {
          const data = await response.json();
          
          // Filter out trunk extensions if needed and create a status map
          const statusMap = data.reduce((acc, item) => {
            // Only include non-trunk extensions, or modify this filter as needed
            if (!item.extension.startsWith('TRUNK')) {
              acc[item.extension] = item.status;
            }
            return acc;
          }, {});
          
          setExtensionStatuses(statusMap);
        } else {
          console.error("Failed to fetch extension statuses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching extension statuses:", error);
      } finally {
        setTimeout(() => {
          setStatusLoading(false); // Set loading state to false after fetching
        }, 500); // Small delay to make the loading state more noticeable
      }
    };
  
    // Initial fetch
    fetchExtensionStatus();
  
    // Set up polling interval to 5 seconds
    const interval = setInterval(fetchExtensionStatus, 5000); // Poll every 5 seconds
  
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
 



  const fetchData = async () => {
    setDataLoading(true);
    try {
      const response = await CallGETAPI("api/get-purchase-number");
      if (response.status) {
        setData(response.data.data);
        const initialEditedCallerIds = response.data.data.reduce(
          (acc, curr) => {
            acc[curr.id] = "";
            return acc;
          },
          {}
        );
        setEditedCallerIds(initialEditedCallerIds);
      } else {
        console.error("Failed to fetch data:", response.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);




  const handleShow = async () => {
    try {
      const response = await CallGETAPI("api/get-extension-price");
      // console.log({ response });
      if (response.status) {
        setExtensionPrice(response.data.extensionprice);
        setShow(true);
      } else {
        console.error("Error fetching records:", response.message);
      }
    } catch (error) {
      console.error("Error fetching records:", error.message);
    }
  };

  const handleShowEditPasswordModal = (recordId, password) => {
    setSelectedRecordId(recordId);
    setEditedPassword(password);
    setShowEditPasswordModal(true);
  };

  const handleCloseEditPasswordModal = () => {
    setShowEditPasswordModal(false);
  };

  const handlePasswordChange = (event) => {
    setEditedPassword(event.target.value);
  };

  const handleSavePassword = async () => {
    try {
      const token = DecryptToken();
      const payload = {
        recordId: selectedRecordId,
        newPassword: editedPassword.trim(),
      };

      const response = await CallPOSTAPI("api/update-password", [payload]);

      if (response.status === true) {
        fetchRecords();
        toast.success(response.data.message);
        setShowEditPasswordModal(false);
      } else {
        throw new Error("Failed to edit password");
      }
    } catch (error) {
      console.error("Error editing password:", error);
      toast.error("Failed to edit password. Please try again later.");
    }
  };
  const updateTotal = (event) => {
    setExtensionCount(parseInt(event.target.value));
  };

  const addExtensions = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You want to add extensions!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (confirmation.isConfirmed) {
      setIsLoading(true);
      try {
        const token = DecryptToken();
        const payload = {
          count: extensionCount,
          transport: "transport-ws", // Transport frontend se backend bhej rahe hain
          combineData: {
            id: Math.floor(Math.random() * 900000) + 100000,
          },
          aorsData: {
            id: Math.floor(Math.random() * 900000) + 100000,
            max_contacts: 2,
            qualify_frequency: 30,
          },
          authsData: {
            id: Math.floor(Math.random() * 900000) + 100000,
            auth_type: "userpass",
            password: "voip",
            username: Math.floor(Math.random() * 900000) + 100000,
          },
          endpointsData: {
            id: Math.floor(Math.random() * 900000) + 100000,
            transport: transportType,
            aors: id,
            auth: id,
            context: "from-internal",
            disallow: "all",
            allow: "ulaw,alaw",
            mailboxes: "1000",
          },
          status: false,
        }
        const response = await CallPOSTAPI("api/createRecords", payload);
        // console.log("Response:", response);

        if (response.data.message === "Records created successfully") {
          const isUserLoggedIn = true;

          if (isUserLoggedIn) {
            payload.status = true;
          }

          fetchRecords();

          setShowToast(true);
          toast.success("Extensions added successfully!");
          setShow(false);
        } else {
          toast.error(response.msg || "Insufficient balance");
        }
      } catch (error) {
        toast.error("Failed to add extensions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setSipDataLoading(true);
    try {
      const response = await CallGETAPI("api/getAll-records");
      if (response.status === true) {
        const loggedInUserId = (sip);
        const updatedRecords = response.data.combinedRecords.map((record) => {

          const status = record.user_id === loggedInUserId;
          return { ...record, status };
        });

        setSipData(updatedRecords);
        setExtensionsAdded(true); // Set extensionsAdded to true when records are fetched
      } else {
        console.error("Error fetching records:", response.message);
      }
    } catch (error) {
      console.error("Error fetching records:", error.message);
    } finally {
      setSipDataLoading(false);
      setIsLoading(false);
    }
  };
  const handleDeleteExtension = async (recordId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this extension!",
        // icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        didOpen: () => {
          const swalPopup = document.querySelector('.swal2-popup');
          if (swalPopup) {
            swalPopup.style.width = '380px';
            swalPopup.style.height = '200px';
            swalPopup.style.padding = '5px';
          }
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await CallGETAPI(`api/delete-extension/${recordId}`);
          // console.log("DELETE Response:", response);

          if (response.status === true) {
            fetchRecords();
            toast.success("Extension deleted successfully !");
          } else {
            throw new Error("Failed to delete extension");
          }
        }
      });
    } catch (error) {
      console.error("Error deleting extension:", error);
      toast.error("Failed to delete extension. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id); // Set the ID that was copied
    setTimeout(() => setCopiedId(null), 1000); // Reset copiedId state after 1 second
    toast.success("ID Copied!");
  };

  const copyPassword = (password, rowIndex) => {
    navigator.clipboard.writeText(password);
    setCopiedPassword({ password, rowIndex }); // Set the copied password and its row index
    setTimeout(() => setCopiedPassword(null), 1000); // Reset copiedPassword state after 1 second
    toast.success("Password Copied!");
  };


  const handleCallerIdChange = (caller_id, event) => {
    const { value } = event.target;
    setEditedCallerIds((prevState) => ({
      ...prevState,
      [caller_id]: value,
    }));
  };




  const handleSaveCallerId = async (ext_number, caller_id) => {
    try {
      setIsLoading(true);
      const payload = {
        ext_number: ext_number,
        caller_id: editedCallerIds[ext_number] || caller_id // Use edited caller_id if available, otherwise use the original caller_id

      };

      const response = await CallPOSTAPI("api/add/caller-id", payload);

      if (response.data.status === true) {
        toast.success(response.data.msg);
        setEditedCallerIds((prevState) => ({
          ...prevState,
          [ext_number]: "", // Reset the edited caller_id after successful update
        }));
        fetchData();
      } else {
        toast.error(response.data.msg || "Invalid extension");
      }
    } catch (error) {
      toast.error("Error:", error.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };



  const handleShowEditCallerIdModal = (ext_number, caller_id) => {
    setSelectedExtNumber(ext_number);
    setSelectedCallerId(caller_id);
    setShowEditCallerIdModal(true);
  };

  // Function to close the modal
  const handleCloseEditCallerIdModal = () => {
    setShowEditCallerIdModal(false);
  };




  const handleDeleteCallerId = async (ext_number) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this caller ID!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (confirmation.isConfirmed) {
        setIsLoading(true);
        const payload = {
          ext_number: ext_number,
        };

        const response = await CallPOSTAPI("api/delete/caller-id", payload);

        if (response.status) {
          toast.success("Caller ID deleted successfully");
          await fetchData();
        } else {
          toast.error("Failed to delete caller ID:", response.msg);
        }
      }
    } catch (error) {
      toast.error("Error deleting caller ID:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCallerIdInput = (row) => {
    const callerId = editedCallerIds[row.ext_number] || row.caller_id;



    return (
      <div className="position-relative">
        <span style={{ width: '100px' }}></span>
        {callerId ? callerId : "N/A"}
        &nbsp;
        {/* {callerId ?
        <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            // onClick={() => handleShowEditCallerIdModal(row.ext_number, row.caller_id)}

          >
            <i className="fa-regular fa-edit"></i>
          </button>:
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={()=>setAddModal(true)}
          >
            <i className="fa-regular fa-add"></i>
          </button>
          } */}
        &nbsp;
        {/* <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={() => handleDeleteCallerId(row.ext_number)} 
          >
            <i className="fa-regular fa-trash-alt"></i>
          </button> */}

        {/* <input
            type="text"
            className="form-control"
            value={callerId}
            onChange={(event) => handleCallerIdChange(row.ext_number, event)}
          /> */}

        {/* <button
            className="btn btn-primary position-absolute top-0 end-0"
            onClick={() => handleShowEditCallerIdModal(row.ext_number, row.caller_id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "5px" }}
                />
                Saving...
              </>
            ) : (
              "Update"
            )}
          </button> */}
      </div>
    );
  };



  const [addModal, setAddModal] = useState(false);
  const [addModald, setAddModald] = useState(false);

  const Sipdatacolumns = [
    {
      name: "SIP Domain",
      // selector: "Domain",
      sortable: true,
      cell: (row) => {
        return <>{window.VOIP_HOST}</>
      }
    },
    {
      name: "SIP USER",
      // selector: "id",
      sortable: true,
      cell: (row) => (
        <div>
          <span>{row.id}</span>
          {copiedId === row.id ? (
            <span style={{ color: "green" }}>Copied!</span>
          ) : (
            <IoMdCopy
              title="ID Copy"
              style={{
                cursor: "pointer",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              onClick={() => copyId(row.id)}
            />
          )}
        </div>
      ),
    },
    {
      name: "SIP Password",
      cell: (row, rowIndex) => (
        <div>
          {copiedPassword?.password === row.password &&
            copiedPassword?.rowIndex === rowIndex ? (
            <span style={{ color: "green" }}>Copied!</span>
          ) : (
            <IoMdCopy
              title="Password Copy"
              style={{
                cursor: "pointer",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              onClick={() => copyPassword(row.password, rowIndex)}
            />
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "SIP OFF/ON",
      // selector: "status",
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id={`sipToggle-${row.id}`}
            checked={row.status}
            onChange={() => handleSipToggle(row.id, !row.status)}
            disabled={row.id !== sip}
          // Disable toggling for the logged-in user's extension
          />
        </div>
      ),
    },


    {
      name: "Status",
      sortable: true,
      cell: (row) => {
        if (statusLoading) {
          return <Skeleton width={80} height={24} />;
        }
        
        // Look up the status using the row.id which is the extension number
        const extensionStatus = extensionStatuses[row.id];
    
        // If we have a status and it's REGISTER, show as Registered
        if (extensionStatus && extensionStatus === "REGISTER") {
          return <span className="badge bg-success">Registered</span>;
        } 
        // In all other cases (no status found or status is not REGISTER), show as Unregistered
        else {
          return <span className="badge bg-danger">Unregistered</span>;
        }
      }
    },
    {
      name: "ACTION",
      center: true,
      sortable: false,
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-sm btn-outline-warning me-2"
            // onClick={()=>setAddModald(true)}
            onClick={() => handleShowEditPasswordModal(row.id, row.password)}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={() => handleDeleteExtension(row.id)} // Call handleDeleteExtension function on delete icon click
          >
            <i className="fa-regular fa-trash-alt"></i>
          </button>
        </>
      ),
    },
  ];

  const Phonedatacolumns = [
    {
      name: "Phone Number",
      // selector: "number",
      selector: row => row.number,

      sortable: true,
      compact: true,
    },
    {
      name: "Ext_Number",
      // selector: "ext_number",
      selector: row => row.ext_number,

      sortable: true,
      compact: true,
    },
    {
      name: "Status",
      // selector: "status",
      selector: row => row.status,

      sortable: true,
      cell: (row) => (row.status ? "Active" : "Inactive"),
    },
    {
      name: "Caller ID ",
      // selector: "settings",
      selector: row => row.settings,

      sortable: true,
      cell: (row) => renderCallerIdInput(row),
    },
    {
      name: "ACTION",
      center: true,
      sortable: false,
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-sm btn-outline-warning me-2"
            // onClick={() => handleShowEditCallerIdModal(row.ext_number)}.
            disabled
          >
            <i className="fa-regular fa-edit"></i>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            disabled
          // onClick={() => handleDeleteCallerId(row.ext_number)} 
          >
            <i className="fa-regular fa-trash-alt"></i>
          </button>
        </>
      ),
    },
  ];



  const handleSipToggle = async (id, newStatus) => {
    try {
      const loggedInUserId = sip; // Get the ID of the logged-in user (assuming `sip` contains the logged-in user's ID)
      if (id === loggedInUserId) {
        const updatedSipData = sipData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        );
        setSipData(updatedSipData);
      } else {
        // Display a message indicating that the user can't toggle the SIP status for this ID
        toast.error("You can't toggle the SIP status for this ID.");
      }
    } catch (error) {
      console.error("Error toggling SIP status:", error);
    }
  };



  // Calculate total value
  const totalValue = "$" + extensionCount * parseInt(extensionPrice);

// Skeleton loading for data table
const TableSkeletonLoader = ({ columns, rows = 5 }) => {
  return (
    <div className="skeleton-table">
      {/* Header */}
      <div className="d-flex border-bottom py-2">
        {Array(columns).fill().map((_, index) => (
          <div key={`header-${index}`} className="px-2" style={{ flex: 1 }}>
            <Skeleton height={24} />
          </div>
        ))}
      </div>
      
      {/* Rows */}
      {Array(rows).fill().map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="d-flex border-bottom py-2">
          {Array(columns).fill().map((_, colIndex) => (
            <div key={`cell-${rowIndex}-${colIndex}`} className="px-2" style={{ flex: 1 }}>
              <Skeleton height={20} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};


  return (
    <>

      <EditCallerIdModal
        show={showEditCallerIdModal}
        handleClose={handleCloseEditCallerIdModal}
        ext_number={selectedExtNumber}
        caller_id={selectedCallerId}
        initialCallerId={selectedCallerId} // Pass the initial caller ID here
        handleSaveCallerId={handleSaveCallerId}
      />

      <EditPasswordModal
        show={showEditPasswordModal}
        handleClose={handleCloseEditPasswordModal}
        handleSave={handleSavePassword}
        editedPassword={editedPassword}
        handlePasswordChange={handlePasswordChange}
      />
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
            <li className="breadcrumb-item">
                {isLoading ? <Skeleton width={80} /> : <Link to="/dashboard">Home</Link>}
              </li>

              <li className="breadcrumb-item active">
                {isLoading ? <Skeleton width={120} /> : "Manage Users"}
              </li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="card">
            <div className="card-body mt-3">
            <h3>
                {isLoading ? (
                  <Skeleton width={300} height={30} />
                ) : (
                  <strong className="border-bottom border-3 pb-2">
                    ManageUsers & Extension
                  </strong>
                )}
              </h3>
              <div
                className="tab-content pt-2"
                id="borderedTabJustifiedContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="bordered-justified-campaign"
                  role="tabpanel"
                  aria-labelledby="campaign-tab"
                ></div>
              </div>
              <div className="mb-3 col-md-12 text-end mt-3">
                <div className="row d-flex justify-content-end">
                  <div className=" mt-2 col-md-3"></div>
                  <div className="col-md-3 text-end">
                    {isLoading ? (
                      <Skeleton width={150} height={38} />
                    ) : (
                      <Link to="/dial-pad" className="btn btn-primary p-1">
                        <i className="fa-solid fa-phone p-2"></i>
                        Open Your Phone
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                    {dataLoading ? (
                        <div className="my-4">
                          <h5><Skeleton width={200} /></h5>
                          <TableSkeletonLoader columns={5} rows={5} />
                        </div>
                      ) : (
                        <div className="main">
                          <DataTable
                            className="border-top border-1 mt-4"
                            columns={Phonedatacolumns}
                            data={data}
                            searchable
                            noHeader
                            defaultSortField="id"
                            // sortIcon={<SortIcon />}
                            defaultSortAsc={true}
                            pagination
                            highlightOnHover
                            dense
                            {...paginationConfig()}

                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                      <div>
                        <div className="d-flex justify-content-end">
                          <Button
                            className="text-left"
                            variant="primary"
                            onClick={handleShow}
                          >
                            Buy Extensions
                          </Button>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Buy Extensions</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="row mb-3">
                                <div className="col-4 m-1">
                                  <h5>${extensionPrice} Extension</h5>
                                </div>
                                <div className="col-2 d-flex justify-content-start">
                                  <select
                                    className="form-control w-100"
                                    value={extensionCount}
                                    onChange={updateTotal}
                                  >
                                    {[...Array(100).keys()].map((num) => (
                                      <option key={num + 1} value={num + 1}>
                                        {num + 1}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-4 m-1">
                                  <h5>= Total: {totalValue}</h5>
                                </div>
                              </div>

                              {/* Add Transport Toggle */}
                              <div className="row">
                                <div className="col-12">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="transportToggle"
                                      checked={transportType === "transport-udp"}
                                      onChange={(e) => setTransportType(e.target.checked ? "transport-udp" : "transport-ws")}
                                    />
                                    <label className="form-check-label" htmlFor="transportToggle">
                                      {transportType === "transport-udp" ? "UDP Transport" : "WebSocket Transport"}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                disabled={isLoading}
                                onClick={addExtensions}
                              >
                                {isLoading ? "Adding in..." : "Add"}
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>

                      <div className="main">
                        <div class="accordion mt-4" id="accordionExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                SIP Credentials
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              className="accordion-collapse collapse show "
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                               {dataLoading ? (
                        <div className="my-4">
                          <h5><Skeleton width={200} /></h5>
                          <TableSkeletonLoader columns={5} rows={5} />
                        </div>
                      ) : (
                                <div className="accordion-body">
                                  {extensionsAdded ? (
                                    <DataTable
                                      className="border-top border-1 mt-4"
                                      columns={Sipdatacolumns}
                                      data={sipData.filter((record) => record.id !== sip)}
                                      // data={sipData}
                                      searchable
                                      noHeader
                                      defaultSortField="id"
                                      defaultSortAsc={true}
                                      pagination
                                      highlightOnHover
                                      dense
                                      {...paginationConfig()}

                                    />
                                  ) : (
                                    <div>No extensions added yet.</div>
                                  )}
                                </div>
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
          </div>
        </section>
      </main>
      {/* <footer id="footer" class="footer">
        <div class="copyright">
          &copy; Copyright 2023{" "}
          <strong>
            <span>Live PBX</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer> */}
      <AddCallerId
        show={addModal}
        onHide={() => setAddModal(false)}
        selectedNumber={selectedExtNumber}
        caller_id={selectedCallerId}
        fetchData={fetchData}
      />
    </>
  );
}

export default ManageUsers;
