import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function PurchaseNumberModal() {
  const checkMobileNumber = useSelector((state) => state.wallet.mobile_numbers_purchase);

  const [show, setShow] = useState(checkMobileNumber ? false : true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="" >
                <h3> Please Purchase Number Before Continue</h3>
                
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PurchaseNumberModal;