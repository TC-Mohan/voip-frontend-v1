import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactLoading from "react-loading";

const AddBlockedNumberModal = ({ show, onHide, onAddNumber, isLoading }) => {
  const [newNumber, setNewNumber] = useState("");
  const [numberError, setNumberError] = useState("");

  const handleAdd = () => {
    const trimmedNumber = newNumber.trim();
    
    // Validate if the number is at least 10 digits long
    if (!trimmedNumber) {
      setNumberError("Mobile Number is required!");
      return;
    }
    if (trimmedNumber.length < 10) {
      setNumberError("Mobile Number must be at least 10 digits!");
      return;
    }
  
    onAddNumber({ block_number: trimmedNumber }); 
    setNewNumber(""); 
    setNumberError(""); 
    onHide(); 
  };

  const handleChange = (e) => {
    setNewNumber(e.target.value);
    setNumberError(""); // Clear the error message when the user starts typing
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static"  style={{ marginTop: "8rem" }}>
      <Modal.Header closeButton>
        <Modal.Title>Add Blocked Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Number*</Form.Label>
            <Form.Control
              type="text"
              className={numberError ? "is-invalid" : ""}
              value={newNumber}
              onChange={handleChange}
              placeholder="Enter number to block"
            />
            {numberError && <div className="invalid-feedback">{numberError}</div>}
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
          <Button variant="primary" onClick={handleAdd}>
            Add Number
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddBlockedNumberModal;
