import React, { useState } from "react";
import axios from "axios";
import { BASE_API } from "../../helper/Constants";
function DBCampaign() {
  const [scheduleOption, setScheduleOption] = useState("No");

  const [recurringOption, setRecurringOption] = useState("No");

  const [formData, setFormData] = useState({
    smstype: "",
    senderid: "",
    smsencoding: "",
    country: "",
    dbcampaign: "",
    startcampaigncount: "",
    endcampaigncount: "",
    templateid: "",
    Number: "",
    messagetext: "",
    scheduledmessage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        (BASE_API+"api/create-dbcampaign"),
        formData
      );

      // Handle the response as needed
      // console.log(response.data);
    } catch (error) {
      // Handle error
      console.error("Error sending POST request:", error);
    }
  };

  const handleScheduleOptionChange = (e) => {
    setScheduleOption(e.target.value);
  };

  const handleRecurringOptonChange = (e) => {
    setRecurringOption(e.target.value);
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">DB Campaign</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong>DB Campaign</strong>
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
                ></div>
                {/* Repeat the above code for the other tabs */}
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
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
                                SMS Type :
                              </label>

                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="smstype"
                                  value={formData.smstype}
                                  onChange={handleChange}
                                >
                                  <option value="promotional">
                                    Promotional
                                  </option>
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
                                Select Sender ID :
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="senderid"
                                  value={formData.senderid}
                                  onChange={handleChange}
                                >
                                  <option value="hdtsms">HDTSMS</option>
                                </select>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Select SMS Encoding :
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="smsencoding"
                                  value={formData.smsencoding}
                                  onChange={handleChange}
                                >
                                  <option value="text">Text</option>
                                  <option value="unicode">Unicode</option>
                                  <option value="flashsms">Flash SMS</option>
                                  <option value="unicodeflashsms">
                                    Unicode Flash SMS
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Select Country :
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="country"
                                  value={formData.country}
                                  onChange={handleChange}
                                >
                                  <option value="india">India</option>
                                  <option value="usa">USA</option>
                                  <option value="australia">Australia</option>
                                </select>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Select Db Campaign :
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="dbcampaign"
                                  value={formData.dbcampaign}
                                  onChange={handleChange}
                                >
                                  <option value="nooptions">No Options</option>
                                </select>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Start Campaign Count
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  className="form-control w-100"
                                  placeholder="Start Campaign Count"
                                  name="startcampaigncount"
                                  value={formData.startcampaigncount}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                End Campaign Count (Total Records : 0)
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  className="form-control w-100"
                                  placeholder="End Campaign Count (Total Records : 0)"
                                  name="endcampaigncount"
                                  value={formData.endcampaigncount}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Select Template :
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="templateid"
                                  value={formData.templateid}
                                  onChange={handleChange}
                                >
                                  <option value="bsp-demo">BSP-DEMO</option>
                                </select>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Test Before Sending Any Bulk (Enter One Number
                                Per Line Max. 10)- Optional
                              </label>
                              <div className="col-sm-6">
                                <textarea
                                  className="form-control w-100"
                                  rows="5"
                                  id=""
                                  name="Number"
                                  value={formData.Number}
                                  onChange={handleChange}
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
                                  Test Now
                                </button>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Enter Message Text *
                              </label>
                              <div className="col-sm-6">
                                <textarea
                                  className="form-control w-100"
                                  rows="5"
                                  id=""
                                  name="messagetext"
                                  value={formData.messagetext}
                                  onChange={handleChange}
                                ></textarea>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              ></label>
                              <div className="col-sm-6 text-start">
                                <ul class="">
                                  <li class="">Encoding: GSM_7BIT</li>
                                  <li class="">Length: 0</li>
                                  <li class="">Messages: 0</li>
                                  <li class="">Per Message: 160</li>
                                  <li class="">Remaining: 160</li>
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
                                      name="scheduledmessage"
                                      value={formData.scheduledmessage}
                                      onChange={handleChange}
                                    >
                                      <option value="midwayisland">
                                        (GMT-11:00) Midway Island, Samoa
                                      </option>
                                      <option value="alaska">
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
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                            <div className="row">
                              <div className="col-sm-3 "></div>
                              <div className="col-sm-8 text-end">
                                <button type="submit" class="btn btn-primary">
                                  Send SMS
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

export default DBCampaign;
