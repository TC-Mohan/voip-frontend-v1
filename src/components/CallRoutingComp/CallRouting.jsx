import React from 'react'
import DataTable from 'react-data-table-component'
import { routingdata,routingcolumns } from '../EditCampaignData'
import { paginationConfig } from '../global/paginationUtils';

function CallRouting() {
    
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
  return (
    <>
        
        <div class="accordion-item">
                              <div>
                                <h2
                                  class="accordion-header"
                                  id="flush-headingTwo"
                                >
                                  <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseTwo"
                                  >
                                    Call Routing
                                  </button>
                                </h2>
                              </div>
                              <div></div>
                              <div
                                id="flush-collapseTwo"
                                class="accordion-collapse collapse"
                                aria-labelledby="flush-headingTwo"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div class="accordion-body">
                                  <div className="container ">
                                    <div className="row">
                                      <div className="col-lg-6">
                                        <div className="d-flex  justify-content-between">
                                          <h4>Targets</h4>
                                          <div className="col-6 d-flex justify-content-end ">
                                            <div className="d-grid col-6">
                                              <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#myModal"
                                              >
                                                Add Target
                                              </button>
                                              {/* add buyer */}
                                              <div
                                                className="modal"
                                                id="myModal"
                                              >
                                                <div className="modal-dialog modal-xl">
                                                  <div className="modal-content">
                                                    {/* Modal Header */}
                                                    <div className="modal-header">
                                                      <h4 className="modal-title">
                                                        Add Target
                                                      </h4>
                                                      <button
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="modal"
                                                      />
                                                    </div>
                                                    {/* Modal body */}
                                                    <div className="modal-body">
                                                      <div className="container-fluid">
                                                        <div className="row">
                                                          <div className="col-2"></div>
                                                          <div className="col-8">
                                                            <form
                                                              method="post"
                                                              onSubmit={
                                                                handleSubmit
                                                              }
                                                            >
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
                                                                    className={`form-control w-100 ${
                                                                      isNameValid
                                                                        ? ""
                                                                        : "is-invalid"
                                                                    }`}
                                                                    value={
                                                                      createTarget.name
                                                                    }
                                                                    onChange={
                                                                      handleNameChange
                                                                    }
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
                                                                    value={
                                                                      createTarget.buyer_id
                                                                    }
                                                                    onChange={
                                                                      handleChange
                                                                    }
                                                                    required
                                                                  >
                                                                    <option
                                                                      value=""
                                                                      disabled
                                                                    >
                                                                      Select a
                                                                      buyer
                                                                    </option>

                                                                    {buyersList &&
                                                                    buyersList.length >
                                                                      0 ? (
                                                                      buyersList.map(
                                                                        (
                                                                          buyer
                                                                        ) => (
                                                                          <option
                                                                            key={
                                                                              buyer.buyer_id
                                                                            }
                                                                            value={
                                                                              buyer.buyer_id
                                                                            }
                                                                          >
                                                                            {
                                                                              buyer.buyername
                                                                            }
                                                                          </option>
                                                                        )
                                                                      )
                                                                    ) : (
                                                                      <option value="">
                                                                        No
                                                                        buyers
                                                                        available
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
                                                                    className={`form-control w-100 ${
                                                                      isNumberValid
                                                                        ? ""
                                                                        : "is-invalid"
                                                                    }`}
                                                                    placeholder=""
                                                                    type="number"
                                                                    id="typeNumber"
                                                                    value={
                                                                      createTarget.number
                                                                    }
                                                                    onChange={
                                                                      handleNumberChange
                                                                    }
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
                                                                  Connection
                                                                  Timeout :
                                                                </label>
                                                                <div className="col-sm-6">
                                                                  <input
                                                                    type="time"
                                                                    className={`form-control w-100 ${
                                                                      isTimeoutValid
                                                                        ? ""
                                                                        : "is-invalid"
                                                                    }`}
                                                                    id="typeNumber"
                                                                    placeholder=""
                                                                    name="timeout"
                                                                    value={
                                                                      createTarget.timeout
                                                                    }
                                                                    onChange={
                                                                      handleTimeoutChange
                                                                    }
                                                                    required
                                                                  />
                                                                </div>
                                                              </div>

                                                              <div className="row mb-3">
                                                                <label
                                                                  htmlFor="inputEmail"
                                                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                                >
                                                                  Dial IVR
                                                                  Options :
                                                                </label>
                                                                <div className="col-sm-6">
                                                                  <select
                                                                    class="form-select w-100 "
                                                                    id="sel1"
                                                                    name="ivr"
                                                                    value={
                                                                      createTarget.ivr
                                                                    }
                                                                    onChange={
                                                                      handleIvrChange
                                                                    }
                                                                  >
                                                                    <option
                                                                      value=""
                                                                      disabled
                                                                    >
                                                                      None
                                                                    </option>
                                                                    <option>
                                                                      Greetings
                                                                      1
                                                                    </option>
                                                                    <option>
                                                                      Greetings
                                                                      2
                                                                    </option>
                                                                    <option>
                                                                      Greetings
                                                                      3
                                                                    </option>
                                                                    <option>
                                                                      {" "}
                                                                      Greetings
                                                                      4
                                                                    </option>
                                                                  </select>
                                                                </div>
                                                              </div>

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
                                      value={createTarget.recording}
                                      onChange={handleChange}
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </div>
                              </div> */}

                                                              <div className="">
                                                                <div className="row mb-3">
                                                                  <label className=" col-sm-4 col-form-label d-flex justify-content-end">
                                                                    Country *
                                                                  </label>
                                                                  <div className="col-sm-8 d-flex row">
                                                                    <select
                                                                      className="form-select w-75"
                                                                      value={
                                                                        selectedCountry
                                                                      }
                                                                      onChange={
                                                                        handleCountryChange
                                                                      }
                                                                    >
                                                                      <option value="">
                                                                        Select
                                                                        Country
                                                                      </option>
                                                                      {countries.map(
                                                                        (
                                                                          country
                                                                        ) => (
                                                                          <option
                                                                            key={
                                                                              country.isoCode
                                                                            }
                                                                            value={
                                                                              country.id
                                                                            }
                                                                          >
                                                                            {
                                                                              country.name
                                                                            }
                                                                          </option>
                                                                        )
                                                                      )}
                                                                    </select>

                                                                    {isCountryError && (
                                                                      <div
                                                                        className="col-sm-8 d-flex align-items-center justify-content-center error__feedback"
                                                                        style={{
                                                                          textAlign:
                                                                            "center",
                                                                          color:
                                                                            "red",
                                                                        }}
                                                                      >
                                                                        Country
                                                                        is
                                                                        required
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </div>

                                                              <div className="row mb-3">
                                                                <label
                                                                  htmlFor="inputEmail"
                                                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                                >
                                                                  Time Zone :
                                                                </label>
                                                                <div className="col-sm-6">
                                                                  <select
                                                                    class="form-select w-100 "
                                                                    id="sel1"
                                                                    name="timezone"
                                                                    value={
                                                                      createTarget.timezone
                                                                    }
                                                                    onChange={
                                                                      handleChange
                                                                    }
                                                                  >
                                                                    <blockquote>
                                                                      Select a
                                                                      timezone
                                                                    </blockquote>
                                                                    <div className="select-wrapper">
                                                                      <TimezoneSelect
                                                                        value={
                                                                          selectedTimezone
                                                                        }
                                                                        onChange={
                                                                          setSelectedTimezone
                                                                        }
                                                                      />
                                                                    </div>

                                                                    {/* <option value="" disabled>
                                      Select a timezone
                                    </option>
                                    <option>Asia/Kolkata</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    */}
                                                                  </select>
                                                                </div>
                                                              </div>

                                                              <div className="row mb-3">
                                                                <label
                                                                  htmlFor="inputEmail"
                                                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                                >
                                                                  Hours of
                                                                  operation :
                                                                </label>
                                                                <div className="col-sm-6">
                                                                  <div className="form-check form-switch">
                                                                    <input
                                                                      className="form-check-input"
                                                                      type="checkbox"
                                                                      name="operation"
                                                                      value={
                                                                        createTarget.operation
                                                                      }
                                                                      onChange={
                                                                        handleChange
                                                                      }
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
                                                                        value={
                                                                          createTarget.type
                                                                        }
                                                                        checked={
                                                                          !showBasicTable
                                                                        }
                                                                        onChange={
                                                                          handleCheckChange
                                                                        }
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
                                                                        value={
                                                                          createTarget.type
                                                                        }
                                                                        checked={
                                                                          showBasicTable
                                                                        }
                                                                        onChange={
                                                                          handleCheckChange
                                                                        }
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
                                                                                <td className="w-25">
                                                                                  Days
                                                                                </td>
                                                                                <td className="w-25">
                                                                                  Open
                                                                                </td>
                                                                                <td className="w-50">
                                                                                  Time
                                                                                  Slot
                                                                                </td>
                                                                              </tr>
                                                                              <tr className="border-bottom">
                                                                                <td scope="row">
                                                                                  Sunday
                                                                                </td>
                                                                                <td>
                                                                                  <div className="d-flex justify-content-around">
                                                                                    <div className="form-check form-switch ml-2">
                                                                                      <input
                                                                                        className="form-check-input"
                                                                                        type="checkbox"
                                                                                        name="recording"
                                                                                        value={
                                                                                          createTarget
                                                                                            .days
                                                                                            .day
                                                                                        }
                                                                                        onChange={
                                                                                          handleChange
                                                                                        }
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
                                                                                <td scope="row">
                                                                                  Monday
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
                                                                                        onChange={
                                                                                          handleChange
                                                                                        }
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
                                                                                <td scope="row">
                                                                                  Tuesday
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
                                                                                        onChange={
                                                                                          handleChange
                                                                                        }
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
                                                                                <td scope="row">
                                                                                  Wednesday
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
                                                                                        onChange={
                                                                                          handleChange
                                                                                        }
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
                                                                                <td scope="row">
                                                                                  Thursday
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
                                                                                        onChange={
                                                                                          handleChange
                                                                                        }
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
                                                                                <td scope="row">
                                                                                  Friday
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
                                                                                        onChange={
                                                                                          handleChange
                                                                                        }
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
                                                                                <td scope="row">
                                                                                  Saturday
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
                                                                                        onChange={
                                                                                          handleChange
                                                                                        }
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
                                                                                <td className="w-25">
                                                                                  Days
                                                                                </td>
                                                                                <td className="w-25">
                                                                                  Open
                                                                                </td>
                                                                                <td className="w-50">
                                                                                  Time
                                                                                  Slot
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
                                                                                        onChange={
                                                                                          handleChange
                                                                                        }
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

                                                              <h5 className="m-2">
                                                                Cap Settings
                                                              </h5>
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
                                                                      checked={
                                                                        createTarget.monthly
                                                                      }
                                                                      onChange={
                                                                        handleChange
                                                                      }
                                                                      id="flexSwitchCheckDefault"
                                                                    />
                                                                    {createTarget.monthly && (
                                                                      <>
                                                                        <input
                                                                          type="number"
                                                                          id="typeNumber"
                                                                          name="monthlyInput"
                                                                          value={
                                                                            createTarget.monthlyInput
                                                                          }
                                                                          onChange={
                                                                            handleChange
                                                                          }
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
                                                                      checked={
                                                                        createTarget.daily
                                                                      }
                                                                      onChange={
                                                                        handleChange
                                                                      }
                                                                      id="flexSwitchCheckDefault"
                                                                    />
                                                                    {createTarget.daily && (
                                                                      <>
                                                                        <input
                                                                          type="number"
                                                                          id="typeNumber"
                                                                          name="dailyInput"
                                                                          value={
                                                                            createTarget.dailyInput
                                                                          }
                                                                          onChange={
                                                                            handleChange
                                                                          }
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
                                                                      checked={
                                                                        createTarget.hourly
                                                                      }
                                                                      onChange={
                                                                        handleChange
                                                                      }
                                                                      role="switch"
                                                                      id="flexSwitchCheckDefault"
                                                                    />
                                                                    {createTarget.hourly && (
                                                                      <>
                                                                        <input
                                                                          type="number"
                                                                          id="typeNumber"
                                                                          name="hourlyInput"
                                                                          value={
                                                                            createTarget.hourlyInput
                                                                          }
                                                                          onChange={
                                                                            handleChange
                                                                          }
                                                                          class="form-control"
                                                                          htmlFor="flexSwitchCheckDefault"
                                                                        />
                                                                      </>
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <h5 className="m-2">
                                                                Concurrency
                                                                Settings
                                                              </h5>
                                                              <div className="row mb-3">
                                                                <label
                                                                  htmlFor="inputEmail"
                                                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                                >
                                                                  max
                                                                  Concurrency :
                                                                </label>
                                                                <div className="col-sm-6">
                                                                  <div className="form-check form-switch ">
                                                                    <input
                                                                      className="form-check-input"
                                                                      type="checkbox"
                                                                      name="max"
                                                                      checked={
                                                                        createTarget.max
                                                                      }
                                                                      onChange={
                                                                        handleChange
                                                                      }
                                                                      role="switch"
                                                                      id="flexSwitchCheckDefault"
                                                                    />
                                                                    {createTarget.max && (
                                                                      <>
                                                                        <input
                                                                          type="number"
                                                                          id="typeNumber"
                                                                          value={
                                                                            createTarget.maxInput
                                                                          }
                                                                          name="maxInput"
                                                                          onChange={
                                                                            handleChange
                                                                          }
                                                                          className="form-control"
                                                                        />
                                                                      </>
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="row">
                                                                <div className="col-sm-6 "></div>
                                                                <div className="col-sm-6 d-flex justify-content-start ">
                                                                  <button
                                                                    type="submit"
                                                                    className="btn btn-success"
                                                                    data-bs-dismiss="modal"
                                                                  >
                                                                    Create
                                                                    Target
                                                                  </button>
                                                                </div>
                                                              </div>
                                                            </form>
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
                                        <div className="col-lg-12">
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
                                                  <div
                                                    className="card"
                                                    style={{
                                                      boxShadow: "none",
                                                    }}
                                                  >
                                                    <div
                                                      className="card-body"
                                                      style={{
                                                        padding: 0,
                                                        overflowX: "auto",
                                                      }}
                                                    >
                                                      <div className="main routing-tbl">
                                                      
                                                        <DataTable
                                                          columns={columns}
                                                          data={apiData || []}
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
                                                    </div>
                                                  </div>
                                                </div>
                                                {/* Repeat the above code for the other tabs */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-6">
                                        <h4 className="justify-content-start">
                                          Routing
                                          <div className="col-lg-12">
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
                                                    <div
                                                      className="card"
                                                      style={{
                                                        boxShadow: "none",
                                                      }}
                                                    >
                                                      <div
                                                        className="card-body"
                                                        style={{
                                                          padding: 0,
                                                          overflowX: "auto",
                                                        }}
                                                      >
                                                        <div className="main">
                                                          <DataTable
                                                            columns={
                                                              routingcolumns
                                                            }
                                                            data={
                                                              routingdata || []
                                                            }
                                                            noHeader
                                                            defaultSortField="id"
                                                            // sortIcon={<SortIcon />}
                                                            defaultSortAsc={
                                                              true
                                                            }
                                                            pagination
                                                            highlightOnHover
                                                            dense
                                                            customStyles={
                                                              tableCustomStyles
                                                            }
                                                            {...paginationConfig()}
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* Repeat the above code for the other tabs */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

    </>
  )
}

export default CallRouting