import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { BASE_API } from "../../helper/Constants";
const EditSmsTemplates = ({
  editValues,
  onEditChange,
  onCancel,
  onSave,
  show,
  setShow,
  editId,
}) => {
  const handleClose = () => setShow(false);

  const [formData, setFormData] = useState({
    smstemplatename: "",
    smstype: "promotional",
    senderid: "hdtsms",
    smsencoding: "text",
    templateid: "bsp-demo",
    smstemplate: "",
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

    const apiUrl = `${BASE_API}api/update-smstemplate/${editId}`;
    // console.log("API URL:", apiUrl);

    try {
      // Use formData instead of editValues in the axios.post request
      const response = await axios.post(apiUrl, formData);
      // console.log("PUT Response:", response);
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("PUT Error:", error);
    }
  };

  useEffect(() => {
    if (editValues) {
      const FD = {
        ...formData,
        smstemplatename: editValues.smstemplatename,
        smstype: editValues.smstype, // Use "smstype" instead of "type"
        senderid: editValues.senderid, // Use "senderid" instead of "senderId"
        smsencoding: editValues.smsencoding,
        templateid: editValues.templateid,
        smstemplate: editValues.smstemplate,
      };

      setFormData(FD);
    }
  }, [editValues]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className={"modal-lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact List</Modal.Title>
        </Modal.Header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mt-3">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row mb-4">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                  >
                    SMS Template Name *
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="SMS Template Name *"
                      value={formData.smstemplatename}
                      onChange={(e) =>
                        onEditChange("smstemplatename", e.target.value)
                      }
                      name="smstemplatename"
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                  >
                    SMS Type *
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      name="smstype"
                      value={formData.smstype}
                      onChange={(e) => onEditChange("smstype", e.target.value)}
                    >
                      <option value="promotional">Promotional</option>
                      <option value="transactional">Transactional</option>
                      <option value="otp">OTP</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                  >
                    Select Sender id *
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      name="senderid"
                      value={formData.senderid}
                      onChange={(e) => onEditChange("senderid", e.target.value)}
                    >
                      <option value="hdtsms">HDTSMS</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                  >
                    Select SMS Encoding *
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      name="smsencoding"
                      value={formData.smsencoding}
                      onChange={(e) =>
                        onEditChange("smsencoding", e.target.value)
                      }
                    >
                      <option value="text">Text</option>
                      <option value="unicode">Unicode</option>
                      <option value="flashsms">Flash SMS</option>
                      <option value="unicodeflashsms">Unicode Flash SMS</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                  >
                    Select Template *
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      name="templateid"
                      value={formData.templateid}
                      onChange={(e) =>
                        onEditChange("templateid", e.target.value)
                      }
                    >
                      <option value="bsp-demo">BSP-DEMO</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                  >
                    SMS Template *
                  </label>
                  <div className="col-sm-8">
                    <textarea
                      className="form-control w-100"
                      rows="5"
                      id=""
                      name="smstemplate"
                      placeholder="THIS IS TEST MESSAGE TO START BULK SMS SERVICE WITH {#var#} HENCE DIGITAL"
                      value={formData.smstemplate}
                      onChange={(e) =>
                        onEditChange("smstemplate", e.target.value)
                      }
                    ></textarea>
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                  ></label>
                  <div className="col-sm-8 text-start">
                    <ul>
                      <li>
                        @agent_mobile: if you use agent mobile number then you
                        can write @agent_mobile instead of var
                      </li>
                      <li>
                        @caller_number: if you use caller mobile number then you
                        can write @caller_number instead of var
                      </li>
                      <li>
                        @admin_mobile: if you use your mobile number then you
                        can write @admin_mobile instead of var
                      </li>
                      <li>
                        @call_status: if you use your call status then you can
                        write @call_status instead of var
                      </li>
                      <li>
                        @date_time: if you use your date and time then you can
                        write @date_time instead of var
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4 "></div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditSmsTemplates;
