import React, { useState, useEffect } from "react";
import { DecryptToken } from "../helper/Constants";
import Editpassword from "./Editpassword";
import AddProfile from "./AddProfile";
import OverViewProfile from "./OverViewProfile";
import UpdateProfile from "./UpdateProfile";
import { CallGETAPI } from "../helper/Constants";
const UserProfile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isdata, setisdata] = useState({});

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const userToken = localStorage.getItem("psx_token");
        const decodedToken = DecryptToken(userToken);

        if (decodedToken) {
          setUserEmail(decodedToken.email);
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CallGETAPI("api/get-user-profile");
      // console.log("Data from API:", response.data.data);
      const result = response.data.data;
      setisdata(result);
      // console.log(isdata);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Profile</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">Users</li>
            <li className="breadcrumb-item active">Profile</li>
          </ol>
        </nav>
      </div>
      {/* End Page Title */}
      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                {/* <img
                  src={`${isdata.profile_pic}`}
                  alt="Profile"
                  className="rounded-circle"
                /> */}
                {/* <h2>Kevin Anderson</h2> */}
                {userEmail && (
                  <span className="d-none d-md-block ">
                    {/* <FaUserCircle style={{ marginRight: "5px" }} /> */}
                    <span>{`${isdata.email}`}</span>
                  </span>
                )}
                <h3>{isdata.job}</h3>
                <div className="social-links mt-2">
                  <a href="#" className="twitter">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#" className="facebook">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#" className="instagram">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#" className="linkedin">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                {/* Bordered Tabs */}
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                    >
                      Add Profile
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-settings"
                    >
                      Settings
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-change-password"
                    >
                      Change Password
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#update-your-account"
                    >
                      Update Your Account
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  <OverViewProfile />

                  <AddProfile />

                  <div className="tab-pane fade pt-3" id="profile-settings">
                    {/* Settings Form */}
                    <form>
                      <div className="row mb-3">
                        <label
                          htmlFor="fullName"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Email Notifications
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="changesMade"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="changesMade"
                            >
                              Changes made to your account
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="newProducts"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="newProducts"
                            >
                              Information on new products and services
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="proOffers"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="proOffers"
                            >
                              Marketing and promo offers
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="securityNotify"
                              defaultChecked
                              disabled
                            />
                            <label
                              className="form-check-label"
                              htmlFor="secnpmurityNotify"
                            >
                              Security alerts
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                    {/* End settings Form */}
                  </div>
                  <Editpassword />

                  <UpdateProfile />
                </div>
                {/* End Bordered Tabs */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserProfile;
