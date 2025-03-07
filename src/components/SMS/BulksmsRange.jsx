import React, { useState } from "react";
import axios from "axios";
import { BASE_API } from "../../helper/Constants";
function BulksmsRange() {
  const [scheduleOption, setScheduleOption] = useState("No");

  const [formData, setFormData] = useState({
    smstype: "promotional",
    senderid: "hdtsms",
    smsencoding: "text",
    startnumber: "",
    endnumber: "",
    templateid: "BSP-DEMO",
    messagetext: "",
    conatactlistid: "tushar",
    selectscheduletime: "",
    selecttimezone: "GMT-09:00) Alaska",
    selectsmsencoding: "",
    Number: [""],
    scheduledmessage: "yes",
    recuringjob: "no",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleScheduleOptionChange = (e) => {
    setScheduleOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const response = await axios.post(
        (BASE_API+"api/create-bulksmsrange"),
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Response:", response.data);
      // Add other success handling logic
    } catch (error) {
      console.error("Error submitting form:", error);
      // Add other error handling logic// console.log('Form Data:', formData);
      // console.log("Schedule Option:", scheduleOption);
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          {/* <h1>Create campaigns</h1> */}
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Bulk SMS</a>
              </li>
              <li className="breadcrumb-item active"></li>
            </ol>
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong>Send Bulk SMS Range</strong>
              </h3>

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
                    ></div>
                  </div>
                </div>
                {/* Repeat the above code for the other tabs */}
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid">
                    <div className="row">
                      <form onSubmit={(e) => e.preventDefault}>
                        <div className="row mb-3">
                          <label
                            className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                            htmlFor="Field3"
                          >
                            SMS Type:
                          </label>
                          <div className="col-sm-6">
                            <select
                              className="form-select w-100"
                              name="smstype"
                              onChange={handleInputChange}
                              value={formData.smstype}
                            >
                              <option value="promotional">Promotional</option>
                              <option value="transactional">
                                Transactional
                              </option>
                              <option value="otp">OTP</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                            id="title3"
                            htmlFor="Field3"
                          >
                            Select Sender ID*
                          </label>
                          <div className="col-sm-6">
                            <select
                              className="form-select w-100"
                              name="senderid"
                              onChange={handleInputChange}
                              value={formData.senderid}
                            >
                              <option value="hdtsms">HDTSMS</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="desc col-sm-4 col-form-label d-flex justify-content-end "
                            id="title3"
                            htmlFor="Field3"
                          >
                            Select SMS Encoding
                          </label>
                          <div className="col-sm-6">
                            <select
                              className="form-select w-100"
                              name="smsencoding"
                              onChange={handleInputChange}
                              value={formData.smsencoding}
                            >
                              <option value=" text">Text</option>
                              <option value=" unicode">Unicode</option>
                              <option value=" flash">Flash SMS</option>
                              <option value=" unicodeflash">
                                Unicode Flash SMS
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="desc col-sm-4 col-form-label d-flex justify-content-end "
                            id="title3"
                            htmlFor="Field3"
                          >
                            Select Contact List *
                          </label>
                          <div className="col-sm-6">
                            <select
                              className="form-select w-100"
                              name="conatactlistid"
                              onChange={handleInputChange}
                              value={formData.conatactlistid}
                            >
                              <option value="tushar">tushar</option>
                              <option value="tijdksf">guloeb</option>
                              <option value="sdfsa">depalip</option>
                              <option value="afdsafgdsd">anshil</option>
                            </select>
                            <label
                              className="desc col-sm-1 col-form-label d-flex justify-content-end "
                              id="title3"
                              htmlFor="Field3"
                            ></label>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="desc col-sm-4 col-form-label d-flex justify-content-end "
                            id="title3"
                            htmlFor="Field3"
                          >
                            Select Template
                          </label>
                          <div className="col-sm-6">
                            <select
                              className="form-select w-100"
                              name="templateid"
                              onChange={handleInputChange}
                              value={formData.templateid}
                            >
                              <option value="BSP-DEMO">BSP-DEMO</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            className="desc col-sm-4 col-form-label d-flex justify-content-end "
                            id="title3"
                            htmlFor="Field3"
                          >
                            Start Number
                          </label>
                          <div className="col-sm-6">
                            <input
                              className="form-control w-100"
                              placeholder=""
                              type="number"
                              name="startnumber"
                              onChange={handleInputChange}
                              value={formData.startnumber}
                            ></input>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            className="desc col-sm-4 col-form-label d-flex justify-content-end "
                            id="title3"
                            htmlFor="Field3"
                          >
                            End Number
                          </label>
                          <div className="col-sm-6">
                            <input
                              className="form-control w-100"
                              placeholder=""
                              type="number"
                              name="endnumber"
                              onChange={handleInputChange}
                              value={formData.endnumber}
                            ></input>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            className="desc col-sm-4 col-form-label d-flex justify-content-end "
                            id="title3"
                            htmlFor="Field3"
                          >
                            Select SMS Encoding
                          </label>
                          <div className="col-sm-6">
                            <textarea
                              class="form-control w-100"
                              rows="4"
                              name="selectsmsencoding"
                              onChange={handleInputChange}
                              value={formData.selectsmsencoding}
                            ></textarea>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="inputEmail"
                            className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                          ></label>
                          <div className="col-sm-6 text-start">
                            <button type="button" class="btn btn-primary">
                              Text Now
                            </button>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="desc col-sm-4 col-form-label d-flex justify-content-end "
                            id="title3"
                            htmlFor="Field3"
                          >
                            Enter Message Text*
                          </label>
                          <div className="col-sm-6">
                            <textarea
                              class="form-control w-100"
                              rows="5"
                              name="messagetext"
                              onChange={handleInputChange}
                              value={formData.messagetext}
                            ></textarea>
                          </div>
                        </div>
                        <div className="row mb-3 ml-3">
                          <div className=" col-sm-4"></div>
                          <div className="col-sm-6">
                            <ul style={{ textAlign: "left" }}>
                              <li>Encoding: GSM_7BIT_EX</li>
                              <li>Length: 75</li>
                              <li>Messages: 1</li>
                              <li>Per Message: 160</li>
                              <li>Remaining: 85</li>
                            </ul>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="inputEmail"
                            className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                          >
                            Schedule Message :
                          </label>
                          <div className="col-sm-6">
                            <select
                              className="form-select"
                              value={scheduleOption}
                              onChange={handleScheduleOptionChange}
                            >
                              <option value="no">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                        {scheduleOption === "Yes" && (
                          <>
                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Select Time Zone :
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="selecttimezone"
                                  onChange={handleInputChange}
                                  value={formData.selecttimezone}
                                >
                                  <option value="Midway Island, Samoa">
                                    (GMT-11:00) Midway Island, Samoa
                                  </option>
                                  <option value="GMT-09:00) Alaska">
                                    (GMT-09:00) Alaska
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Select Schedule Time :
                              </label>
                              <div className="col-sm-6">
                                <input
                                  className="form-select"
                                  type="date"
                                  name="selectscheduletime"
                                  onChange={handleInputChange}
                                  value={formData.selectscheduletime}
                                />
                              </div>
                            </div>
                          </>
                        )}
                        <div className=" d-flex justify-content-end">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            class="btn btn-primary"
                          >
                            Send SMS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Bordered Tabs Justified */}
            </div>
          </div>
        </section>
      </main>
      <footer id="footer" class="footer">
        <div class="copyright">
          &copy; Copyright 2023{" "}
          <strong>
            <span>Live PBX</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer>
    </>
  );
}

export default BulksmsRange;
