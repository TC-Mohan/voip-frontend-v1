import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";
import { CallGETAPI } from "../helper/Constants";
import CreateTargetForm from './CreateTargetForm';

const Links = ({ is_final = false }) => {
  const { linksDetails, setLinksDetails, next, prev } = useContext(MultiStepFormContext);
  const [selectedTargetID, setSelectedTargetID] = useState("");
  const [targetName, setTargetName] = useState([]);
  const [isTargetError, setIsTargetError] = useState(false);
  
  // Fetch target list on component mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await CallGETAPI("api/get-target");
      setTargetName(res?.data?.data?.targetsWithBuyers || []);
    };
    fetchData();
  }, []);

  const handleTargetCreated = (newTarget) => {
    // Refresh the target list after new target creation
    const fetchData = async () => {
      const res = await CallGETAPI("api/get-target");
      setTargetName(res?.data?.data?.targetsWithBuyers || []);
    };
    fetchData();
  };

  const handleOptionChange = (option, { setFieldValue }) => {
    setFieldValue("selectedOption", option);
    setLinksDetails((prevDetails) => ({
      ...prevDetails,
      selectedOption: option,
    }));
  };

  const handleChange = (e, { setFieldValue }) => {
    const { name } = e.target;
    const updatedValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFieldValue(name, updatedValue);
    setLinksDetails((prevDetails) => ({
      ...prevDetails,
      [name]: updatedValue,
    }));
  };

  return (
    <Formik
    initialValues={{
      selectedOption: linksDetails.selectedOption || "selectTarget",
      target_id: linksDetails.target_id || "",
      recordcalls: linksDetails.recordcalls || false,
      priority: linksDetails.priority || 0,
      weight: linksDetails.weight || "",
      status: linksDetails.status || "",
      waittoanswer: linksDetails.waittoanswer || false,
      trimsilence: linksDetails.trimsilence || false,
      targetdialattempts: linksDetails.targetdialattempts || "",
    }}
      onSubmit={async (values, { setSubmitting }) => {
        setLinksDetails({ ...values });
    
        if (!values.target_id && values.selectedOption === "selectTarget") {
          setIsTargetError(true);
          return;
        }
    
        next();
        setSubmitting(false);
      }}
      // validate={(values) => {
      //   const errors = {};
      //   if (!values.targetdialattempts) {
      //     errors.targetdialattempts = "Number is required";
      //   }
      //   return errors;
      // }}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <div className="details__wrapper">
          <div className="container-fluid d-flex justify-content-center mt-5">
            <div className="w-100">
              <div>
                {/* Target Option Selection */}
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <label className="desc col-form-label d-flex justify-content-end">
                      Target Option:
                    </label>
                  </div>
                  <div className="col-sm-6 btn-group">
                    <input
                      type="radio"
                      className="btn-check w-75"
                      name="selectTarget"
                      id="radio7"
                      autoComplete="off"
                      checked={values.selectedOption === "selectTarget"}
                      onChange={(e) => handleOptionChange("selectTarget", { setFieldValue })}
                    />
                    <label className="btn btn-outline-primary" htmlFor="radio7">
                      Target
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="createNew"
                      id="radio8"
                      autoComplete="off"
                      checked={values.selectedOption === "createNew"}
                      onChange={(e) => handleOptionChange("createNew", { setFieldValue })}
                    />
                    {/* <label className="btn btn-outline-primary" htmlFor="radio8">
                      Create New
                    </label> */}
                  </div>
                </div>

                {/* Conditional Rendering based on Option Selection */}
                {values.selectedOption === "createNew" ? (
                  <CreateTargetForm onSuccess={handleTargetCreated} />
                ) : values.selectedOption === "selectTarget" ? (
                  <div className="row mb-3">
                    <label className="desc col-sm-4 col-form-label d-flex justify-content-end">
                      Select target*
                    </label>
                    <div className="col-sm-6">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="target_id"
                        value={values.target_id}
                        onChange={(e) => {
                          setSelectedTargetID(e.target.value);
                          handleChange(e, { setFieldValue });
                          setIsTargetError(false);
                        }}
                        style={{
                          borderColor: isTargetError ? "red" : "#d9d9d9",
                        }}
                      >
                        <option value="" disabled>
                          Select Target
                        </option>
                        {targetName.map((item, index) => (
                          <option key={index} value={item.target_id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {isTargetError && (
                        <div className="error-message" style={{ color: "red", fontSize: "12px" }}>
                          Select Target is required
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Record Calls Switch */}
                <div className="row mb-3">
                  <label className="form-check-label col-sm-4 col-form-label d-flex justify-content-end">
                    Record Calls
                  </label>
                  <div className="col-sm-6">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckRecordCalls"
                        name="recordcalls"
                        checked={values.recordcalls}
                        onChange={(e) => handleChange(e, { setFieldValue })}
                      />
                    </div>
                  </div>
                </div>

                {/* Priority Field */}
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label d-flex justify-content-end">
                    Priority:
                  </label>
                  <div className="col-sm-6">
                    <Input
                      className="w-100"
                      type="number"
                      name="priority"
                      value={values.priority || 0}
                      onChange={(e) => handleChange(e, { setFieldValue })}
                    />
                  </div>
                </div>

                {/* Weight Field */}
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label d-flex justify-content-end">
                    Weight:
                  </label>
                  <div className="col-sm-6">
                    <Input
                      className="w-100"
                      type="number"
                      name="weight"
                      value={values.weight || ""}
                      onChange={(e) => handleChange(e, { setFieldValue })}
                    />
                  </div>
                </div>

                {/* Status Selection */}
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label d-flex justify-content-end">
                    Status:
                  </label>
                  <div className="col-sm-6">
                    <select
                      className="form-select"
                      name="status"
                      value={values.status || ""}
                      onChange={(e) => handleChange(e, { setFieldValue })}
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Wait To Answer Switch */}
                <div className="row mb-3">
                  <label className="form-check-label col-sm-4 col-form-label d-flex justify-content-end">
                    Wait To Answer
                  </label>
                  <div className="col-sm-6">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckWaitToAnswer"
                        name="waittoanswer"
                        checked={values.waittoanswer}
                        onChange={(e) => handleChange(e, { setFieldValue })}
                      />
                    </div>
                  </div>
                </div>

                {/* Trim Silence Switch */}
                <div className="row mb-3">
                  <label className="form-check-label col-sm-4 col-form-label d-flex justify-content-end">
                    Trim Silence
                  </label>
                  <div className="col-sm-6">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckTrimSilence"
                        name="trimsilence"
                        checked={values.trimsilence}
                        onChange={(e) => handleChange(e, { setFieldValue })}
                      />
                    </div>
                  </div>
                </div>

                {/* Target Dial Attempts Field */}
                <div>
                  <div className="row mb-3">
                    <label className="col-sm-4 col-form-label d-flex justify-content-end">
                      Target Dial Attempts :
                    </label>
                    <div className="col-sm-6 justify-content-start">
                      <Input
                        className="w-100"
                        type="number"
                        name="targetdialattempts"
                        onChange={(e) => handleChange(e, { setFieldValue })}
                      />
                      {/* {errors.targetdialattempts && (
                        <div className="error-message" style={{ color: "red", fontSize: "12px" }}>
                          {errors.targetdialattempts}
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                {!is_final && (
                  <div className="mt-5">
                    <div className="form_item button_items d-flex justify-content-center">
                      <Button type="primary" onClick={handleSubmit}>
                        Save And Continue
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Links;