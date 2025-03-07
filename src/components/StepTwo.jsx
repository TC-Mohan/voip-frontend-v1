import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import MultiStepFormContext from "./MultiStepFormContext";
import { CallGETAPI } from "../helper/Constants";

const Address = ({ is_final = false }) => {
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const { address, setAddress, next } = useContext(MultiStepFormContext);
  const [publishersName, setPublishersName] = useState([]);
  const [isPublisherError, setIsPublisherError] = useState(false);
  const [tollFreeNumbers, setTollFreeNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const publisherRes = await CallGETAPI("api/get-publisher");
        setPublishersName(publisherRes.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching publishers:", error.message);
        setIsLoading(false);
      }
    };
    fetchPublishers();
  }, []);

  useEffect(() => {
    const fetchTollFreeNumbers = async () => {
      try {
        const tollFreeRes = await CallGETAPI("api/get-purchase-number-v2");
        console.log(tollFreeNumbers,"check campaign number")
        if (tollFreeRes.status) {
          setTollFreeNumbers(tollFreeRes?.data?.data || []);
        } else {
          console.error("Failed to fetch toll-free numbers:", tollFreeRes.msg);
        }
      } catch (error) {
        console.error("Error fetching toll-free numbers:", error.message);
      }
    };
    fetchTollFreeNumbers();
  }, []);

  const handleChange = (e, { setFieldValue }) => {
    const { name, value } = e.target;
    setFieldValue(name, value);

    setAddress((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    if (name === "Publisher_id") {
      setSelectedPublisher(value);
      setFieldValue("TollFreeNumber", "");
    }
  };

  return (
    <Formik
      initialValues={{ ...address }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        if (!values.Publisher_id) {
          setIsPublisherError(true);
          return;
        } else {
          setIsPublisherError(false);
        }
        setAddress(values);
        next();
        resetForm();
        setSubmitting(false);
      }}
      validate={(values) => {
        const errors = {};
        if (!values.TollFreeNumber)
          errors.TollFreeNumber = "Phone number is required";
        return errors;
      }}
    >
      {({ handleSubmit, setFieldValue, values, errors }) => (
        <div className={"details__wrapper"}>
          <div className="container-fluid d-flex justify-content-center mt-5">
            <div className="w-100">
              <div>
                <div className={`form_item ${errors.state && "input_error"}`}>
                  <div className="row mb-3">
                    <label className="col-sm-4 col-form-label d-flex justify-content-end">
                      Publisher*:
                    </label>
                    <div className="col-sm-8 d-flex row ">
                      <select
                        className="form-select w-75"
                        name="Publisher_id"
                        value={values.Publisher_id}
                        onChange={(e) => {
                          handleChange(e, { setFieldValue });
                          setIsPublisherError(false);
                        }}
                        style={{
                          borderColor: isPublisherError ? "red" : "#d9d9d9",
                        }}
                      >
                        <option value="" disabled selected>
                          Select Publisher
                        </option>
                        {publishersName.map((item, index) => (
                          <option key={index} value={item.publisher_id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {isPublisherError && (
                        <div
                          className="col-sm-8 d-flex align-items-center justify-content-center error__feedback"
                          style={{ textAlign: "center", color: "red" }}
                        >
                          Publisher is required
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`form_item ${
                    errors.TollFreeNumber && "input_error"
                  }`}
                >
                  <div className="row mb-3">
                    <label className="col-sm-4 col-form-label d-flex justify-content-end">
                      Toll Free Number * :
                    </label>
                    <div className="col-sm-8 d-flex row ">
                      <select
                        className="form-select w-75"
                        name="TollFreeNumber"
                        value={values.TollFreeNumber}
                        onChange={(e) => handleChange(e, { setFieldValue })}
                        style={{
                          borderColor: errors.TollFreeNumber
                            ? "red"
                            : "#d9d9d9",
                        }}
                      >
                        <option value="" disabled selected>
                          Select Toll Free Number
                        </option>
                        {tollFreeNumbers.map((numberObj, index) => (
                          <option key={index} value={numberObj.number}>
                            {numberObj.number}
                          </option>
                        ))}
                      </select>

                      <div
                        className="col-sm-8 d-flex align-items-center justify-content-center error__feedback"
                        style={{ textAlign: "center", color: "red" }}
                      >
                        {errors.TollFreeNumber}
                      </div>
                    </div>
                  </div>
                </div>
                {!is_final && (
                  <div className="mt-4">
                    <div
                      className={
                        "form_item button_items d-flex justify-content-center"
                      }
                    >
                      <Button type={"primary"} onClick={handleSubmit}>
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

export default Address;