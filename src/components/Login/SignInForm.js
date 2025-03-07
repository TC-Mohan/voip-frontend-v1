import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useAuth } from "../AuthRouter/AuthContext";
import { CallPOSTAPI, CallGETAPI } from "../../helper/Constants";

const SignInForm = () => {
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
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [internalIP, setInternalIP] = useState('');

  useEffect(() => {
    const getLocalIP = async () => {
      try {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });
        pc.createDataChannel('');
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        pc.onicecandidate = (event) => {
          if (event && event.candidate) {
            const candidate = event.candidate.candidate;
            const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
            const ipMatch = candidate.match(ipRegex);
            if (ipMatch) {
              setInternalIP(ipMatch[0]);
              pc.close();
            }
          }
        };
      } catch (error) {
        console.error("Error getting local IP:", error);
        setInternalIP('Unable to detect');
      }
    };
    getLocalIP();
  }, []);



  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };


  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required !";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid !";
    }

    if (!password.trim()) {
      errors.password = "Password is required !";
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
  
    setIsLoading(true);
  
    try {
      let url = window.location.origin; // Current URL of the frontend
  
      const response = await CallPOSTAPI("api/login", { ...formData, url, internalIP, userAgent: navigator.userAgent });
  
      // Check if the response is valid and contains a successful login status
      if (response?.status && response.data?.status) {
        let token = response.data.token;
        localStorage.setItem("psx_token", token);
        const userType = response.data.user_type;
        localStorage.setItem("user_type", userType.toString());
        let destination = "/";
        
        switch (userType) {
          case 1:
            destination = "/admin-dashboard";
            break;
          case 2:
            destination = "/dashboard";
            break;
          case 3:
            destination = "/calls";
            break;
          case 4:
            destination = "/dashboard";
            break;
          default:
            toast.error("Invalid user type, please contact admin.");
            localStorage.removeItem("psx_token");
            localStorage.removeItem("user_type");
            return;
        }
  
        // Display success message upon successful login
        toast.success("Login Successful!");
  
        // Call the next API and redirect
        await CallGETAPI("api/connect");
        window.location.href = destination;
      } else {
        // Use the error message from the response directly
        const errorMessage = response?.data?.message || "Invalid credentials. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("psx_token");
    const userType = localStorage.getItem("user_type");
    
    if (token && userType) {
      let destination = "/";
      switch (Number(userType)) {
        case 1:
          destination = "/admin-dashboard";
          break;
        case 2:
          destination = "/dashboard";
          break;
        case 3:
          destination = "/calls";
          break;
        case 4:
          destination = "/dashboard";
          break;
      }
      window.location.href = destination;
    }
  }, []);

  

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

  const handleRememberChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
    setRemember(e.target.checked);
  };

  return (
    <div className="custom-design">
      {" "}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
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
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className={`${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email}</div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              // className={`form-control ${errors.password ? "is-invalid" : ""}`}
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
          <div className="invalid-feedback">{errors.password}</div>
          {/* <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={handleRememberChange}
            id="rememberMe"
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div> */}
          <Link to="/forget_password">Forgot your password?</Link>
          <button disabled={isLoading}>
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>
        {isLoading && <div className="loading-spinner"></div>}
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

export default SignInForm;
