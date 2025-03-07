import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
 import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { purchaseNumber } from "../path/to/purchaseAction";
import { createPhoneNumber, spendMoney, updatedMoney } from "../../slices/WalletSlice";

const NumberModal = ({ show, onHide, selectedNumber, crrPrice }) => {
  const navigate = useNavigate();
  const [taxes, setTaxes] = useState(0);
  const userBalance = useSelector((state) => state.wallet.balance);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const extNumber = useSelector((state) => state.wallet.extension_number);

 const calculateTotalPrice = () => {
  const total = parseFloat(crrPrice) + parseFloat(taxes);
  if (!isNaN(total)) {
    let formattedTotal = total;
    if (Number.isInteger(total) && total >= 2) {
      formattedTotal = total + 0;
    }
    return Number(formattedTotal.toFixed(2)); 
  } else {
    return "Invalid input";
  }
};

  

  useEffect(() => {
    setLoading(false);
  }, [show]);

  // const handleBuyClick = async () => {
  //   try {
  //     setIsLoading(true);
  //     // console.log("njhbhg");

  //     const body = {
  //       itemName: "shoes",
  //       itemSKU: "001",
  //       itemPrice: "300.00",
  //       itemCurrency: "USD",
  //       itemQuantity: 2,
  //     };
  //     const response = await axios.post(BASE_API + "pay", body, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     // console.log(response);
  //     window.location.href = response.data.redirect_url;
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };

  // const handleBuyClick = () => {
  //   setLoading(true);
  //   const totalAmount = calculateTotalPrice();
  //   dispatch(spendMoney(totalAmount));
  //   toast.success("Number purchased successfully!");
  //   onHide();
  // };

  const handleBuyClick = async () => {
    setLoading(true);
    let totalAmount = calculateTotalPrice();
    if (userBalance < totalAmount) {
      setLoading(false);
      toast.error("Insufficient balance. Please add funds to your wallet.");
      return;
    }
  
    // Round the total amount to two decimal places
    totalAmount = parseFloat(totalAmount.toFixed(2));
  
    try {
      // Fetch the extension number from the state
     
  
      // Include the extension number in the createPhoneNumber API call payload
      await dispatch(
        createPhoneNumber({
          number: selectedNumber.mobile_number,
          // ext_number: extNumber, // Pass the extension number here
          price: totalAmount,
        })
      );
      await dispatch(spendMoney(totalAmount));
      await dispatch(updatedMoney(userBalance - totalAmount));
      toast.success("Number purchased successfully!");
      onHide();
      navigate("/purchase-number-list");
    } catch (error) {
      console.error("Error purchasing number:", error);
      setLoading(false);
      toast.error("Failed to purchase number. Please try again later.");
    }
  };
  
  
  

  return (
    <Modal show={show} onHide={onHide} className="modal-lg" backdrop="static"  style={{ marginTop: "8rem" }}>
      <Modal.Header closeButton>
        <Modal.Title>Review Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Number</th>
              <th>Price</th>
            </tr>
          </thead>
          {selectedNumber && (
           <tbody>
            <tr>
              <td>{selectedNumber.mobile_number}-One time setup free</td>
              <td>${crrPrice}</td>
            </tr>
            <tr className="taxes">
              <td>Taxes</td>
              <td>${taxes}</td>
            </tr>
            <tr className="total">
              <td>Total</td>
              <td>${calculateTotalPrice()}</td>
            </tr>
          </tbody> 
        )}
          {/* <tbody>
  {selectedNumber && (
    <tr>
      <td>{selectedNumber.mobile_number}-One time setup free</td>
      <td>${crrPrice}</td>
    </tr>
  )}
  {/* Render other rows */}
{/* </tbody> */} 

        </table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleBuyClick} disabled={loading}>
          {loading ? "Order Confirming..." : "Order Confirm"}
        </Button>
      </Modal.Footer>

      {/* Toast container */}
      <ToastContainer />
    </Modal>
  );
};

export default NumberModal;
