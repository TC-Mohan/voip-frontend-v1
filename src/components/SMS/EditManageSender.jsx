import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const EditManageSender = ({ show, setShow, editId, editValues, onSave }) => {
  const [formData, setFormData] = useState({
    headerid: "",
    entityid: "",
    entityname: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);

    setFormData({
      headerid: "",
      entityid: "",
      entityname: "",
    });

    setShow(false);
  };

  useEffect(() => {
    if (editValues) {
      setFormData(editValues);
    }
  }, [editValues]);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Sender ID Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label
              className="desc col-sm-4 col-form-label  d-flex justify-content-end  "
              id="title1"
              htmlFor="Field1"
            >
              Header Id :
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control "
                placeholder=""
                required=""
                name="headerid"
                value={formData.headerid}
  onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              className="desc col-sm-4 col-form-label  d-flex justify-content-end  "
              id="title1"
              htmlFor="Field1"
            >
              Entity Id :
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control "
                placeholder=""
                required=""
                name="entityid"
                value={formData.entityid}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              className="desc col-sm-4 col-form-label  d-flex justify-content-end  "
              id="title1"
              htmlFor="Field1"
            >
              Entity Name :
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control "
                placeholder=""
                required=""
                name="entityname"
                value={formData.entityname}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditManageSender;