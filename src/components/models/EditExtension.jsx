// EditExtension.js
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { CallGETAPI } from "../../helper/Constants";

const EditExtension = ({
  show,
  handleClose,
  handleSave,
  extNumber,
  handleExtensionChange,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    fetchExtensions();
  }, []);

  const fetchExtensions = async () => {
    try {
      const response = await CallGETAPI("api/getAll-records");
      if (response.status) {
        setExtensions(response.data.combinedRecords);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch extensions:", response.msg);
      }
    } catch (error) {
      console.error("Error fetching extensions:", error.message);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      await handleSave();
    } catch (error) {
      console.error("Error saving changes:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      style={{ marginTop: "8rem" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Extension</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="selectedExtension" style={{ marginBottom: "0.5rem" }}>
            Select Extension
          </label>
          <select
            id="selectedExtension"
            value={extNumber}
            onChange={handleExtensionChange}
            className="form-control"
            style={{ marginTop: "0.5rem" }}
          >
            <option value="">Select Extension</option>
            {extensions.map((extension) => (
              <option key={extension.id} value={extension.auth_id}>
                {extension.id}
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges} disabled={isLoading}>
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

export default EditExtension;
