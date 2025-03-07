import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { CallGETAPI } from "../../helper/Constants";

const EditPublisherModal = ({ show, onHide, publisher, onUpdate, isLoading }) => {
  const [editingPublisher, setEditingPublisher] = useState(publisher);
  const [tollFreeNumbers, setTollFreeNumbers] = useState([]);
  const [loadingNumbers, setLoadingNumbers] = useState(true);

  useEffect(() => {
    setEditingPublisher(publisher);
  }, [publisher]);

  useEffect(() => {
    if (show) {
      const fetchPhoneNumbers = async () => {
        setLoadingNumbers(true);
        try {
          const response = await CallGETAPI("api/get-purchase-number-v2");
          if (response.status) {
            setTollFreeNumbers(response.data.data || []);
          } else {
            console.error("Failed to fetch toll-free numbers:", response.msg);
          }
        } catch (error) {
          console.error("Error fetching toll-free numbers:", error.message);
        } finally {
          setLoadingNumbers(false);
        }
      };
      fetchPhoneNumbers();
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingPublisher);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditingPublisher((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      style={{ marginTop: "8rem" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Publisher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editingPublisher && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Mobile_number">
              <Form.Label>Phone Number</Form.Label>
              {loadingNumbers ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Form.Control
                  as="select"
                  value={editingPublisher.Mobile_number}
                  onChange={handleInputChange}
                >
                  <option value="">Select a Phone Number</option>
                  {tollFreeNumbers.map((numberObj, index) => (
                    <option key={index} value={numberObj.number}>
                      {numberObj.number}
                    </option>
                  ))}
                </Form.Control>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Publisher Name</Form.Label>
              <Form.Control
                type="text"
                value={editingPublisher.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <input
              type="hidden"
              id="publisher_id"
              value={editingPublisher.publisher_id}
            />
            <Button variant="primary" type="submit" disabled={isLoading}>
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
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditPublisherModal;
