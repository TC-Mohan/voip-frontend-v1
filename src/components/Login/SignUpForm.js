
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { BASE_API } from "../../helper/Constants";

function SignUpForm() {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repassword: "",
    termsChecked: false,
    user_type: 2,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showrepassword, setShowrepassword] = useState(false);
  const navigate = useNavigate();

  const handlerepasswordToggle = () => {
    setShowrepassword((prev) => !prev);
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // const handleChange = (evt) => {
  //   const value =
  //     evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
  //   setState({
  //     ...state,
  //     [evt.target.name]: value,
  //   });
  // };

  const validateForm = () => {
    const errors = {};

    if (!state.first_name.trim()) {
      errors.first_name = "First Name is required !";
    } else if (!/^[a-zA-Z\s]+$/.test(state.first_name.trim())) {
      errors.first_name = "First Name can only contain alphabetic characters !";
    }

    if (!state.last_name.trim()) {
      errors.last_name = "Last Name is required !";
    } else if (!/^[a-zA-Z\s]+$/.test(state.last_name.trim())) {
      errors.last_name = "Last Name can only contain alphabetic characters !";
    }

    if (!state.email.trim()) {
      errors.email = "Email is required !";
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = "Email address is invalid !";
    }

    if (!state.password.trim()) {
      errors.password = "Password is required !";
    } else if (state.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters long !";
    } else if (!/(?=.*[A-Z])/.test(state.password)) {
      errors.password = "Password must contain at least one uppercase letter !";
    } else if (!/(?=.*\d)/.test(state.password)) {
      errors.password = "Password must contain at least one numeric character !";
    } else if (!/(?=.*[!@#$%^&*])/.test(state.password)) {
      errors.password = "Password must contain at least one special character !";
    }

    if (!state.repassword.trim()) {
      errors.repassword = "Please re-enter your password";
    } else if (state.password !== state.repassword) {
      errors.repassword = "Passwords do not match";
    }

    // if (!state.termsChecked) {
    //   errors.terms = "You must agree to the terms and conditions";
    // }

    return errors;
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_API}api/create-user-v2`,
        {
          first_name: state.first_name,
          last_name: state.last_name,
          email: state.email,
          password: state.password,
          repassword: state.repassword,
          user_type:state.user_type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast.success("Register Successful");
        setState({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          repassword: "",
          termsChecked: false,
          user_type: 2,
        });
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

  const handleEmailChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
  };

  const handlePasswordChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
  };

  const handlerepasswordChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      repassword: "",
    }));
  };

  const handlefirst_nameChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      first_name: "",
    }));
  };

  const handlelast_nameChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      last_name: "",
    }));
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h2>Create Account</h2>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>

        <input
          type="text"
          name="first_name"
          value={state.first_name}
          onChange={handlefirst_nameChange}
          placeholder="First Name"
          className={errors.first_name ? "is-invalid" : ""}
        />
        <div className="invalid-feedback d-flex">{errors.first_name}</div>
        <input
          type="text"
          name="last_name"
          value={state.last_name}
          onChange={handlelast_nameChange}
          placeholder="Last Name"
          className={errors.last_name ? "is-invalid" : ""}
        />

        <div className="invalid-feedback d-flex">{errors.last_name}</div>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleEmailChange}
          placeholder="Email"
          className={`${errors.email ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback d-flex">{errors.email}</div>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={state.password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="form-control "
          />
          <span
            className="input-group-text"
            onClick={handlePasswordToggle}
            style={{ cursor: "pointer", margin: "8px -3px" }}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        </div>
        <div className="invalid-feedback d-flex">{errors.password}</div>

        <div className="input-group">
          <input
            type={showrepassword ? "text" : "password"}
            name="repassword"
            value={state.repassword}
            onChange={handlerepasswordChange}
            placeholder="Re-enter Password"
            className="form-control "
          />
          <span
            className="input-group-text"
            onClick={handlerepasswordToggle}
            style={{ cursor: "pointer", margin: "8px -3px" }}
          >
            <FontAwesomeIcon icon={showrepassword ? faEye : faEyeSlash} />
          </span>
          <div className="invalid-feedback d-flex">{errors.repassword}</div>
        </div>
        {/* <div className="form-check">
          <input
            className="form-check-input"
            name="termsChecked"
            type="checkbox"
            checked={state.termsChecked}
            onChange={handleChange}
            id="acceptTerms"
            required
          />
          <label className="form-check-label" htmlFor="acceptTerms">
            I agree and accept the <a href="#">terms and conditions</a>
          </label>
          <div className="invalid-feedback d-flex">{errors.terms}</div>
        </div> */}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
