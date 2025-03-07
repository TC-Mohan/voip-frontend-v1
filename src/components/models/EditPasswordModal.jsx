import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner component for loading indicator

const EditPasswordModal = ({
  show,
  handleClose,
  handleSave,
  editedPassword,
  handlePasswordChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    await handleSave(); // Assuming handleSave is an asynchronous function
    setIsLoading(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      style={{ marginTop: "8rem" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="newPassword" style={{ marginBottom: "0.5rem" }}>
            New Password
          </label>
          <input
            type="text"
            id="newPassword"
            value={editedPassword}
            onChange={handlePasswordChange}
            className="form-control"
            style={{ marginTop: "0.5rem" }}
            placeholder="Enter new password"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveChanges}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: "5px" }}
              />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPasswordModal;
