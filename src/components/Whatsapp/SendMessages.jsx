import React, { useState } from "react";
import InputEmoji from "react-input-emoji";

function SendMessages() {
  const [text, setText] = useState("");
  function handleOnEnter(text) {
    // console.log("enter", text);
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [selectedOption, setSelectedOption] = useState('text');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
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
              <li className="breadcrumb-item active">SendMessages</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body py-4">
              <div style={{ textAlign: "left" }}>
                <p>
                  Send Broadcast Messages To Any Numbers Without Saving Number.
                </p>
                <strong className="text-danger">Note</strong>
                <ul className="list-group ">
                  <li className="list-group">
                    1 .Send Broadcast Messages Can Leads Your Number Blocking
                    Issue (If User Report). We Suggest Send Broadcast With Quick
                    Reply Button
                  </li>
                  <li className="list-group border-0">
                    2. When Do Broadcast Make Sure Your Targeted Number Is
                    Avaviable On Whatsapp (Filter Your Number Before Broadcast)
                  </li>
                </ul>
              </div>
              {/* Bordered Tabs Justified */}
              <div
                className="tab-content pt-2" npm
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
                      <div className="row">
                        <div className="mb-3 col-md-4 text-start">
                          {/* <label htmlFor="text" className="form-label"></label> */}
                          <h3><strong>Send Message</strong></h3>
                        </div>
                        <div className="mb-3 col-md-8 text-end">
                          <button type="button" class="btn btn-primary " > Download Sample</button>
                          <div className="btn btn-primary btn-rounded ms-2">
                            <label
                              className="form-label text-white m-1"
                              htmlFor="customFile1"
                            >
                              Bulk Upload
                            </label>
                            <input
                              type="file"
                              className="form-control d-none"
                              id="customFile1"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="m-4">
                          <form method="post">
                            <div className="row mb-3 ">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                              >
                                Template :
                              </label>

                              <div className="col-sm-6">
                                <select className="form-select">
                                  <option>New Message</option>
                                  <option>Tushar</option>
                                  <option>Deepak</option>
                                </select>
                                <div></div>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                                id="title3"
                                htmlFor="Field3"
                              >
                                Text :
                              </label>
                              <div className="col-sm-6">
                                <select className="form-select">
                                  <option>Text</option>
                                  <option>Text With Media</option>
                                  <option>Quick Reply Button</option>
                                  <option>Quick Reply Button With Media</option>
                                  <option>List/Menu</option>
                                  <option>Poll Message</option>
                                  <option>Poll Message With Media</option>
                                </select>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Phone Numbers*
                              </label>
                              <div className="col-sm-6">
                                <textarea className="form-control" rows="5" id="" name="text" placeholder="e.g 9876543210"></textarea>
                                <h6>Total Phone Number: 0</h6>
                                <h5>Note : Use "," to enter multiple number & number must be with country code</h5>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Message *
                              </label>
                              <div className="col-sm-6">
                                {/* <textarea
                                  className="form-control"
                                  rows="5"
                                  id=""
                                  name="text"
                                /> */}
                                <InputEmoji
                                  className="form-control border-0"
                                  rows={5}
                                  value={text}
                                  onChange={setText}
                                  cleanOnEnter
                                  onEnter={handleOnEnter}
                                  placeholder="Type a message"
                                />
                              </div>
                            </div>

                            <div className="row mb-4">
                              <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                Send Now *
                              </label>
                              <div className="col-sm-6">
                                <select className="form-select">
                                  <option>Yes</option>
                                  <option>No</option>
                                </select>
                              </div>
                            </div>


                            <div className="row">
                              <div className="col-sm-3 text-end">
                                <button
                                  type="button"
                                  class="btn btn-basic"
                                  data-bs-dismiss="modal"
                                >

                                </button>
                              </div>
                              <div className="col-sm-9 text-end">
                                <button type="button" class="btn btn-primary">
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

export default SendMessages;