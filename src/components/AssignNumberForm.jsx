import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { CallGETAPI, CallPOSTAPI } from '../helper/Constants';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const AssignNumberForm = ({ campaignId, onClose, }) => { 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [publisher, setPublisher] = useState("");
  const [phoneOptions, setPhoneOptions] = useState([]);
  const [publisherOptions, setPublisherOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [tollFreeNumbers, setTollFreeNumbers] = useState([]);


  const fetchDatas = async () => {
    setIsLoading(true);
    try {
      const response = await CallGETAPI(`api/fetch-publisher/${campaignId}`);
      setData(
        response.data.map((item) => ({
          Mobile_number: item.Mobile_number,
          name: item.publisher.name,
          publisher_id: item.publisher_id,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchDatas();
    }
  }, [show]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const publisherRes = await CallGETAPI("api/get-publisher");
        if (publisherRes.status) {
          const publishers = publisherRes.data.data.map(publisher => ({
            value: publisher.publisher_id,
            label: publisher.name
          }));
          setPublisherOptions(publishers);
        } else {
          console.error("Failed to fetch publishers:", publisherRes.msg);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchPhoneNumbers = async () => {
  //     if (publisher) {
  //       try {
  //         const tollFreeRes = await CallGETAPI(`api/get-purchase-number-v2`);
  //         if (tollFreeRes.status) {
  //           const phoneNumbers = tollFreeRes.data.data.map(item => ({
  //             value: item.number,
  //             label: item.number,
  //           }));
  //           setPhoneOptions(phoneNumbers || []);
  //         } else {
  //           console.error("Failed to fetch toll-free numbers:", tollFreeRes.msg);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching phone numbers:", error.message);
  //       }
  //     } else {
  //       setPhoneOptions([]);
  //     }
  //   };
  //   fetchPhoneNumbers();
  // }, [publisher]);





  useEffect(() => {
    const fetchPhoneNumbers = async () => {
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
    fetchPhoneNumbers();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!phoneNumber || !publisher) {
      setError('Please fill in all required fields.');
      toast.error('Please fill in all required fields.');
      return;
    }
    setError(null); 

    const formData = {
      campagin_id: campaignId,
      Mobile_number: phoneNumber,
      publisher_id: publisher,
    };

    try {
      const response = await CallPOSTAPI('api/create-compaign-publisher', formData);
      await fetchDatas();

      if (response.status) {
        toast.success(response.message || 'Campaign publisher created successfully!');
        setPhoneNumber('');
        setPublisher('');

        if (onClose) onClose(); 
      } else {
        toast.error(response.message || 'Failed to create campaign publisher entry.');
      }
    } catch (error) {
      setError('There was a problem with the fetch operation.');
      toast.error('Error submitting form.');
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePublisherChange = (e) => {
    setPublisher(e.target.value);
    setPhoneNumber(''); // Reset phone number when publisher changes
  };

  return (
    <>
      <ToastContainer /> 
      <Form onSubmit={handleSubmit}>
        {isLoading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <div className="row mb-3">
              <label htmlFor="publisher" className="col-sm-4 col-form-label d-flex justify-content-end">
                Publisher:
              </label>
              <div className="col-sm-6">
                <Form.Control
                  as="select"
                  value={publisher}
                  onChange={handlePublisherChange}
                  id="publisher"
                  className={`form-control w-100 ${publisher ? "" : "is-invalid"}`}
                  required
                >
                  <option value="">Select a Publisher</option>
                  {publisherOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Form.Control>
                {!publisher && <div className="invalid-feedback">Please select a publisher.</div>}
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="phoneNumber" className="col-sm-4 col-form-label d-flex justify-content-end">
                Phone Number:
              </label>
              <div className="col-sm-6">
                <Form.Control
                  as="select"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  id="phoneNumber"
                  className={`form-control w-100 ${phoneNumber ? "" : "is-invalid"}`}
                  required
                  disabled={!publisher}
                >
                  <option value="">Please Select Number</option>
                  {/* {phoneOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))} */}
                  {tollFreeNumbers.map((numberObj, index) => (
                          <option key={index} value={numberObj.number}>
                            {numberObj.number}
                          </option>
                        ))}
                </Form.Control>
                {!phoneNumber && <div className="invalid-feedback">Please select a phone number.</div>}
              </div>
            </div>
          </>
        )}
        <div className="row mb-3">
          <div className="col-sm-6 offset-sm-4"> 
            <Button type="submit" variant="primary" className="w-100">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default AssignNumberForm;