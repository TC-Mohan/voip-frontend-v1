import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { GetCountry, GetTimeZoneById } from "../helper/utils";
import { CallPOSTAPI } from "../helper/Constants";
import { toast } from "react-toastify";

// Updated validation schema to match database requirements
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Target Name is required'),
  number: Yup.string()
    .matches(/^\d{10}$/, 'Please enter a valid 10-digit phone number')
    .required('Phone Number is required'),
  timezone: Yup.string()
    .required('Timezone is required'),
  monthlyInput: Yup.string(),
  dailyInput: Yup.string(),
  hourlyInput: Yup.string(),
  maxInput: Yup.string()
});

function CreateTargetForm({ onSuccess }) {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [countries, setCountries] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [isCountryError, setIsCountryError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const resultCountry = await GetCountry();
      setCountries(resultCountry || []);
      const resultData = await GetTimeZoneById('US');
      setTimezones(resultData || []);
    };
    fetchInitialData();
  }, []);

  const handleCountrySelect = async (e, setFieldValue) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);

    const resultData = await GetTimeZoneById(countryId);
    setTimezones(resultData || []);
    
    if (countryId === 'IN') {
      setFieldValue('timezone', 'Asia/Kolkata');
    } else if (resultData && resultData.length > 0) {
      setFieldValue('timezone', resultData[0].timezone);
    }

    setIsCountryError(!countryId);
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setIsLoading(true);
      
      // Prepare payload according to database schema
      const finalPayload = {
        name: values.name,
        number: parseInt(values.number), // Convert to integer as per schema
        timezone: values.timezone,
        // Default values for required fields
        monthlyInput: values.monthlyInput || '0',
        dailyInput: values.dailyInput || '0',
        hourlyInput: values.hourlyInput || '0',
        maxInput: parseInt(values.maxInput) || 0,
        monthly_val: parseInt(values.monthlyInput) || 0,
        daily_val: parseInt(values.dailyInput) || 0,
        hourly_val: parseInt(values.hourlyInput) || 0,
        max_val: parseInt(values.maxInput) || 0,
        timeout: '30', // Default timeout
        recording: false,
        operation: 'basic', // Default operation
        monthly: false,
        daily: false,
        hourly: false,
        max: false,
        basic: [], // Default empty array for JSON field
        advanced: [], // Default empty array for JSON field
        activestatus: true,
        status: true,
        unlimited: false
      };

      const response = await CallPOSTAPI("api/create-target", finalPayload);

      if (response.data.status) {
        toast.success("Target created successfully");
        resetForm();
        if (onSuccess) {
          onSuccess(response.data);
        }
      } else {
        toast.error(response.data?.message || "Target with this name already exists");
      }
    } catch (error) {
      console.error("Error creating target:", error);
      toast.error(error.message || "Failed to create target");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
        timezone: 'Asia/Kolkata',
        monthlyInput: '0',
        dailyInput: '0',
        hourlyInput: '0',
        maxInput: '0'
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
        <Form>
          <div className="row mb-3">
            <label htmlFor="name" className="col-sm-4 col-form-label d-flex justify-content-end">
              Target Name* :
            </label>
            <div className="col-sm-6">
              <input
                id="name"
                type="text"
                className="form-control w-100"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter target name"
                style={{
                  borderColor: errors.name && touched.name ? "red" : "#d9d9d9",
                }}
              />
              {errors.name && touched.name && (
                <div className="error-message" style={{ color: "red", fontSize: "12px" }}>
                  {errors.name}
                </div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label d-flex justify-content-end">
              Phone Number* :
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control w-100"
                name="number"
                value={values.number}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                style={{
                  borderColor: errors.number && touched.number ? "red" : "#d9d9d9",
                }}
              />
              {errors.number && touched.number && (
                <div className="error-message" style={{ color: "red", fontSize: "12px" }}>
                  {errors.number}
                </div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label d-flex justify-content-end">
              Time Zone* :
            </label>
            <div className="col-sm-8 d-flex row">
              <div className="col-sm-6">
                <select
                  className="form-select"
                  value={selectedCountry}
                  onChange={(e) => handleCountrySelect(e, setFieldValue)}
                  name="country"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.iso} value={country.iso}>
                      {country.nicename}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Target'}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateTargetForm;