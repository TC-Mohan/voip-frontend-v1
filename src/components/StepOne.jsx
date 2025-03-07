import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";
import Form from "react-bootstrap/Form";
import { GetCountry, GetTimeZoneById } from "../helper/utils";

const Details = ({ is_final = false }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "US",
    name: "United States",
  });
  const [countries, setCountries] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [isCountryError, setIsCountryError] = useState(false);

  const { details, setDetails, next } = useContext(MultiStepFormContext);

  const fetchCountry = async () => {
    const resultCountry = await GetCountry();
    setCountries([{ isoCode: "US", name: "United States" }, ...resultCountry]);
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  // useEffect(() => {
  //   if (details.country) {
  //     setSelectedCountry(details.country);
  //   }
  // }, [details.country]);

  useEffect(() => {
    if (details.country && details.country.code) {
      setSelectedCountry(details.country);
    } else {
      setDetails((prevDetails) => ({
        ...prevDetails,
        country: selectedCountry,
      }));
    }
  }, []);
  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    const countryName = e.target.options[e.target.selectedIndex].text;
    const newSelectedCountry = { code: countryId, name: countryName };
    setSelectedCountry(newSelectedCountry);
    const resultData = await GetTimeZoneById(countryId);
    setTimezones(resultData);

    setDetails((prevDetails) => ({
      ...prevDetails,
      country: newSelectedCountry,
    }));
  };

  const handleChange = (e, { setFieldValue }) => {
    const { name, type, checked, value } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFieldValue(name, updatedValue);

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: updatedValue,
    }));
  };

  return (
    <>
      <Formik
        initialValues={{ ...details, country: selectedCountry }}
        onSubmit={(values, { setSubmitting }) => {
          if (!selectedCountry.code) {
            setIsCountryError(true);
            return;
          } else {
            setIsCountryError(false);
          }

          setDetails({
            ...values,
            country: selectedCountry,
          });
          setSubmitting(false);
          next();
        }}
        validate={(values) => {
          const errors = {};
          if (!values.campaignname) errors.campaignname = "Name is required";
          else if (!/^[a-zA-Z\s]+$/.test(values.campaignname))
            errors.campaignname =
              "Name should only contain alphabets and spaces";
          return errors;
        }}
      >
        {({ handleSubmit, values, errors, isSubmitting, setFieldValue }) => (
          <div className={"details__wrapper"}>
            <div className="container-fluid d-flex justify-content-center mt-5">
              <div className="w-100">
                <div
                  className={`form_item ${
                    errors.campaignname && "input_error"
                  }`}
                >
                  <div className="row mb-3">
                    <label className="col-sm-4 col-form-label d-flex justify-content-end">
                      Campaign Name* :
                    </label>
                    <div
                      className={`col-sm-8 d-flex row ${
                        errors.campaignname && "input_error"
                      }`}
                    >
                      <Input
                        name={"campaignname"}
                        style={{
                          borderColor: errors.campaignname ? "red" : "#d9d9d9",
                        }}
                        className={`w-75 ${
                          errors.campaignname && "input_error"
                        }`}
                        value={values.campaignname}
                        onChange={(e) => {
                          handleChange(e, { setFieldValue });
                        }}
                      />
                      <div
                        className="col-sm-8 d-flex align-items-center justify-content-center error__feedback"
                        style={{ textAlign: "center", color: "red" }}
                      >
                        {errors.campaignname}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-sm-4 col-form-label d-flex justify-content-end">
                      Country *
                    </label>
                    <div className="col-sm-8 d-flex row">
                      <select
                        className="form-select w-75"
                        value={selectedCountry.code}
                        onChange={handleCountryChange}
                        name="country"
                      >
                        {countries.map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>

                      {isCountryError && (
                        <div
                          className="col-sm-8 d-flex align-items-center justify-content-center error__feedback"
                          style={{ textAlign: "center", color: "red" }}
                        >
                          Country is required
                        </div>
                      )}
                    </div>
                  </div>

                  {!is_final && (
                    <div
                      className={
                        "form_item button_items d-flex justify-content-center"
                      }
                    >
                      <Button
                        className="mt-4"
                        type={"primary"}
                        onClick={handleSubmit}
                      >
                        Save And Continue
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Details;
