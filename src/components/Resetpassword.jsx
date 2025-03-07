import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
 import axios from "axios";
import { useAuth } from "./AuthRouter/AuthContext";
import { CallPOSTAPI } from "../helper/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Resetpassword = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handlePasswordChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const validateForm = () => {
    const errors = {};

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Password is required";
    }
    // if (!remember.trim()) {
    //   errors.remember = "You must agree to remember me";
    // }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password matching validation
    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: "Confirm Password does not match with Password",
      });
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true); // Set loading to true when form is submitted

    try {
      const response = await CallPOSTAPI(
        `api/resetpassword?token=${token}`,
        formData
      );
      console.log(response,"check data ")

      // console.log("Response Data:", response.data);

      if (response?.data?.status) {
        toast.success("Password Updated Successful");

        navigate("/");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false when request is completed
    }
  };

  return (
    <div className={`main-wrapper ${isLoading ? "loading" : ""}`}>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      // href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/icon.png" alt="Logo" />
                      <span className="d-none d-lg-block">
                        <span style={{ color: "#FF7F00" }}>Live </span>
                        <span style={{ color: "#0083BE" }}>PBX</span>
                      </span>
                    </a>
                  </div>
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Reset Your Password?
                        </h5>
                        <p className="text-center small">
                          Enter the New Password!
                        </p>
                      </div>
                      <form
                        className="row g-3 needs-validation"
                        noValidate
                        onSubmit={handleSubmit}
                      >
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            New Password
                          </label>
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={password}
                              onChange={handlePasswordChange}
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              id="yourPassword"
                              required
                            />
                            <span
                              className="input-group-text"
                              onClick={handlePasswordToggle}
                              style={{ cursor: "pointer" }}
                            >
                              <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                              />
                            </span>
                          </div>
                          <div className="invalid-feedback d-flex">
                            {errors.password}
                          </div>
                        </div>

                        <div className="col-12">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password
                          </label>
                          <div className="input-group">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={confirmPassword}
                              onChange={handlePasswordChange}
                              className={`form-control ${
                                errors.confirmPassword ? "is-invalid" : ""
                              }`}
                              id="confirmPassword"
                              required
                            />
                            <span
                              className="input-group-text"
                              onClick={handleConfirmPasswordToggle}
                              style={{ cursor: "pointer" }}
                            >
                              <FontAwesomeIcon
                                icon={showConfirmPassword ? faEye : faEyeSlash}
                              />
                            </span>
                          </div>
                          <div className="invalid-feedback d-flex">
                            {errors.confirmPassword}
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isLoading} // Disable the button while loading
                          >
                            {isLoading ? "Updating..." : "Update Password"}{" "}
                            {/* Change button text based on loading state */}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {isLoading && <div className="loading-spinner"></div>}{" "}
      {/* Loading spinner */}
    </div>
  );
};

export default Resetpassword;
