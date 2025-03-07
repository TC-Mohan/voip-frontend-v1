import React, { useState, useRef } from "react";
import UploadImageModal from "./models/UploadImageModal";
import { CallPOSTAPI, CallPostFileUpload, postData } from "../helper/Constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CallGETAPI } from "../helper/Constants";
import { useEffect } from "react";

import OverViewProfile from "./OverViewProfile";

const AddProfile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadModal, setUploadModal] = useState(false);

  const [finalImage, setFinalImage] = useState({
    url: "/upload.png",
    bytes: "",
  });
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    about: "",
    company: "",
    job: "",
    country: "",
    address: "",
    phone: "",
    email: "",
    twitter_profile: "",
    facebook_profile: "",
    instagram_profile: "",
    linkedin_profile: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitted(true);

      const invalidField = getFirstInvalidField();
      if (invalidField) {
        invalidField.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      var formData1 = new FormData();

      // Check if finalImage is present
      if (finalImage.bytes) {
        formData1.append("profile_pic", finalImage.bytes);
      } else {
        // If finalImage is not present, append existing image from formData
        if (formData.profile_pic) {
          // Append existing image from formData
          formData1.append("profile_pic", formData.profile_pic);
        }
      }

      // Append other form data
      formData1.append("first_name", formData.first_name);
      formData1.append("last_name", formData.last_name);
      formData1.append("about", formData?.about || "");
      formData1.append("company", formData?.company || "");
      formData1.append("job", formData?.job || "");
      formData1.append("country", formData?.country || "");
      formData1.append("address", formData?.address || "");
      formData1.append("phone", formData?.phone || "");
      formData1.append("twitter_profile", formData?.twitter_profile || "");
      formData1.append("facebook_profile", formData?.facebook_profile || "");
      formData1.append("instagram_profile", formData?.instagram_profile || "");
      formData1.append("linkedin_profile", formData?.linkedin_profile || "");

      setIsLoading(true);
      const response = await CallPostFileUpload(
        `api/add-user-profile`,
        formData1
      );
      if (response.status) {
        // if (finalImage.bytes) {
        //   setFinalImage({ url: "/upload.png", bytes: "" });
        // }
        toast.success("Data saved Successful");
      } else {
        toast.error("Failed to save data.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFirstInvalidField = () => {
    const fieldsToCheck = ["first_name", "last_name"]; // Add other fields to check if needed

    for (const field of fieldsToCheck) {
      if (!formData[field]) {
        return formRef.current.querySelector(`#${field}`);
      }
    }

    return null;
  };

  const validateField = (fieldName) => {
    if (isSubmitted && !formData[fieldName]) {
      return "This field is required";
    }
    return "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const handleUpload = (e) => {
  //   if (e.target.files) {
  //     let file = e.target.files[0];
  //     // console.log("files array in upload", files);

  //     if (files.length > 3) {
  //       setErrorMessage("You can only upload up to 4 images.");
  //       return;
  //     } else {
  //       if (
  //         file.type === "image/png" ||
  //         file.type === "image/jpg" ||
  //         file.type === "image/jpeg"
  //       ) {
  //         setErrorMessage("");
  //         setFinalImage({
  //           url: URL.createObjectURL(e.target.files[0]),
  //           bytes: e.target.files[0],
  //         });
  //         // setFormData({
  //         //   ...formData,
  //         //   profile_pic: URL.createObjectURL(e.target.files[0]),
  //         // });
  //         setUploadModal(true);
  //       } else {
  //         alert("Please select an image file.");
  //         return;
  //       }
  //     }
  //   }
  // };

  const [isdata, setisdata] = useState({});

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CallGETAPI("api/get-user-profile");
      // console.log("Data from API:", response.data.data);
      const result = response.data.data;
      setisdata(result);
      setFinalImage({
        url: result.profile_pic,
        bytes: "",
      });
      setFormData({
        first_name: result.first_name,
        last_name: result.last_name,
        about: result.about,
        company: result.company,
        job: result.job,
        country: result.country,
        address: result.address,
        phone: result.phone,
        email: result.email,
        twitter_profile: result.twitter_profile,
        facebook_profile: result.facebook_profile,
        instagram_profile: result.instagram_profile,
        linkedin_profile: result.linkedin_profile,
      });
      // console.log(isdata);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    // console.log({ uploadedFile });
    if (!uploadedFile) {
      setFinalImage({
        url: "",
        bytes: "",
      });
      return "";
    }
    // Check if uploadedFile is a Blob or File object
    if (!uploadedFile instanceof Blob) {
      console.error("Selected file is not a Blob or File object.");
      return;
    }

    // Check if URL.createObjectURL is supported by the browser
    if (typeof URL.createObjectURL !== "function") {
      console.error("URL.createObjectURL is not supported by this browser.");
      return;
    }

    // Create object URL and set final image
    setFinalImage({
      url: URL.createObjectURL(uploadedFile),
      bytes: uploadedFile,
    });
  };

  return (
    <>
      {/* <UploadImageModal
        isModalOpen={uploadModal}
        setIsModalOpen={setUploadModal}
        thumbnail={finalImage}
        setFinalThumbnail={setFiles}
      /> */}
      <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} ref={formRef}>
          {/* <div className="row mb-3">
            <label
              htmlFor="profileImage"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Profile Image
            </label>
            <div className="col-md-8 col-lg-9">
              <img
                src={finalImage.url || "assets/img/profile-img.jpg"}
                alt="Profile"
              />
              <div className="pt-2">
                <label
                  htmlFor="uploadBtn"
                  className="btn btn-primary btn-sm me-2"
                  style={{ color: "white" }}
                  title="Upload new profile image"
                >
                  <i className="bi bi-upload"></i> Upload
                  <input
                    type="file"
                    id="uploadBtn"
                    className="d-none"
                    onChange={handleUpload}
                  />
                </label>
                <a
                  href="#"
                  className="btn btn-danger btn-sm"
                  title="Remove my profile image"
                >
                  <i className="bi bi-trash" />
                </a>
              </div>
            </div>
          </div> */}
          <div className="row mb-3">
            <label
              htmlFor="first_name"
              className="col-md-4 col-lg-3 col-form-label"
            >
              First Name
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="first_name"
                type="text"
                className={`form-control ${
                  validateField("first_name") ? "is-invalid" : ""
                }`}
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              {/* Validation message */}
              {validateField("first_name") && (
                <div className="invalid-feedback">
                  {validateField("first_name")}
                </div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="last_name"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Last Name
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="last_name"
                type="text"
                className={`form-control ${
                  validateField("last_name") ? "is-invalid" : ""
                }`}
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              {/* Validation message */}
              {validateField("last_name") && (
                <div className="invalid-feedback">
                  {validateField("last_name")}
                </div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">
              About
            </label>
            <div className="col-md-8 col-lg-9">
              <textarea
                name="about"
                className="form-control"
                id="about"
                style={{ height: "100px" }}
                value={formData.about}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="company"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Company
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="company"
                type="text"
                className="form-control"
                id="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">
              Job
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="job"
                type="text"
                className="form-control"
                id="Job"
                value={formData.job}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="Country"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Country
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="country"
                type="text"
                className="form-control"
                id="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="Address"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Address
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="address"
                type="text"
                className="form-control"
                id="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">
              Phone
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="phone"
                type="number"
                className="form-control"
                id="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">
              Email
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="email"
                type="email"
                className="form-control"
                id="Email"
                value={formData.email}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="Twitter"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Twitter Profile
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="twitter_profile"
                type="text"
                className="form-control"
                id="Twitter"
                value={formData.twitter_profile}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="Facebook"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Facebook Profile
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="facebook_profile"
                type="text"
                className="form-control"
                id="Facebook"
                value={formData.facebook_profile}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="instagram_profile"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Instagram Profile
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="instagram_profile"
                type="text"
                className="form-control"
                id="Instagram"
                value={formData.instagram_profile}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="Linkedin"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Linkedin Profile
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="linkedin_profile"
                type="text"
                className="form-control"
                id="Linkedin"
                value={formData.linkedin_profile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
        {/* End Profile Edit Form */}
      </div>
    </>
  );
};

export default AddProfile;
