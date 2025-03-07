import React, { useState } from "react";
import { toast } from "react-toastify";
import { CallPOSTAPI } from "../helper/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Editpassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    renew: false,
  });

  const handlePasswordToggle = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!currentPassword.trim()) {
      errors.currentPassword = "Password is required !";
    }

    if (!newPassword.trim()) {
      errors.newPassword = "newPassword is required";
    } else if (newPassword.trim().length < 8) {
      errors.newPassword = "newPassword must be at least 8 characters long";
    } else if (!/(?=.*[A-Z])/.test(newPassword)) {
      errors.newPassword =
        "newPassword must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(newPassword)) {
      errors.newPassword =
        "newPassword must contain at least one numeric character";
    } else if (!/(?=.*[!@#$%^&*])/.test(newPassword)) {
      errors.newPassword =
        "newPassword must contain at least one special character";
    }

    if (!renewPassword.trim()) {
      errors.renewPassword = "Please re-enter your password !";
    } else if (newPassword !== renewPassword) {
      errors.renewPassword = "Passwords do not match !";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      setIsLoading(true);
      const response = await CallPOSTAPI("api/change-user-password", {
        current_password: currentPassword,
        new_password: newPassword,
        repassword: renewPassword,
      });

      if (response.status) {
        toast.success("Your Password Has been Updated");
        setCurrentPassword("");
        setNewPassword("");
        setRenewPassword("");
      } else {
        toast.error(response.message);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  const handlePasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      currentPassword: "",
    }));
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      newPassword: "",
    }));
  };

  const handleRePasswordChange = (e) => {
    setRenewPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      renewPassword: "",
    }));
  };

  return (
    <>
      <div className="tab-pane fade pt-3" id="profile-change-password">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label
              htmlFor="currentPassword"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Current Password
            </label>
            <div className="col-md-8 col-lg-9">
              <div className="input-group">
                <input
                  name="currentPassword"
                  type={showPassword.current ? "text" : "password"}
                  className={`form-control ${
                    errors.currentPassword ? "is-invalid" : ""
                  }`}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={handlePasswordChange}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePasswordToggle("current")}
                >
                  <FontAwesomeIcon
                    icon={showPassword.current ? faEye : faEyeSlash}
                  />
                </span>
                {errors.currentPassword && (
                  <div className="invalid-feedback" style={{ display: "flex" }}>
                    {errors.currentPassword}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="newPassword"
              className="col-md-4 col-lg-3 col-form-label"
            >
              New Password
            </label>
            <div className="col-md-8 col-lg-9">
              <div className="input-group">
                <input
                  name="newPassword"
                  type={showPassword.new ? "text" : "password"}
                  className={`form-control ${
                    errors.newPassword ? "is-invalid" : ""
                  }`}
                  id="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePasswordToggle("new")}
                >
                  <FontAwesomeIcon
                    icon={showPassword.new ? faEye : faEyeSlash}
                  />
                </span>
                {errors.newPassword && (
                  <div className="invalid-feedback" style={{ display: "flex" }}>
                    {errors.newPassword}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="renewPassword"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Re-enter New Password
            </label>
            <div className="col-md-8 col-lg-9">
              <div className="input-group">
                <input
                  name="renewPassword"
                  type={showPassword.renew ? "text" : "password"}
                  className={`form-control ${
                    errors.renewPassword ? "is-invalid" : ""
                  }`}
                  id="renewPassword"
                  value={renewPassword}
                  onChange={handleRePasswordChange}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePasswordToggle("renew")}
                >
                  <FontAwesomeIcon
                    icon={showPassword.renew ? faEye : faEyeSlash}
                  />
                </span>
                {errors.renewPassword && (
                  <div className="invalid-feedback" style={{ display: "flex" }}>
                    {errors.renewPassword}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error and success messages */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Edit..." : "Edit"}
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Editpassword;
