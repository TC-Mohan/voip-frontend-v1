import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_API, CallPOSTAPI } from "../helper/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
  });
  const [showrePassword, setShowrePassword] = useState({
    rePassword: false,
  });
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlerePasswordToggle = () => {
    setShowrePassword((prevState) => !prevState);
  };

  const validateForm = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = "First Name is required";
    } else if (!/^[a-zA-Z]+$/.test(firstName.trim())) {
      errors.firstName = "First Name can only contain alphabetic characters";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last Name is required";
    } else if (!/^[a-zA-Z]+$/.test(lastName.trim())) {
      errors.lastName = "Last Name can only contain alphabetic characters";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(password)) {
      errors.password = "Password must contain at least one numeric character";
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.password = "Password must contain at least one special character";
    }

    if (!rePassword.trim()) {
      errors.rePassword = "Please re-enter your password";
    } else if (password !== rePassword) {
      errors.rePassword = "Passwords does not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (!termsChecked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        terms: "You must agree to the terms and conditions",
      }));
      return;
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await CallPOSTAPI(
        `api/create-user`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          repassword: rePassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast.success("Register Successful");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      firstName: "",
    }));
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      lastName: "",
    }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      rePassword: "",
    }));
  };

  const handleTermsChange = (e) => {
    setTermsChecked(e.target.checked);
    setErrors((prevErrors) => ({
      ...prevErrors,
      terms: "", // Clear terms error when checkbox is checked
    }));
  };

  return (
    <>
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
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Create an Account
                        </h5>
                        <p className="text-center small">
                          Enter your personal details to create account
                        </p>
                      </div>
                      <form
                        className="row g-3 needs-validation"
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        <div className="col-6">
                          <label htmlFor="firstName" className="form-label">
                            First Name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            className={`form-control ${
                              errors.firstName ? "is-invalid" : ""
                            }`}
                            id="firstName"
                            required
                          />
                          <div className="invalid-feedback d-flex">
                            {errors.firstName}
                          </div>
                        </div>
                        <div className="col-6">
                          <label htmlFor="lastName" className="form-label">
                            Last Name<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              name="lastName"
                              value={lastName}
                              onChange={handleLastNameChange}
                              className={`form-control ${
                                errors.lastName ? "is-invalid" : ""
                              }`}
                              id="lastName"
                              required
                            />
                          </div>
                          <div className="invalid-feedback d-flex">
                            {errors.lastName}
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourEmail" className="form-label">
                            Email<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
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
                          </div>
                          <div className="invalid-feedback d-flex">
                            {errors.email}
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Password<span className="text-danger">*</span>
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
                          <label htmlFor="rePassword" className="form-label">
                            Re-enter Password
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <input
                              type={showrePassword ? "text" : "password"}
                              name="rePassword"
                              value={rePassword}
                              onChange={handleRePasswordChange}
                              className={`form-control ${
                                errors.rePassword ? "is-invalid" : ""
                              }`}
                              id="rePassword"
                              required
                            />
                            <span
                              className="input-group-text"
                              onClick={handlerePasswordToggle}
                              style={{ cursor: "pointer" }}
                            >
                              <FontAwesomeIcon
                                icon={showrePassword ? faEye : faEyeSlash}
                              />
                            </span>
                          </div>
                          <div className="invalid-feedback d-flex">
                            {errors.rePassword}
                          </div>
                        </div>
                        {/* Terms and Conditions Checkbox */}
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              name="terms"
                              type="checkbox"
                              checked={termsChecked}
                              onChange={handleTermsChange}
                              id="acceptTerms"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="acceptTerms"
                            >
                              I agree and accept the{" "}
                              <a href="#">terms and conditions</a>
                            </label>
                            <div className="invalid-feedback d-flex">
                              {errors.terms && (
                                <div className="text-danger">
                                  {errors.terms}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Loading..." : "Create Account"}
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Already have an account? <Link to="/">Log in</Link>
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
    </>
  );
}

export default Register;
