import React, { useState } from 'react'
import { CallPOSTAPI } from '../../helper/Constants';
import { toast } from 'react-toastify';

function CreatPublisher({fetchData}) {

    const [formData, setFormData] = useState({
        name: "",
        numbercreation: false,
        blockcalls: "", // Include this in your formData
        accesstorecordings: "", // Include this in your formData
      });
      const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };


      
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Form Data:", formData);
    try {
      const response = await CallPOSTAPI("api/create-publisher", formData);
      // console.log({ response });
      // const response = await axios.post(
      //   BASE_API + "api/create-publisher",
      //   formData
      // );
      // console.log("Data sent:", response.data);
      toast.success("Publisher Added Successfully");
      fetchData();

      // Optionally, perform actions after successful submission
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle error scenarios
    }
  };

  return (
    <>
        <div className="modal" id="myModal2">
                        <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                              <h4 className="modal-title">
                                Add a new Publisher
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              />
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-12">
                                    <form>
                                      <div className="row mb-3">
                                        <label
                                          htmlFor="inputEmail"
                                          className="col-sm-6 col-form-label d-flex justify-content-end"
                                        >
                                          Name :
                                        </label>
                                        <div className="col-sm-6">
                                          <input
                                            type="text"
                                            className="form-control w-100"
                                            placeholder="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <label
                                          className="desc col-sm-6 col-form-label d-flex justify-content-end"
                                          id="title3"
                                          htmlFor="Field3"
                                        >
                                          Number Creation :
                                        </label>
                                        <div className="col-sm-6">
                                          <div className="form-check form-switch">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              name="numbercreation"
                                              id="flexSwitchCheckChecked"
                                              checked={formData.numbercreation}
                                              onChange={handleInputChange}
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexSwitchCheckChecked"
                                            ></label>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <label
                                          className="desc  col-sm-6 col-form-label d-flex justify-content-end"
                                          id="title3"
                                          htmlFor="Field3"
                                        >
                                          Block Calls After Payout Cap is
                                          Reached :
                                        </label>
                                        <div className="d-flex justify-content-start col-sm-6">
                                          <div className="btn-group">
                                            <input
                                              type="radio"
                                              className="btn-check"
                                              name="blockcalls"
                                              id="radio1"
                                              autoComplete="off"
                                              value="Accounting Setting (Allow)"
                                              checked={
                                                formData.blockcalls ===
                                                "Accounting Setting (Allow)"
                                              }
                                              onChange={handleInputChange}
                                            />
                                            <label
                                              className="btn btn-outline-primary"
                                              htmlFor="radio1"
                                            >
                                              Accounting Setting (Allow)
                                            </label>
                                            <input
                                              type="radio"
                                              className="btn-check"
                                              name="blockcalls"
                                              id="radio2"
                                              autoComplete="off"
                                              value="Allow"
                                              checked={
                                                formData.blockcalls === "Allow"
                                              }
                                              onChange={handleInputChange}
                                            />
                                            <label
                                              className="btn btn-outline-primary"
                                              htmlFor="radio2"
                                            >
                                              Allow
                                            </label>
                                            <input
                                              type="radio"
                                              className="btn-check"
                                              name="blockcalls"
                                              id="radio3"
                                              autoComplete="off"
                                              value="Block"
                                              checked={
                                                formData.blockcalls === "Block"
                                              }
                                              onChange={handleInputChange}
                                            />
                                            <label
                                              className="btn btn-outline-primary"
                                              htmlFor="radio3"
                                            >
                                              Block
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                     
                                      <button
                                        type="submit"
                                        className="btn btn-success"
                                        data-bs-dismiss="modal"
                                        onClick={handleSubmit}
                                      >
                                        Add
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Modal footer */}
                            <div className="modal-footer"></div>
                          </div>
                        </div>
                      </div> 
    </>
  )
}

export default CreatPublisher