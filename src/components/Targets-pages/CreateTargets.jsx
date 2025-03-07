import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { CallGETAPI, CallPOSTAPI, DecryptToken } from "../../helper/Constants";
import ReactLoading from "react-loading";
import { BASE_API } from "../../helper/Constants";
import { useContext } from "react";
import { Country, City } from "country-state-city";
import ReactDOM from "react-dom";
import TimezoneSelect from "react-timezone-select";
import { GetCountry, GetTimeZoneById } from "../../helper/utils";

function CreateTargets() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [buyersList, setBuyersList] = useState([]);
  const [user_id, setUserId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    // You can perform additional actions here based on the state change
  };
  const [isCheck, setIsCheck] = useState(false);

  const handleTogglemonthly = () => {
    setIsCheck(!isCheck);
    // You can perform additional actions here based on the state change
  };

  const [isCheckd, setIsCheckd] = useState(false);

  const handleToggleDaily = () => {
    setIsCheckd(!isCheckd);
    // You can perform additional actions here based on the state change
  };

  const [isCheckh, setIsCheckh] = useState(false);

  const handleToggleHour = () => {
    setIsCheckh(!isCheckh);
    // You can perform additional actions here based on the state change
  };
  const [isCheckm, setIsCheckm] = useState(false);

  const handleTogglemax = () => {
    setIsCheckm(!isCheckm);
    // You can perform additional actions here based on the state change
  };

  const [showBasicTable, setShowBasicTable] = useState(true);

  const handleCheckChange = (event) => {
    setShowBasicTable(event.target.id === "radio10");
  };
  const [showSecondSelect, setShowSecondSelect] = useState(false);

  const handleFirstSelectChange = (e) => {
    if (e.target.value === "option2") {
      setShowSecondSelect(true);
    } else {
      setShowSecondSelect(false);
    }
  };

  const [createTarget, setCreateTarget] = useState({
    name: "",
    buyer: "",
    number: "",
    timeout: "",
    ivr: "",
    recording: false,
    timezone: "",
    operation: false,
    monthly: false,
    daily: false,
    hourly: false,
    max: false,
    maxInput: "",
    monthlyInput: "",
    hourlyInput: "",
    dailyInput: "",
    user_id: "",
    buyer_id: "",
    days: [],
    unlimited: false,
    duplicate: "0"
  });

  // console.log({ createTarget });
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isTimeoutValid, setIsTimeoutValid] = useState(true);
  const [isIvrValid, setIsIvrValid] = useState(true);

  // Validation functions
  // const validateName = (value) => value.trim() !== '';
  // const validateNumber = (value) => value.trim() !== '';
  const validateTimeout = (value) => value.trim() !== "";
  const validateIvr = (value) => value.trim() !== "";

  const validateName = (value) => {
    const errorMessage = {};

    if (!value) {
      errorMessage.value = "Name is required";
    }
    const trimmedValue = value.trim();
    const isValid = trimmedValue !== "";
    // const errorMessage = isValid ? '' : 'Please enter a name';

    return {
      isValid,
      errorMessage,
    };
  };
  const validateNumber = (value) => {
    const trimmedValue = value.trim();
    const isValid =
      /^\d*\.?\d+$/.test(trimmedValue) && parseFloat(trimmedValue) >= 0;
    const errorMessage = isValid ? "" : "Please enter a non-negative number";

    return {
      isValid,
      errorMessage,
    };
  };
  // Event handlers
  const handleNameChange = (event) => {
    const newName = event.target.value;
    const validation = validateName(newName);
    // Check if the field is empty

    setCreateTarget((prevCreateTarget) => ({
      ...prevCreateTarget,
      name: newName,
    }));

    setIsNameValid(validation.isValid);
    setErrorMsg(validation.errorMessage.value);
  };





  // The part where you toggle unlimited
  const handleUnlimitedChange = () => {
    setIsUnlimited(!isUnlimited);
    setCreateTarget((prevState) => ({
      ...prevState,
      unlimited: !isUnlimited,
      monthlyInput: !isUnlimited ? "0" : prevState.monthlyInput,
      dailyInput: !isUnlimited ? "0" : prevState.dailyInput,
      hourlyInput: !isUnlimited ? "0" : prevState.hourlyInput,
      monthly: !isUnlimited ? false : prevState.monthly,
      daily: !isUnlimited ? false : prevState.daily,
      hourly: !isUnlimited ? false : prevState.hourly,
    }));
  };

  // Add this new function to handle changes for monthly, daily, and hourly



  const handleNumberChange = (event) => {
    const newNumber = event.target.value;
    // const isPositiveNumber = /^\d*\.?\d+$/.test(newNumber) && parseFloat(newNumber) >= 0;
    const validation = validateNumber(newNumber);
    setCreateTarget((prevCreateTarget) => ({
      ...prevCreateTarget,
      number: newNumber,
    }));

    setIsNumberValid(validation.isValid);
    setErrorMsg(validation.errorMessage);
  };
  const handleTimeoutChange = (event) => {
    const newTimeout = event.target.value;
    setCreateTarget((prevCreateTarget) => ({
      ...prevCreateTarget,
      timeout: newTimeout,
    }));
    setIsTimeoutValid(validateTimeout(newTimeout));
  };

  const handleIvrChange = (event) => {
    const newIvr = event.target.value;
    setCreateTarget((prevCreateTarget) => ({
      ...prevCreateTarget,
      ivr: newIvr,
    }));
    setIsIvrValid(validateIvr(newIvr));
  };

  const handleCapToggle = (e) => {
    const { name, checked } = e.target;

    // If any cap is turned on, turn off Unlimited
    if (checked) {
      setIsUnlimited(false);
    }

    // Use the existing handleChange function
    handleChange(e);
  };


  const handleChange = (e) => {
    const { name, checked, value, type } = e.target;

    setCreateTarget((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      ...(type === "checkbox" && !checked
        ? {
          // Clear the respective input field if the toggle is off
          ...(name === 'daily' ? { dailyInput: "" } : {}),
          ...(name === 'hourly' ? { hourlyInput: "" } : {}),
          ...(name === 'monthly' ? { monthlyInput: "" } : {}) // Clear monthly input if monthly toggle is off
        }
        : {}
      ),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!isNameValid || !isNumberValid || !isTimeoutValid || !isIvrValid) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    // Set default value for maxInput if toggle is off
    if (!createTarget.max) {
      createTarget.maxInput = "1"; // Default value
    }

    try {
      setIsLoading(true);
      const finalPayload = { ...createTarget };

      // API call to create the target
      const response = await CallPOSTAPI("api/create-target", finalPayload);

      // Check if the target creation failed due to existing number
      if (!response.data.status) {
        // Handle error messages
        toast.error(response.data.message || "Target with this name already exists", {
          toastId: "errorId",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsLoading(false);
        return;
      }

      // Show success toast message
      toast.success("Target created successfully!", {
        toastId: "customId",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the form after successful submission
      setCreateTarget({
        name: "",
        buyer: "",
        number: "",
        timeout: "",
        ivr: "",
        recording: "",
        timezone: "",
        operation: "",
        monthly: "",
        daily: "",
        hourly: "",
        max: "",
        maxInput: "1",
        hourlyInput: "",
        monthlyInput: "",
        dailyInput: "",
        buyer_id: "",
        user_id: "",
        duplicate: "0" // Reset to default
      });

      navigate("/manage-targets");
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Error posting data: " + error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsLoading(false);
    }
  };



  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("psx_token");
        // console.log({ token });
        const user = DecryptToken(token);

        // Assuming you have set up state using the useState hook
        setUserId(user.user_id);
        const response = await CallGETAPI("api/get-buyer/");
        // console.log(response.data.data);
        // Assuming the API response is an array of buyers
        setBuyersList(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts



  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [timezones, setTimezones] = useState([]);
  const [isCountryError, setIsCountryError] = useState(false);



  useEffect(() => {
    const fetchCountries = async () => {
      const resultCountry = await GetCountry();
      setCountries(resultCountry || []);

      // Find the United States in the country list
      if (resultCountry && resultCountry.length > 0) {
        // Get the full name of United States
        const usCountry = resultCountry.find(country => country.iso === 'US');
        if (usCountry) {
          // Set the full country name to the timezone field
          setCreateTarget(prevState => ({
            ...prevState,
            timezone: usCountry.nicename // Set United States as default
          }));
        }
      }
    };

    fetchCountries();
  }, []);




  // Then update the handleCountrySelect function to use the full country name
  const handleCountrySelect = async (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);

    // Find the selected country object to get the full name
    const selectedCountryObj = countries.find(country => country.iso === countryId);
    const countryName = selectedCountryObj ? selectedCountryObj.nicename : "";

    // Update the timezone field with the FULL COUNTRY NAME
    setCreateTarget(prevState => ({
      ...prevState,
      timezone: countryName // Use full country name instead of ISO code
    }));

    const resultData = await GetTimeZoneById(countryId);
    setTimezones(resultData || []);

    // Use a timeout to ensure the state is updated before checking
    setTimeout(() => {
      if (!countryId) {
        setIsCountryError(true);
      } else {
        setIsCountryError(false);
      }
    }, 0);
  };

  return (
    <>
      <main id="main" className="main">
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
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body">
              <h1></h1>
              {/* Bordered Tabs Justified */}
              <div
                className="tab-content pt-2"
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
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col" class="h5">
                              Create Target
                            </th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Repeat the above code for the other tabs */}
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
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
                    <div className="container-fluid d-flex justify-content-center">
                      <div className="w-100">
                        <div>
                          <div className="m-4">
                            <form method="post" onSubmit={handleSubmit}>
                              <div className="row mb-3 ">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                                >
                                  Name :
                                </label>

                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className={`form-control w-100 ${isNameValid ? "" : "is-invalid"
                                      }`}
                                    value={createTarget.name}
                                    onChange={handleNameChange}
                                    id="inputEmail"
                                    name="name"
                                    placeholder=""
                                    required
                                  />
                                  {!isNameValid && (
                                    <div className="invalid-feedback">
                                      {errorMsg}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label
                                  className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                                  id="title3"
                                  htmlFor="Field3"
                                >
                                  Buyer :
                                </label>
                                <div className="col-sm-6">
                                  <select
                                    className="form-select w-100"
                                    id="sel1"
                                    name="buyer_id"
                                    value={createTarget.buyer_id}
                                    onChange={handleChange}
                                    required
                                  >
                                    <option value="" disabled>
                                      Select a buyer
                                    </option>

                                    {buyersList && buyersList.length > 0 ? (
                                      buyersList.map((buyer) => (
                                        <option
                                          key={buyer.buyer_id}
                                          value={buyer.buyer_id}
                                        >
                                          {buyer.buyername}
                                        </option>
                                      ))
                                    ) : (
                                      <option value="">
                                        No buyers available
                                      </option>
                                    )}
                                  </select>
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  Number :
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    className={`form-control w-100 ${isNumberValid ? "" : "is-invalid"
                                      }`}
                                    placeholder=""
                                    type=""
                                    id="typeNumber"
                                    value={createTarget.number}
                                    onChange={handleNumberChange}
                                    required
                                  />
                                  {!isNumberValid && (
                                    <div className="invalid-feedback">
                                      {errorMsg}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  Connection Timeout (seconds):
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch ">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="timeout"
                                      checked={createTarget.timeout}
                                      onChange={handleChange}
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.timeout && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          value={createTarget.timeout}
                                          name="timeout"
                                          onChange={handleChange}
                                          className="form-control w-25"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="row mb-3">
                                  <label
                                    htmlFor="inputEmail"
                                    className="col-sm-4 col-form-label d-flex justify-content-end"
                                  >
                                    Time Zone:
                                  </label>
                                  <div className="col-sm-8 d-flex row">
                                    <select
                                      className="form-select w-75"
                                      value={selectedCountry}
                                      onChange={(e) => {
                                        handleCountrySelect(e);
                                      }}
                                      name="timezone" // This should be timezone, not country
                                    >
                                      <option value="">Select Country</option>
                                      {countries.map((country) => (
                                        <option key={country.iso} value={country.iso}>
                                          {country.nicename}
                                        </option>
                                      ))}
                                    </select>

                                    {isCountryError && (
                                      <div
                                        className="col-sm-8 d-flex align-items-center justify-content-center error__feedback"
                                        style={{
                                          textAlign: 'center',
                                          color: 'red',
                                        }}
                                      >
                                        Country is required
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {/* 
      {selectedCountry && (
        <div className="row mb-3">
          <label
            htmlFor="inputTimezone"
            className="col-sm-4 col-form-label d-flex justify-content-end"
          >
            Select Timezone:
          </label>
          <div className="col-sm-8 d-flex row">
            <select className="form-select w-75" name="timezone">
              <option value="">Select Timezone</option>
              {timezones.map((timezone) => (
                <option key={timezone.timezone} value={timezone.timezone}>
                  {timezone.timezone}
                </option>
              ))}
            </select>
          </div>
        </div>
      )} */}
                              </div>

                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  Hours of operation :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="operation"
                                      value={createTarget.operation}
                                      onChange={handleChange}
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </div>
                                {createTarget.operation && (
                                  <div className="col-sm-12 mt-4">
                                    <div className="btn-group">
                                      <input
                                        type="radio"
                                        className="btn-check "
                                        name="options"
                                        id="radio9"
                                        value={createTarget.type}
                                        checked={!showBasicTable}
                                        onChange={handleCheckChange}
                                        autoComplete="off"
                                      />
                                      <label
                                        className="btn btn-outline-primary"
                                        htmlFor="radio9"
                                      >
                                        BASIC
                                      </label>
                                      <input
                                        type="radio"
                                        className="btn-check"
                                        name="options"
                                        id="radio10"
                                        value={createTarget.type}
                                        checked={showBasicTable}
                                        onChange={handleCheckChange}
                                        autoComplete="off"
                                      />
                                      <label
                                        className="btn btn-outline-primary"
                                        htmlFor="radio10"
                                      >
                                        ADVANCED
                                      </label>
                                    </div>
                                    <div className="col-sm-12 mt-4">
                                      {showBasicTable ? (
                                        /* Render the basic table */
                                        <div className="col-sm-12 mt-4 d-flex justify-content-between">
                                          <div className="col-sm-12">
                                            <table class="table  w-100 text-left ">
                                              <tr className="border-bottom">
                                                <td className="w-25">Days</td>
                                                <td className="w-25">Open</td>
                                                <td className="w-50">
                                                  Time Slot
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Sunday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.days.day
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Monday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Tuesday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Wednesday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Thursday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Friday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Saturday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </div>
                                        </div>
                                      ) : (
                                        /* Render the advanced table */
                                        <div className="col-sm-12 mt-4 d-flex justify-content-center">
                                          <div className="col-sm-12  mt-4 d-flex justify-content-center ">
                                            <table class="table  w-100 ">
                                              <tr className="border-bottom">
                                                <td className="w-25">Days</td>
                                                <td className="w-25">Open</td>
                                                <td className="w-50">
                                                  Time Slot
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">
                                                  Monday-Sunday
                                                </td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <hr />

                              <h5 className="m-2">Cap Settings</h5>
                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  monthly Cap :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      name="monthly"
                                      checked={createTarget.monthly}
                                      onChange={handleCapToggle}
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.monthly && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          name="monthlyInput"
                                          value={createTarget.monthlyInput}
                                          onChange={handleCapToggle}
                                          class="form-control w-25"
                                          htmlFor="flexSwitchCheckDefault"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  Daily Cap :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      name="daily"
                                      checked={createTarget.daily}
                                      onChange={handleCapToggle}
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.daily && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          name="dailyInput"
                                          value={createTarget.dailyInput}
                                          onChange={handleCapToggle}
                                          class="form-control w-25"
                                          htmlFor="flexSwitchCheckDefault"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  hourly Cap :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="hourly"
                                      checked={createTarget.hourly}
                                      onChange={handleCapToggle}
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.hourly && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          name="hourlyInput"
                                          value={createTarget.hourlyInput}
                                          onChange={handleCapToggle}
                                          class="form-control w-25"
                                          htmlFor="flexSwitchCheckDefault"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>


                              {/* <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  Unlimited :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      name="unlimited"
                                      value={createTarget.unlimited}
                                      checked={isUnlimited}
                                      onChange={handleUnlimitedChange}
                                      id="flexSwitchCheckUnlimited"
                                    />
                                  </div>
                                </div>
                              </div> */}


                              <h5 className="m-2">Concurrency Settings</h5>
                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  max Concurrency :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch ">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="max"
                                      checked={createTarget.max}
                                      onChange={handleChange}
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.max && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          value={createTarget.maxInput}
                                          name="maxInput"
                                          onChange={handleChange}
                                          className="form-control w-25"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row mb-3">
                                <label
                                  className="desc col-sm-4 col-form-label d-flex justify-content-end"
                                  id="title3"
                                  htmlFor="Field3"
                                >
                                  Restrict Duplicates:
                                </label>
                                <div className="col-sm-6">
                                  <select
                                    className="form-select"
                                    id="restrictDuplicates"
                                    name="duplicate"
                                    value={createTarget.duplicate}
                                    onChange={handleChange}
                                  >
                                    <option value="0">Not Restricted</option>
                                    <option value="1">Target</option>
                                  </select>
                                </div>
                              </div>

                              {/* {showSecondSelect && (
                                <div className="row mb-3">
                                  <label
                                    className="desc col-sm-4 col-form-label d-flex justify-content-end"
                                    id="title3"
                                    htmlFor="Field3"
                                  >
                                    Restrict After :
                                  </label>
                                  <div className="col-sm-6">
                                    <select
                                      className="form-select"
                                      id="sel1"
                                      name="restrictAfter"
                                      value={createTarget.restrictAfter}
                                      onChange={handleChange}
                                    >
                                      <option value="connected">
                                        Connected
                                      </option>
                                      <option value="converted">
                                        Converted
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              )} */}

                              <div className="row">
                                <div className="col-sm-6 "></div>
                                <div className="col-sm-6 d-flex justify-content-start ">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Create Target
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* End Bordered Tabs Justified */}
            </div>
          </div>
        </section>

        {/* <footer id="footer" class="footer">
          <div class="copyright">
            &copy; Copyright 2023{" "}
            <strong>
              <span>Live PBX</span>
            </strong>
            . All Rights Reserved
          </div>
        </footer> */}
      </main>
    </>
  );
}

export default CreateTargets;
