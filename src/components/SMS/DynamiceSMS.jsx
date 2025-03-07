import React, { useState } from "react";
import axios from "axios";
import { BASE_API } from "../../helper/Constants";
function DynamiceSMS() {
  const [scheduleOption, setScheduleOption] = useState("No");
  const [formData, setFormData] = useState({
    smstype: "Promotional",
    senderid: "HDTSMS",
    smsencoding: "Text",
    phoneNumberPrefix: [],
    selectedFile: null,
    templateid: "BSP-DEMO",
    excelColumns: "No Options",
    selectsmsencoding: "",
    messagetext: "",
    selecttimezone: "GMT-09:00) Alaska",
    selectscheduletime: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, selectedFile: e.target.files[0] });
  };

  const handleScheduleOptionChange = (e) => {
    setScheduleOption(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        (BASE_API+"api/create-dynamic"),
        formData
      );

      // Handle the response as needed
      // console.log(response.data);
      setFormData (
        {
          smstype: "Promotional",
          senderid: "HDTSMS",
          smsencoding: "Text",
          phoneNumberPrefix: [],
          selectedFile: null,
          templateid: "BSP-DEMO",
          excelColumns: "No Options",
          selectsmsencoding: "",
          messagetext: "",
          selecttimezone: "GMT-09:00) Alaska",
          selectscheduletime: "",
        });
    } catch (error) {
      // Handle error
      console.error("Error sending POST request:", error);
    }
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
              <li className="breadcrumb-item active">Dynamic SMS</li>
            </ol>
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body text-left">
              <h3 className="p-4">
                <strong>Dynamic SMS</strong>
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
                          <form method="post">
                            <div className="row mb-3 ">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                              >
                                SMS Type :
                              </label>

                              <div className="col-sm-6">
                                <select
                                  className="form-select w-100"
                                  name="smstype"
                                  onChange={handleInputChange}
                                  value={formData.smstype}
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
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Select SMS Encoding :
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select w-100"
                                  name="smsencoding"
                                  onChange={handleInputChange}
                                  value={formData.smsencoding}
                                >
                                  <option value="text">Text</option>
                                  <option value="unicode">Unicode</option>
                                  <option value="flash">Flash SMS</option>
                                  <option value="unicodeflash">
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
                                Enter Phone Number Prefix(Optional) :
                              </label>
                              <div className="col-sm-6">
                                <input
                                  className="form-control w-100"
                                  placeholder=""
                                  type="number"
                                  name="phoneNumberPrefix"
                                  onChange={handleInputChange}
                                  value={formData.phoneNumberPrefix}
                                ></input>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Upload Excel File*
                              </label>
                              <div className="col-sm-6 text-start">
                                <input
                                  type="file"
                                  class="btn"
                                  onChange={handleFileChange}
                                />
                                <p> No Selected File</p>
                                <h6>Accepted formats: xlsx, CSV</h6>
                                <a href="">
                                  <strong>
                                    <span style={{ color: "#198754" }}>
                                      Click Here To Download Sample File
                                    </span>
                                  </strong>
                                </a>
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
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Insert Excel Columns :
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="excelColumns"
                                  onChange={handleInputChange}
                                  value={formData.excelColumns}
                                >
                                  <option value="row">row</option>
                                  <option value="col">col</option>
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
                                  name="text"
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
                                  name="text"
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
                              ></label>
                              <div className="col-sm-6 text-start">
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#myModalPreview"
                                >
                                  View Preview
                                </button>
                                <div className="modal" id="myModalPreview">
                                  <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                      {/* Modal Header */}
                                      <div className="modal-header">
                                        <h4 className="modal-title">
                                          View Message Preview
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
                                            <div className="col-12">
                                              <form>
                                                <div className="row mb-4">
                                                  <label
                                                    htmlFor="inputEmail"
                                                    className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                  >
                                                    Message Text
                                                  </label>
                                                  <div className="col-sm-8">
                                                    <textarea
                                                      className="form-control"
                                                      rows="5"
                                                      id=""
                                                      name="text"
                                                      placeholder='{"status":500,"message":"Please select valid file."}'
                                                    ></textarea>
                                                  </div>
                                                </div>

                                                <div className="row">
                                                  <div className="col-sm-4 "></div>
                                                  <div className="col-sm-8 text-end">
                                                    <button
                                                      type="button"
                                                      class="btn btn-basic"
                                                      data-bs-dismiss="modal"
                                                    >
                                                      Close
                                                    </button>
                                                  </div>
                                                </div>
                                              </form>
                                            </div>
                                            <div className="col-2"></div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* Modal footer */}
                                      <div className="modal-footer"></div>
                                    </div>
                                  </div>
                                </div>
                                <span> </span>
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
                            <div className="row">
                              <div className="col-sm-3 "></div>
                              <div className="col-sm-8 text-end">
                                <button
                                  onClick={handleSubmit}
                                  class="btn btn-primary"
                                >
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

export default DynamiceSMS;
