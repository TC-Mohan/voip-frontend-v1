import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function EditCallerIdModal({ show, handleClose, ext_number, caller_id, initialCallerId, handleSaveCallerId }) {
  const [editedCallerId, setEditedCallerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEditedCallerId(initialCallerId || caller_id);
  }, [initialCallerId, caller_id]);

  const handleChange = (event) => {
    setEditedCallerId(event.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await handleSaveCallerId(ext_number, editedCallerId);
      handleClose();
    } catch (error) {
      console.error("Error saving caller ID:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}  backdrop="static"
    style={{ marginTop: "8rem" }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Caller ID</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="callerId">Caller ID:</label>
          <input
            type="text"
            className="form-control"
            id="callerId"
            value={editedCallerId}
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCallerIdModal;
