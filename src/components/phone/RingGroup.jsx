import React, { useState, useEffect } from "react";
import Select from "react-select";
import DataTable from "react-data-table-component";
import { Sipdatacolumns, sipdata } from "./PhoneData";
import { CallGETAPI, CallPOSTAPI } from "../../helper/Constants";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "../Datatable.css";
import { RingGroupOption, tableCustomStyles } from "../../helper/utils";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import EditRingGroup from "./EditRingGroup";
import { data } from "chart.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { paginationConfig } from "../global/paginationUtils";

function RingGroup() {
  const [strategyOptions, setstrategyOptions] = useState([]);
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [combinedRecords, setCombinedRecords] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const sip = useSelector((state) => state.wallet.extension_number);

  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const allOption = { value: "all", label: "All" };

  useEffect(() => {
    fetchPhoneNumbers();
    setPhoneNumbers([allOption, ...phoneNumbers]);
  }, []);

  const handleNumberChange = (selectedOption) => {
    // Check if "All" is selected
    if (selectedOption.some((option) => option.value === "all")) {
      setFormData({
        ...formData,
        number: phoneNumbers, // Set all phone numbers
      });
    } else {
      setFormData({
        ...formData,
        number: selectedOption,
      });
    }
  };

  const handleNumberChanges = (selectedOption) => {
    // Check if "All" is selected
    if (selectedOption.some((option) => option.value === "all")) {
      setFormData({
        ...formData,
        virtualExtensionNumber: selectedStrategies, // Set all phone numbers
      });
    } else {
      setFormData({
        ...formData,
        virtualExtensionNumber: selectedOption,
      });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    virtualExtensionNumber: [],
    strategy: "",
    ringTime: "",
    number: "",
  });

  useEffect(() => {
    fetchPhoneNumbers();
  }, []);

  // Function to fetch phone numbers
  const fetchPhoneNumbers = async () => {
    try {
      // const response = await CallGETAPI("api/get-purchase-number?unused=1");
      const response = await CallGETAPI("api/get-purchase-number-v2");
      // console.log("number fetch", response);
      if (response.status === true) {
        const phoneNumbers = response.data.data || [];
        const numbers = phoneNumbers.map((phoneNumbers) => ({
          value: phoneNumbers.number,
          label: phoneNumbers.number,
        }));
        setPhoneNumbers(numbers);
      } else {
        console.error("Failed to fetch data:", response.msg);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsLoading(false);
    }
  };

  const handleShow = () => {
    setShow(true);
    fetchPhoneNumbers(); // Call the new function when modal is opened
  };

  const handleClose = () => {
    setShow(false);
    // Reset the form fields to initial values
    setFormData({
      name: "",
      virtualExtensionNumber: [],
      strategy: "",
      ringTime: "",
    });
  };

  // const handleShow = () => setShow(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const response = await CallGETAPI("api/getAll-records-v2");
      // console.log({ response });
      if (response.status === true) {
        const records = response.data.combinedRecords || [];
        const ids = records.map((record) => ({
          value: record.id,
          label: record.id,
        }));
        setSelectedStrategies(ids);
      } else {
        console.error("Error fetching records:", response.message);
      }
    } catch (error) {
      console.error("Error fetching records:", error.message);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  const handleStrategyChange = (selectedOptions) => {
    setstrategyOptions(selectedOptions);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "ringTime") {
      const intValue = parseInt(value);

      if (!isNaN(intValue)) {
        if (intValue < 15) {
          newValue = "15";
        } else if (intValue > 30) {
          newValue = "30";
        } else {
          newValue = intValue.toString();
        }
      } else {
        newValue = "";
      }
    } else if (name === "name") {
      newValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    // Clear validation error for the current field
    if (name === "name") setNameError("");
    if (name === "number") setNumberError("");
    if (name === "virtualExtensionNumber") setExtensionError("");
    if (name === "strategy") setStrategyError("");
    if (name === "ringTime") setRingTimeError("");

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [extensionError, setExtensionError] = useState("");
  const [strategyError, setStrategyError] = useState("");
  const [ringTimeError, setRingTimeError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!formData.name.trim()) {
      setNameError("Name is required !");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!formData?.number?.length) {
      setNumberError("Number is required !");
      isValid = false;
    } else {
      setNumberError("");
    }

    if (formData.virtualExtensionNumber.length === 0) {
      setExtensionError("Virtual Extension Number is required !");
      isValid = false;
    } else {
      setExtensionError("");
    }

    if (!formData.strategy) {
      setStrategyError("Ring Strategy is required !");
      isValid = false;
    } else {
      setStrategyError("");
    }

    // if (!formData.ringTime) {
    //   setRingTimeError("Ring Time is required !");
    //   isValid = false;
    // } else if (formData.ringTime < 15 || formData.ringTime > 30) {
    //   setRingTimeError("Ring Time must be between 15 and 30 !");
    //   isValid = false;
    // } else {
    //   setRingTimeError("");
    // }

    return isValid;
  };

  // Custom styles for the Select component
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: numberError ? "red" : base.borderColor,
      // boxShadow: state.isFocused ? null : null,
      // '&:hover': {
      //   borderColor: state.isFocused ? 'red' : base['&:hover'].borderColor
      // }
    }),
  };

  const handleAddRingGroup = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      // const createExtensionsResponse = await CallPOSTAPI(
      //   "api/asterisk/send-to-queue",
      //   {

      //     exten: `_${formData.number.replace(/\D/g, "")} `,

      //   }
      // );

      // if (createExtensionsResponse.status) {
      //   // console.log(
      //     "Extensions created successfully:",
      //     createExtensionsResponse
      //   );
      // } else {
      //   console.error(
      //     "Error creating extensions:",
      //     createExtensionsResponse.message
      //   );
      // }

      setIsLoading(true);
      const response = await CallPOSTAPI("api/asterisk/create-ring-group", {
        queue_name: formData.name,
        announce: "",
        musiconhold: "default",
        timeout: parseInt(formData.ringTime),
        strategy: formData.strategy,
        queue_holdtime: 15,
        retry: 2,
        wrapuptime: 30,
        ext_list: formData.virtualExtensionNumber
          .map((it) => it.value)
          .toString(),
        // exten: `_${formData.number.replace(/\D/g, "")}`,
        exten: `_${formData.number.map((it) => it.value).toString()}`,
      });
      // console.log({checkReponse: response});
      setIsLoading(false);
      if (response?.data?.status) {
        handleClose();
        toast.success(response?.data?.msg);
        fetchData();
        fetchRecords();
      } else {
        toast.error(response?.data?.msg || "Number already exists");
      }
    } catch (error) {
      console.log({createRingError:error});
      toast.error('sometning went wrong please try again.');
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CallGETAPI("api/asterisk/fetch_all_ring_groups");
      // row.virtualExtensionNumber
      if (response?.data?.data) {
        const resultData = response.data.data || [];
        const newResult = [];
        for (let i = 0; i < resultData.length; i++) {
          const element = resultData[i];
          const QueueMembers =
            element?.QueueMembers?.map((it) =>
              it.interface.replace("PJSIP/", "")
            ) || [];
          const obj = { ...element, virtualExtensionNumber: QueueMembers };
          newResult.push(obj);
        }
        // console.log({ newResult });
        setData(newResult);
      }
      setIsLoading(false);
    } catch (error) {
      // console.log(error.message);
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteExtension = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this Ring Group!",
        // icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes ",
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
          // console.log("Attempting to delete item with ID:", id);

          const response = await CallGETAPI(
            `api/asterisk/delete-ring-group/${id}`
          );
          // console.log("DELETE Response:", response);
          fetchData();
          Swal.fire({
            title: "Deleted!",
            text: "Your Ring Group has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const [editValues, setEditValues] = useState({
    // name: "",
    // virtualExtensionNumber: [],
    // strategy: "",
    // ringTime: "",
    queue_name: "",
    strategy: "",
    timeout: "",
    ext_list: [],
    mobile_number: "",
  });

  const onEditChange = (field, value) => {
    setEditValues({
      ...editValues,
      [field]: value,
    });
  };

  const [editId, setEditId] = useState(null);

  const onCancel = () => {
    setEditId(null);
    setEditValues({
      // name: "",
      // virtualExtensionNumber: [],
      // strategy: "",
      // ringTime: "",
      queue_name: "",
      strategy: "",
      timeout: "",
      ext_list: [],
      mobile_number: "",
    });
  };

  const onSave = async () => {
    try {
      setIsLoading(true);
      if (!editId) {
        console.error("Invalid editId:", editId);
        return;
      }
      //Send a PUT request to update the data on the server
      const response = await CallPOSTAPI(
        `api/asterisk/update-ring-group/${editId}`,
        editValues
      );

      // console.log("PUT Response:", response);

      setShowEditModal(false);
      fetchData();
      //Update the row in your local state

      setEditId(null);
      setEditValues({
        // name: "",
        // virtualExtensionNumber: [],
        // strategy: "",
        // ringTime: "",
        queue_name: "",
        strategy: "",
        timeout: "",
        ext_list: [],
        mobile_number: "",
      });
      setIsLoading(false);
      // Reload the page
    } catch (error) {
      console.error("Error updating data:", error);
      setIsLoading(false);
      // Handle error accordingly
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditModal = (id, row) => {
    // console.log({ chk2: row });
    setShowEditModal(!showEditModal);
    const phoneNumbersFormatted = phoneNumbers.map((phoneNumber) => ({
      value: phoneNumber.value,
      label: phoneNumber.label,
    }));
    if (!showEditModal) {
      setEditId(id);
      setEditValues({
        // name: row.queue_name,
        // virtualExtensionNumber: row.virtualExtensionNumber,
        // strategy: row.strategy,
        // ringTime: row.timeout,

        queue_name: row.queue_name,
        ext_list: row.virtualExtensionNumber,
        strategy: row.strategy,
        timeout: row.timeout,
        mobile_number: row.mobile_number,
      });
    } else {
      setEditId(null);
      setEditValues({
        name: "",
        // virtualExtensionNumber: [],
        ext_list: [],
        strategy: "",
        ringTime: "",
        mobile_number: "",
      });
    }
  };
  function removeUnderscores(str) {
    // Replace all underscores with an empty string
    return str.replace(/_/g, "");
  }

  const columns = [
    {
      name: "Name",
      // selector: "queue_name",
      selector: row => row.queue_name,

      sortable: true,
    },
    {
      name: "Number",
      // selector: "mobile_number", // Use the "number" field from your data
      selector: row => row.mobile_number,

      sortable: true,
      cell: (row) => {
        let num = row.mobile_number;
        num = removeUnderscores(num);
        return <>{num}</>;
      },
      // cell: () => "number", // Display static number for each row
    },

    {
      name: "Extension Number",

      sortable: true,
      cell: (row) => {
        const interfaces =
          row.QueueMembers &&
          row.QueueMembers.map((member) => member.interface.split("/")[1]);
        const displayText =
          interfaces.length > 3
            ? `${interfaces.slice(0, 3).join(", ")}...`
            : interfaces.join(", ");
        return <div>{displayText}</div>;
      },
    },
    {
      name: "Ring Strategy",
      // selector: "strategy",
      selector: row => row.strategy,

    },
    {
      name: "Ring Time",
      // selector: "timeout",
      selector: row => row.timeout,

      // cell: (d) => (
      //   <div className="form-check form-switch">
      //     <input
      //       className="form-check-input"
      //       type="checkbox"
      //       role="switch"
      //       id="flexSwitchCheckDefault"
      //     />
      //   </div>
      // ),
    },

    {
      name: "ACTION",
      center: true,
      sortable: false,
      cell: (row) => (
        <>
          {/* <button
            type="button"
            className="btn btn-sm btn-outline-warning me-2"
            onClick={() => handleEditModal(row.name, row)}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button> */}
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={() => handleDeleteExtension(row.name)} // Call handleDeleteExtension function on delete icon click
          >
            <i className="fa-regular fa-trash-alt"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div>
        <main id="main" className="main">
          <div className="pagetitle">
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active">RingGroup</li>
              </ol>
            </nav>
          </div>

          <div className="d-flex justify-content-end mb-3">
            <Button
              className="text-left"
              variant="primary"
              onClick={handleShow}
            >
              Add RingGroup
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              className="modal-lg"
              backdrop="static"
            >
              <Modal.Header closeButton style={{ fontSize: "30px" }}>
                <Modal.Title> Add RingGroup</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form method="post">
                  <div className="row mb-3 ">
                    <label
                      htmlFor="inputName"
                      className="col-sm-4 col-form-label d-flex justify-content-end"
                    >
                      Name*:
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className={`form-control w-100 ${
                          nameError ? "" : "" // Remove border-red class
                        }`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {nameError && (
                        <div className="error-message validation-style">
                          {nameError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3 ">
                    <label
                      htmlFor="inputNumber"
                      className="col-sm-4 col-form-label d-flex justify-content-end"
                    >
                      Number*:
                    </label>
                    <div className="col-sm-6">
                      <Select
                        options={[allOption, ...phoneNumbers]} // Include "All" in options
                        value={formData.number}
                        onChange={handleNumberChange} // Use the new handle function
                        isSearchable
                        isMulti
                      />

                      {numberError && (
                        <div className="invalid-feedback">{numberError}</div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3 ">
                    <label
                      htmlFor="inputVirtualExtensionNumber"
                      className="col-sm-4 col-form-label d-flex justify-content-end"
                    >
                      Virtual Extension Number*:
                    </label>
                    <div className="col-sm-6">
                      {/* <Select
                        options={selectedStrategies}
                        isMulti
                        value={formData.virtualExtensionNumber}
                        onChange={(selectedOptions) => {
                          setFormData({
                            ...formData,
                            virtualExtensionNumber: selectedOptions,
                          });
                          setExtensionError(""); // Clear error on change
                        }}
                        // styles={customSelectStyles}
                        className={` ${extensionError ? "is-invalid" : ""}`}
                      /> */}
                      <Select
                        options={[allOption, ...selectedStrategies]} // Include "All" in options
                        value={formData.virtualExtensionNumber}
                        onChange={handleNumberChanges} // Use the new handle function
                        isSearchable
                        isMulti
                      />
                      {extensionError && (
                        <div className="invalid-feedback">{extensionError}</div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputstrategy"
                      className="col-sm-4 col-form-label d-flex justify-content-end"
                    >
                      Ring Strategy*:
                    </label>
                    <div className="col-sm-6">
                      <select
                        id="inputstrategy"
                        name="strategy"
                        value={formData.strategy}
                        onChange={handleInputChange}
                        required
                        // styles={customSelectStyles}
                        // className="form-select w-100"
                        className={` form-select ${strategyError ? "" : ""}`}
                      >
                        <option value="">---- Select One----</option>
                        {RingGroupOption.map((ptp) => (
                          <option value={ptp.value}>{ptp.title}</option>
                        ))}
                      </select>
                      {strategyError && (
                        <div className="error-message validation-style">
                          {strategyError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputRingTime"
                      className="col-sm-4 col-form-label d-flex justify-content-end"
                    >
                      Ring Time*:
                    </label>
                    <div className="col-sm-6">
                      <Box sx={{ width: 300 }}>
                        <Slider
                          value={formData.ringTime || 15}
                          min={15}
                          max={30}
                          aria-label="Ring Time"
                          valueLabelDisplay="auto"
                          styles={customSelectStyles}
                          // className={`${ringTimeError ? "is-invalid" : ""}`}
                          onChange={(e, newValue) => {
                            setFormData({ ...formData, ringTime: newValue });
                            // setRingTimeError(""); // Clear error on change
                          }}
                        />
                        {/* {ringTimeError && (
                          <div className="invalid-feedback">
                            {ringTimeError}
                          </div>
                        )} */}
                      </Box>
                    </div>
                  </div>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddRingGroup}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding in..." : "Add"}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <section className="section dashboard">
            <div className="card">
              <div className="card-body mt-3">
                <h3>
                  <strong className="border-bottom border-3 pb-2">
                    RingGroup
                  </strong>
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
                <div className="card" style={{ boxShadow: "none" }}>
                  <div className="card-body" style={{ padding: 0 }}>
                    <div className="container-fluid d-flex justify-content-center">
                      <div className="w-100">
                        <div className="main">
                          <div className="container-fluid d-flex justify-content-center">
                            <div className="w-100">
                              <div>
                                <div className="m-4">
                                  <div className="container-fluid d-flex justify-content-center">
                                    <div className="w-100">
                                      {isLoading && (
                                        <div className="d-flex justify-content-center my-5">
                                          <ReactLoading
                                            type="spokes"
                                            color="grey"
                                            height={50}
                                            width={50}
                                          />
                                        </div>
                                      )}
                                      {!isLoading && (
                                        <div className="main">
                                          <DataTable
                                            className="border-top border-1 mt-4"
                                            columns={columns}
                                            data={data}
                                            searchable
                                            noHeader
                                            defaultSortField="id"
                                            defaultSortAsc={true}
                                            pagination
                                            highlightOnHover
                                            dense
                                            customStyles={tableCustomStyles}
                                  {...paginationConfig()}

                                          />

                                          {editId !== null && (
                                            <EditRingGroup
                                              editValues={editValues}
                                              onEditChange={onEditChange}
                                              onSave={onSave}
                                              show={showEditModal}
                                              setShow={setShowEditModal}
                                              onCancel={onCancel}
                                              editId={editId}
                                              phoneNumbers={phoneNumbers}
                                              strategyOptions={
                                                selectedStrategies
                                              }
                                              fetchData1={fetchData}
                                            />
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
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default RingGroup;
