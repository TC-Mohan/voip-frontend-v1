import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { BASE_API } from "../../helper/Constants";
const EditContactList = ({
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
    name: "",
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
    try {
      const response = await axios.post(
        `${BASE_API}api/update-contactlist/${editId}`,
        formData
      );

      if (response.status === 200) {
        // console.log("POST Response:", response);
      } else {
        console.error(
          "Error updating data:",
          response.status,
          response.statusText
        );
      }
      // console.log("POST Response:", response);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    if (editValues) {
      const FD = {
        ...formData,
        name: editValues.name,
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
        <form onSubmit={(e) => e.preventDefault()} id="my-form">
          <div className="row mb-4">
            <label
              htmlFor="inputEmail"
              className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
            >
              Name *
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                placeholder="Name *"
                value={formData.name}
                onChange={(e) => onEditChange("name", e.target.value)}
                name="name"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4"></div>
          </div>
        </form>
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

export default EditContactList;
