import React, { useState } from "react";
import axios from "axios";
import { BASE_API } from "../../helper/Constants";
function BulkSchedlingsms() {
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
    timeZone: "UTC",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, selectedFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        (BASE_API+"api/create-bulkschedule"),
        formData
      );

      // Handle the response as needed
      // console.log(response.data);
      setFormData({
        smstype: "Promotional",
        senderid: "HDTSMS",
        smsencoding: "Text",
        phoneNumberPrefix: [],
        selectedFile: null,
        templateid: "BSP-DEMO",
        excelColumns: "No Options",
        selectsmsencoding: "",
        messagetext: "",
        timeZone: "UTC",
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
              <li className="breadcrumb-item active">Bulk Scheduling SMS</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body">
              <h3 className="mt-3">
                <strong>Bulk Scheduling SMS</strong>
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
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Enter Phone Number Prefix(Optional) :
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  className="form-control w-100"
                                  placeholder="Enter Phone Number Prefix(Optional)"
                                  name="phoneNumberPrefix"
                                  onChange={handleInputChange}
                                  value={formData.phoneNumberPrefix}
                                />
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
                                  class="btn "
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
                                  <option value="no Optins">No Options</option>
                                  <option value="rows">rows</option>
                                  <option value="Columns">Columns</option>
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
                                  class="form-control w-100"
                                  rows="5"
                                  name="messagetext"
                                  onChange={handleInputChange}
                                  value={formData.messagetext}
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
                                htmlFor="inputTimeZone"
                                className="col-sm-4 col-form-label d-flex justify-content-end"
                              >
                                Select Time Zone *
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="timeZone"
                                  onChange={handleInputChange}
                                  value={formData.timeZone}
                                >
                                  <option value="UTC">UTC</option>
                                  <option value="GMT">GMT</option>
                                  <option value="EST">EST</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12 text-end">
                                <button
                                  type="button"
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

export default BulkSchedlingsms;
