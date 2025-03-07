import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
 import axios from "axios";
import { useAuth } from "./AuthRouter/AuthContext";
import { CallPOSTAPI, CallGETAPI } from "../helper/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }
    // if (!remember.trim()) {
    //   errors.remember = "You must agree to remember me";
    // }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsLoading(true); // Set loading to true when form is submitted

    try {
      const response = await CallPOSTAPI(
        "api/login",
        formData
      );

      // console.log("Response Data:", response.data);

      if (response?.data?.status) {
        let token = response?.data?.token;
        localStorage.setItem("psx_token", token);
        toast.success("Login Successful");
        await CallGETAPI("api/connect");
        login();
        navigate("/dashboard");
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

  const handleEmailChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
  };

/////
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
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your username &amp; password to login
                        </p>
                      </div>
                      <form
                        className="row g-3 needs-validation"
                        noValidate
                        onSubmit={handleSubmit}
                      >
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Username
                          </label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              @
                            </span>
                            <input
                              type="email"
                              name="email"
                              value={email}
                              onChange={handleEmailChange}
                              className={`form-control ${
                                errors.email ? "is-invalid" : ""
                              }`}
                              id="yourEmail"
                              required
                            />
                            <div className="invalid-feedback d-flex">
                              {errors.email}
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Password
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
                        </div>
                        <div className="row mt-2 ">
                          <div className="col-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="remember"
                                // checked={remember}
                                // onChange={handleRememberChange}
                                id="rememberMe"
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                              >
                                Remember me
                              </label>
                              {/* <div className="invalid-feedback d-flex">
                              {errors.remember && (
                                <div className="text-danger">
                                  {errors.remember}
                                </div>
                              )}
                            </div> */}
                            </div>
                          </div>

                          <div className="col-6 w-50 ">
                            <Link to="/forget_password">Forget Password</Link>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isLoading} // Disable the button while loading
                          >
                            {isLoading ? "Logging in..." : "Login"}{" "}
                            {/* Change button text based on loading state */}
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Don't have account?{" "}
                            <p>
                              Don't have an account?{" "}
                              <Link to="/register">Register</Link>
                            </p>
                          </p>
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

export default Login;
