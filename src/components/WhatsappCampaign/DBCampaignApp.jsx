import React, { useState } from "react";

function DBCampaignApp() {
  const [selectedImage, setSelectedImage] = useState(
    `${process.env.PUBLIC_URL}/assets/img/imageWhatsapp.png`
  );

  const handleImageChange = (event) => {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  };
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashbord</a>
              </li>
              <li className="breadcrumb-item active">DB Campaign</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body py-4">
              <div style={{ textAlign: "left" }}></div>
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
                                Campaign Name :
                              </label>

                              <div className="col-sm-6">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                                id="title3"
                                htmlFor="Field3"
                              >
                                Number :
                              </label>
                              <div className="col-sm-6">
                                <textarea
                                  className="form-control"
                                  rows="5"
                                ></textarea>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Message
                              </label>
                              <div
                                className="col-sm-6"
                                style={{ textAlign: "left" }}
                              >
                                <textarea
                                  className="form-control"
                                  rows="5"
                                ></textarea>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Upload Image (max file size 1MB)
                              </label>
                              <div className="col-sm-6">
                                <div className="mb-4 d-flex justify-content-start">
                                  <img
                                    id="selectedImage"
                                    src={selectedImage}
                                    alt="example placeholder"
                                    style={{ width: "200px" }}
                                  />
                                </div>
                                <div className="d-flex justify-content-start">
                                  <div className="btn btn-primary btn-rounded">
                                    <label
                                      className="form-label text-white m-1"
                                      htmlFor="customFile1"
                                    >
                                      Choose file
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control d-none"
                                      id="customFile1"
                                      onChange={handleImageChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                PDF Image
                              </label>
                              <div className="col-sm-6">
                                <div>
                                  <label
                                    htmlFor="formFile"
                                    className="form-label"
                                  >
                                    (max file size 1MB)
                                  </label>
                                  <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row mb-3">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                              >
                                Video
                              </label>
                              <div className="col-sm-6">
                                <div>
                                  <label
                                    htmlFor="formFile"
                                    className="form-label"
                                  >
                                    {" "}
                                    (Max file size 3 MB.){" "}
                                  </label>
                                  <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12 text-end">
                                <button type="button" class="btn btn-primary">
                                  Send Massage
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

export default DBCampaignApp;
