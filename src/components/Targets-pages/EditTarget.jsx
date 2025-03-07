import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BASE_API, CallGETAPI, DecryptToken } from "../../helper/Constants";
import { GetCountry, GetTimeZoneById } from "../../helper/utils";
const EditTarget = ({
  editValues,
  onEditChange,
  onCancel,
  onSave,
  show,
  setShow,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [buyersList, setBuyersList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [timezones, setTimezones] = useState([]);
  const [isCountryError, setIsCountryError] = useState(false);
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    // You can perform additional actions here based on the state change
  };
  const [isCheck, setIsCheck] = useState(false);
  const [user_id, setUserId] = useState("");
  // const handleToggleMonthly = () => {
  //   setIsCheck(!editValues.monthly);
  //   // Additional actions based on the state change can be performed here
  // };

    // Synchronize checkbox state with editValues.timeout
    const [isTimeoutEnabled, setIsTimeoutEnabled] = useState(
      Boolean(editValues.timeout)
    );
  
    useEffect(() => {
      // Ensure the checkbox reflects the initial value
      setIsTimeoutEnabled(Boolean(editValues.timeout));
    }, [editValues.timeout]);
  
    // Handle checkbox toggle
    const handleTimeoutToggle = () => {
      const newState = !isTimeoutEnabled;
      setIsTimeoutEnabled(newState);
      if (!newState) {
        // If toggled off, reset the timeout value to 0
        onEditChange("timeout", 0);
      }
    };

  
  const [toggleStates, setToggleStates] = useState({
    monthly: false,
    daily: false,
    hourly: false,
    unlimited: false,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const resultCountry = await GetCountry();
      setCountries(resultCountry || []);
 
    };

    fetchCountries();
  }, []);


  const handleCountrySelect =async (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);

    const resultData = await GetTimeZoneById(countryId);
    setTimezones(resultData || []);
    setTimeout(() => {
      if (!countryId) {
        setIsCountryError(true);
      } else {
        setIsCountryError(false);
      }
    }, 0);
  };

  const handleToggle = (toggleName) => {
    if (toggleName === "unlimited") {
      const isUnlimitedToggled = !toggleStates.unlimited;
      if (isUnlimitedToggled) {
        // When Unlimited is turned on
        setToggleStates({
          monthly: false,
          daily: false,
          hourly: false,
          unlimited: true,
        });
        onEditChange("unlimited", true);
        onEditChange("monthly", false);
        onEditChange("monthlyInput", "0"); // Set Monthly Cap to 0
        onEditChange("daily", false);
        onEditChange("dailyInput", "0"); // Set Daily Cap to 0
        onEditChange("hourly", false);
        onEditChange("hourlyInput", "0"); // Set Hourly Cap to 0
      } else {
        // When Unlimited is turned off
        setToggleStates((prevToggleStates) => ({
          ...prevToggleStates,
          unlimited: false,
        }));
        onEditChange("unlimited", false);
      }
    } else {
      // If any of the Daily, Monthly, or Hourly toggles are changed
      if (toggleStates.unlimited) {
        // If Unlimited is currently on, turn it off
        setToggleStates((prevToggleStates) => ({
          ...prevToggleStates,
          unlimited: false,
        }));
        onEditChange("unlimited", false);
      }
  
      setToggleStates((prevToggleStates) => ({
        ...prevToggleStates,
        [toggleName]: !prevToggleStates[toggleName],
      }));
  
      const newToggleState = !editValues[toggleName];
      onEditChange(toggleName, newToggleState);
      if (!newToggleState) {
        onEditChange(`${toggleName}Input`, "0"); // Set value to 0 when toggled off
      }
    }
  };
  
  // Update the useEffect for editValues.unlimited
  useEffect(() => {
    if (editValues.unlimited) {
      setToggleStates({
        monthly: false,
        daily: false,
        hourly: false,
        unlimited: true,
      });
      onEditChange("monthly", false);
      onEditChange("monthlyInput", "0");
      onEditChange("daily", false);
      onEditChange("dailyInput", "0");
      onEditChange("hourly", false);
      onEditChange("hourlyInput", "0");
    } else {
      // If Unlimited is off, set the toggle states based on editValues
      setToggleStates({
        monthly: editValues.monthly,
        daily: editValues.daily,
        hourly: editValues.hourly,
        unlimited: false,
      });
    }
  }, [editValues.unlimited]);
  

  useEffect(() => {
    if (editValues.unlimited) {
      setToggleStates((prevToggleStates) => ({
        ...prevToggleStates,
        monthly: false,
        daily: false,
        hourly: false,
        unlimited: true 
      }));
      onEditChange("monthly", false);
      onEditChange("monthlyInput", !editValues.unlimited ? "0" : editValues.monthlyInput);
      onEditChange("daily", false);
      onEditChange("dailyInput", !editValues.unlimited ? "0" : editValues.dailyInput);
      onEditChange("hourly", false);
      onEditChange("hourlyInput", !editValues.unlimited ? "0" : editValues.hourlyInput);
    }
  }, [editValues.unlimited]);

  useEffect(() => {
    setToggleStates((prevToggleStates) => ({
      ...prevToggleStates,
      monthly: editValues.monthly,
      daily: editValues.daily,
      hourly: editValues.hourly,
      unlimited: editValues.unlimited,
    }));
  }, [editValues.monthly, editValues.daily, editValues.hourly, editValues.unlimited]);


  const handleToggleMonthly = () => {
    setIsChecked(!isChecked);
    const newMonthlyState = !editValues.monthly;
    onEditChange("monthly", newMonthlyState);
    if (!newMonthlyState) {
      onEditChange("monthlyInput", "");
    }
  };
  
  const handleToggleDaily = () => {
    const newDailyState = !editValues.daily;
    onEditChange("daily", newDailyState);
    
    // Clear the dailyInput value when toggle is turned off
    if (!newDailyState) {
      onEditChange("dailyInput", "");
    }
  };


  const handleToggleRecording = () => {
    setIsCheck(!editValues.recording);
    // Additional actions based on the state change can be performed here
  };
  const [isCheckd, setIsCheckd] = useState(false);

  // const handleToggleDaily = () => {
  //   setIsCheck(!editValues.daily);
  //   // You can perform additional actions here based on the state change
  // };

  const handleToggleHour = () => {
    const newHourlyState = !editValues.hourly;
    onEditChange("hourly", newHourlyState);
    
    // Clear the hourlyInput value when toggle is turned off
    if (!newHourlyState) {
      onEditChange("hourlyInput", "");
    }
  };

  

  const handleToggleunLimited = () => {
    const newHourlyState = !editValues.unlimited;
    onEditChange("unlimited", newHourlyState);
    
    // Clear the hourlyInput value when toggle is turned off
    if (!newHourlyState) {
      onEditChange("unlimited", "");
    }
  };
  const [isCheckm, setIsCheckm] = useState(false);

 const handleToggleMax = () => {
  const newMaxState = !editValues.max;
  onEditChange("max", newMaxState);
  
  // When turning off the toggle, set maxInput to 0
  if (!newMaxState) {
    onEditChange("maxInput", "1");
  }
};
  const [showSecondSelect, setShowSecondSelect] = useState(false);

  const handleFirstSelectChange = (e) => {
    if (e.target.value === "option2") {
      setShowSecondSelect(true);
    } else {
      setShowSecondSelect(false);
    }
  };

  const [showBasicTable, setShowBasicTable] = useState(true);

  const handleCheckChange = (event) => {
    setShowBasicTable(event.target.id === "radio10");
  };
  const handleClose = () => setShow(false);

  // console.log({ editValues });

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
  }, []);

  // console.log({ buyersList });
  return (
    <>
      <Modal show={show} onHide={handleClose} className={"modal-xl"}>
        <Modal.Header closeButton></Modal.Header>
        <form method="post" className="mt-3">
          <div className="row mb-3">
            <label
              htmlFor="inputEmail"
              className="col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
            >
              Name :
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className={`form-control w-100`}
                value={editValues.name}
                onChange={(e) => onEditChange("name", e.target.value)}
                id="inputEmail"
                name="name"
                placeholder=""
                required=""
              />
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
                class="form-select w-100"
                id="sel1"
                name="buyername"
                value={editValues.buyername || ""}
                onChange={(e) => onEditChange("buyername", e.target.value)}
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
                      selected={editValues.buyer_id === buyer.buyer_id}
                    >
                      {buyer.buyername}
                    </option>
                  ))
                ) : (
                  <option value="">No buyers available</option>
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
                className={`form-control w-100`}
                placeholder=""
                type="number"
                id="typeNumber"
                name="number"
                value={editValues.number}
                onChange={(e) => onEditChange("number", e.target.value)}
                required=""
              />
            </div>
          </div>
          {/* <div className="row mb-3">
            <label
              htmlFor="inputEmail"
              className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
            >
              Connection Timeout :
            </label>
            <div className="col-sm-6">
              <input
                type="number"
                className={`form-control w-100 `}
                id="typeNumber"
                placeholder=""
                name="timeout"
                value={editValues.timeout}
                onChange={(e) => onEditChange("timeout", e.target.value)}
                required=""
              />
            </div>
          </div> */}



<div className="row mb-3">
      <label
        htmlFor="inputEmail"
        className="col-sm-4 col-form-label d-flex justify-content-end"
      >
        Connection Timeout (seconds):
      </label>
      <div className="col-sm-6">
        <div className="form-check form-switch">
          {/* Checkbox to enable/disable timeout */}
          <input
            className="form-check-input"
            type="checkbox"
            name="timeoutEnabled"
            checked={isTimeoutEnabled}
            onChange={handleTimeoutToggle}
            role="switch"
            id="flexSwitchCheckDefault"
          />
          {/* Conditional rendering for timeout input */}
          {isTimeoutEnabled && (
            <input
              type="number"
              id="typeNumber"
              value={editValues.timeout || ""}
              name="timeout"
              onChange={(e) => onEditChange("timeout", e.target.value)}
              className="form-control w-25 mt-2"
            />
          )}
        </div>
      </div>
    </div>



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
            name="country"
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
          <div className="row mb-3">
            <label
              htmlFor="inputEmail"
              className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
            >
              Dial IVR Options :
            </label>
            <div className="col-sm-6">
              <select
                className={`form-control w-100`}
                id="inputEmail"
                placeholder=""
                name="ivr"
                value={editValues.ivr}
                onChange={(e) => onEditChange("ivr", e.target.value)}
              >
                <option value="" disabled>
                  None
                </option>
                <option>Greetings 1</option>
                <option>Greetings 2</option>
                <option>Greetings 3</option>
                <option> Greetings 4</option>
              </select>
            </div>
          </div> */}

          {/* <div className="row mb-3">
            <label
              htmlFor="inputEmail"
              className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
            >
              Disable Recording :
            </label>
            <div className="col-sm-6">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="recording"
                  checked={editValues.recording}
                  onChange={(e) => {
                    handleToggleRecording(); // Handle checkbox state
                    onEditChange("recording", e.target.checked); // Handle associated value
                  }}
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
          </div> */}
        

          <div className="row mb-3">
            <label
              htmlFor="inputEmail"
              className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
            >
              Hours of Operation :
            </label>
            <div className="col-sm-6">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="operation"
                  // value={createTarget.operation}
                  onChange={handleToggleChange}
                  checked={isChecked}
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            {isChecked && (
              <div className="container-fluid">
                <div className="row d-flex justify-content-end">
                  <div className="col-sm-12  mt-4">
                    <div className="btn-group" style={{ marginLeft: "5rem" }}>
                      <input
                        type="radio"
                        className="btn-check "
                        name="options"
                        id="radio9"
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
                    <div
                      className="col-sm-10 mt-4"
                      style={{ marginLeft: "5rem" }}
                    >
                      {showBasicTable ? (
                        <div className="col-sm-12 mt-4 d-flex justify-content-center">
                          <div className="col-sm-12">
                            <table class="table  w-100 text-left ">
                              <tr className="border-bottom">
                                <td className="w-25">Days</td>
                                <td className="w-25">Open</td>
                                <td className="w-50">Time Slot</td>
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
                                        // value={createTarget.recording}
                                        // onChange={handleChange}
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
                                        // value={createTarget.recording}
                                        // onChange={handleChange}
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
                                        // value={createTarget.recording}
                                        // onChange={handleChange}
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
                                        // value={createTarget.recording}
                                        // onChange={handleChange}
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
                                        // value={createTarget.recording}
                                        // onChange={handleChange}
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
                                        // value={createTarget.recording}
                                        // onChange={handleChange}
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
                                        // value={createTarget.recording}
                                        // onChange={handleChange}
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
                        <div className="col-sm-12  mt-4 d-flex justify-content-center ">
                          <table class="table  w-100 ">
                            <tr className="border-bottom">
                              <td className="w-25">Days</td>
                              <td className="w-25">Open</td>
                              <td className="w-50">Time Slot</td>
                            </tr>
                            <tr className="border-bottom">
                              <td scope="row">Monday-Sunday</td>
                              <td>
                                <div className="d-flex justify-content-around">
                                  <div className="form-check form-switch ml-2">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="recording"
                                      // value={createTarget.recording}
                                      // onChange={handleChange}
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr />

          <h5 className="m-2 text-center">Cap Settings</h5>
          <div className="row mb-3">
            <label
              htmlFor="inputEmail"
              className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
            >
              Monthly Cap :
            </label>
            <div className="col-sm-6">
            <div className="form-check form-switch">
  <input
    className="form-check-input"
    type="checkbox"
    role="switch"
    name="monthly"
    checked={toggleStates.monthly}
    onChange={() => handleToggle("monthly")}
    id="flexSwitchCheckDefault"
  />
  {toggleStates.monthly && (
    <input
      type="number"
      id="typeNumber"
      name="monthlyInput"
      value={editValues.monthlyInput}
      onChange={(e) => onEditChange("monthlyInput", e.target.value)}
      class="form-control"
      htmlFor="flexSwitchCheckDefault"
    />
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
        checked={toggleStates.daily}
        onChange={() => handleToggle("daily")}
        id="flexSwitchCheckDefault"
      />
      {toggleStates.daily && (
        <input
          type="number"
          id="typeNumber"
          name="dailyInput"
          value={editValues.dailyInput}
          onChange={(e) => onEditChange("dailyInput", e.target.value)}
          class="form-control"
          htmlFor="flexSwitchCheckDefault"
        />
      )}
    </div>
  </div>
</div>

<div className="row mb-3">
  <label
    htmlFor="inputEmail"
    className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
  >
    Hourly Cap :
  </label>
  <div className="col-sm-6">
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        name="hourly"
        checked={toggleStates.hourly}
        onChange={() => handleToggle("hourly")}
        role="switch"
        id="flexSwitchCheckDefault"
      />
      {toggleStates.hourly && (
        <input
          type="number"
          id="typeNumber"
          name="hourlyInput"
          value={editValues.hourlyInput}
          onChange={(e) => onEditChange("hourlyInput", e.target.value)}
          className="form-control"
          htmlFor="flexSwitchCheckDefault"
        />
      )}
    </div>
  </div>
</div>

{/* <div className="row mb-3">
  <label
    htmlFor="inputEmail"
    className="col-sm-4 col-form-label d-flex justify-content-end"
  >
    Unlimited:
  </label>
  <div className="col-sm-6">
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        name="unlimited"
        checked={toggleStates.unlimited}
        onChange={() => handleToggle("unlimited")}
        role="switch"
        id="flexSwitchCheckDefault"
      />
    </div>
  </div>
</div> */}




    

          <h5 className="m-2 text-center">Concurrency Settings</h5>
          <div className="row mb-3">
            <label
              htmlFor="inputEmail"
              className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
            >
              Max Concurrency :
            </label>
            <div className="col-sm-6">
              <div className="form-check form-switch ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="max"
                  onChange={(e) => {
                    handleToggleMax(); // Handle checkbox state
                    onEditChange("max", e.target.checked); // Handle associated value
                  }}
                  // onChange={handleToggleMax}
                  checked={editValues.max}
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                {editValues.max && (
                  <>
                    <input
                      type="number"
                      id="typeNumber"
                      name="maxInput"
                      value={editValues.maxInput}
                      onChange={(e) => onEditChange("maxInput", e.target.value)}
                      class="form-control"
                      htmlFor="flexSwitchCheckDefault"
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
                value={editValues.duplicate}
                onChange={(e) => onEditChange("duplicate", e.target.value)}
              >
                <option value="0">Not Restricted</option>
                <option value="1">Target</option>
              </select>
            </div>
          </div>
                              {showSecondSelect && (
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
                                      value={editValues.restrictAfter}
                                      onChange={(e) => onEditChange("restrictAfter", e.target.value)}
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
                              )}

        </form>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTarget;
