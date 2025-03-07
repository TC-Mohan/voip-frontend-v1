import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BASE_API, CallPOSTAPI } from "../helper/Constants";
const EditPublishers = ({
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
    numbercreation: false,
    blockcalls: "",
    accesstorecordings: "",
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
    const response = await CallPOSTAPI(
      `api/update-publisher/${editId}`,
      editValues
    );
    // console.log("PUT Response:", response);
    // Reload the page
    window.location.reload();
  };

  // console.log(editValues);

  useEffect(() => {
    if (editValues) {
      const FD = {
        ...formData,
        name: editValues.name,
        numbercreation: editValues.numbercreation,
        blockcalls: editValues.blockcalls,
        accesstorecordings: editValues.accesstorecordings,
      };

      setFormData(FD);
    }
  }, [editValues]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className={"modal-xl"}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form method="post" onSubmit={handleSubmit}>
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
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => onEditChange("name", e.target.value)}
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
                  onChange={(e) =>
                    onEditChange("numbercreation", e.target.checked)
                  }
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
              Block Calls After Payout Cap is Reached :
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
                  checked={formData.blockcalls === "Accounting Setting (Allow)"}
                  onChange={(e) => onEditChange("blockcalls", e.target.checked)}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="radio1"
                  onClick={() =>
                    onEditChange("blockcalls", "Accounting Setting (Allow)")
                  }
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
                  checked={formData.blockcalls === "Allow"}
                  onChange={(e) => onEditChange("blockcalls", e.target.checked)}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="radio2"
                  onClick={() => onEditChange("blockcalls", "Allow")}
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
                  checked={formData.blockcalls === "Block"}
                  onChange={(e) => onEditChange("blockcalls", e.target.checked)}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="radio3"
                  onClick={() => onEditChange("blockcalls", "Block")}
                >
                  Block
                </label>
              </div>
            </div>
          </div>
          {/* <div className="row mb-3">
            <label
              className="desc  col-sm-6 col-form-label d-flex justify-content-end"
              id="title4"
              htmlFor="Field4"
            >
              Access To Recordings :
            </label>
            <div className="d-flex justify-content-start col-sm-5">
              <div className="btn-group">
                <input
                  type="radio"
                  className="btn-check"
                  name="accesstorecordings"
                  id="radio4"
                  autoComplete="off"
                  value="Accounting Setting (Disabled)"
                  checked={
                    formData.accesstorecordings ===
                    "Accounting Setting (Disabled)"
                  }
                  onChange={(e) =>
                    onEditChange("accesstorecordings", e.target.value)
                  }
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="radio4"
                  onClick={() =>
                    onEditChange(
                      "accesstorecordings",
                      "Accounting Setting (Disabled)"
                    )
                  }
                >
                  Accounting Setting (Disabled)
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="accesstorecordings"
                  id="radio5"
                  autoComplete="off"
                  value="Enabled"
                  checked={formData.accesstorecordings === "Enabled"}
                  onChange={(e) =>
                    onEditChange("accesstorecordings", e.target.value)
                  }
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="radio5"
                  onClick={() => onEditChange("accesstorecordings", "Enabled")}
                >
                  Enabled
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="accesstorecordings"
                  id="radio6"
                  autoComplete="off"
                  value="Disabled"
                  checked={formData.accesstorecordings === "Disabled"}
                  onChange={(e) =>
                    onEditChange("accesstorecordings", e.target.value)
                  }
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="radio6"
                  onClick={() => onEditChange("accesstorecordings", "Disabled")}
                >
                  Disabled
                </label>
              </div>
            </div>
          </div> */}
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

export default EditPublishers;
