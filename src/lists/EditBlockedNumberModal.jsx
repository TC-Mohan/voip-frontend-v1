import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactLoading from "react-loading";

const EditBlockedNumberModal = ({ show, onHide, numberData, onUpdateNumber, isLoading }) => {
  const [editNumber, setEditNumber] = useState("");

  useEffect(() => {
    if (numberData) {
      setEditNumber(numberData.block_number);
    }
  }, [numberData]);

  const handleUpdate = () => {
    onUpdateNumber({ ...numberData, block_number: editNumber });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static"  style={{ marginTop: "8rem" }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Blocked Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="text"
              value={editNumber}
              onChange={(e) => setEditNumber(e.target.value)}
              placeholder="Enter new number"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
       {isLoading ? (
          <ReactLoading type="spin" color="blue" height={30} width={30} />
        ) : (
          <Button variant="primary" onClick={handleUpdate}>
           Update Number
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditBlockedNumberModal;
