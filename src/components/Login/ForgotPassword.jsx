import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CallPOSTAPI } from "../../helper/Constants";
import { BiArrowBack } from "react-icons/bi";
import vid from "./vid03.mp4"; 
import "./logi.scss";
import logo from "./gif01.gif";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

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
      const response = await CallPOSTAPI(`api/forgot-password`, formData);

      if (response?.data?.status) {
        toast.success("Email Sent Successfully");
        setFormData({ email: "" });
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
  };

  return (
    <div className={`main-wrapper ${isLoading ? "loading" : ""}`}>
      <main>
        <div className="custom-design-forget">
          <div className="video-background">
            <video autoPlay muted loop>
              <source src={vid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex justify-content-center py-4">
                      <a className="logo d-flex align-items-center w-auto">
                
                      </a>
                    </div>
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="pt-4 pb-2">
                        <img src={logo} alt="Logo" className="logo" /> 
                          <h5 className="card-title text-center pb-0 fs-4 mt-5">
                            Forgot Your Password?
                          </h5>
                        
                          <p className="text-center small">
                            Enter your email address and we will send you
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
                              {/* <span
                                className="input-group-text icon"
                                id="inputGroupPrepend"
                              >
                                @
                              </span> */}
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
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
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={isLoading} // Disable the button while loading
                            >
                              {isLoading ? "Continue in..." : "Continue"}{" "}
                              {/* Change button text based on loading state */}
                            </button>
                          </div>
                          <Link to="/">
                            <p className="flex items-center gap-x-2 text-richblack-5">
                              <BiArrowBack /> Back To Login
                            </p>
                          </Link>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      {isLoading && <div className="loading-spinner"></div>}{" "}
      {/* Loading spinner */}
    </div>
  );
};

export default Login;
