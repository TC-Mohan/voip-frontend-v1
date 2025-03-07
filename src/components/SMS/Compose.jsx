import React, { useState } from "react";
import axios from "axios";
import { BASE_API } from "../../helper/Constants";
function Compose() {
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [removedNumbers, setRemovedNumbers] = useState([]);

  const removeDuplicates = () => {
    // Get the entered phone numbers and convert them to an array
    const numbersArray = phoneNumbers.split("\n");

    // Remove duplicates using a Set and join back to a string
    const uniqueNumbers = [...new Set(numbersArray)].join("\n");

    // Find the removed numbers
    const removed = numbersArray.filter((num) => !uniqueNumbers.includes(num));

    // Update the state with unique numbers and set the removed numbers
    setPhoneNumbers(uniqueNumbers);
    setRemovedNumbers(removed);

    // Show alert
    alert(
      `Successfully removed ${removed.length} numbers: ${removed.join(", ")}`
    );
  };

  const [scheduleOption, setScheduleOption] = useState("No");

  const [formData, setFormData] = useState({
    smstype: "promotional",
    senderid: "hdtsms",
    smsencoding: "text",
    templateid: "BSP-DEMO",
    Number: [],
    selectsmsencoding: "",
    messagetext: "",
    selectscheduletime: "",
    selecttimezone: "Midway Island, Samoa",
    scheduledmessage: "yes",
    recuringjob: "no",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        
        (BASE_API +"api/create-compose"),
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

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Send Compose</li>
            </ol>
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong>Send Compose Sms</strong>
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
                      <div>
                        <div className="m-4">
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
                                htmlFor="phoneNumbers"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Enter Phone Numbers (Enter One Number Per Line.
                                Max 5000 Numbers) *
                              </label>
                              <div className="col-sm-6">
                                <textarea
                                  className="form-control w-100"
                                  rows="5"
                                  id="phoneNumbers"
                                  name="Number"
                                  value={formData.Number}
                                  onChange={handleInputChange}
                                ></textarea>
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
                                  onClick={removeDuplicates}
                                  class="btn btn-primary"
                                >
                                  Remove Duplicate
                                </button>
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

export default Compose;
