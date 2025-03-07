import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
 import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { purchaseNumber } from "../path/to/purchaseAction";
import { createPhoneNumber, spendMoney, updatedMoney } from "../../slices/WalletSlice";
import { CallPOSTAPI } from "../../helper/Constants";

const AddCallerId = ({ show, onHide, selectedNumber, crrPrice,fetchData }) => {
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
const [callerId,setCallerId] = useState("");
const  handleSubmit  = (e)=>{
    e.preventDefault();
    handleSaveCallerId();
}

// const handleSave = async () => {
//     setIsLoading(true);
//     try {
//       await handleSaveCallerId(ext_number, editedCallerId);
//       handleClose();
//     } catch (error) {
//       console.error("Error saving caller ID:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

const handleSaveCallerId = async () => {
  try {
    setLoading(true);
    const payload = {
      ext_number: extNumber,
      caller_id:  callerId // Use edited caller_id if available, otherwise use the original caller_id
     
    };

    const response = await CallPOSTAPI("api/add/caller-id", payload);

    if (response.data.status === true) {
      toast.success(response.data.msg);
      // setEditedCallerIds((prevState) => ({
      //   ...prevState,
      //   [ext_number]: "", // Reset the edited caller_id after successful update
      // }));
      fetchData();
    } else {
      toast.error(response.data.msg || "Invalid extension");
    }
  } catch (error) {
    toast.error("Error:", error.message || "Something Went Wrong");
  } finally {
    setLoading(false);
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
        <Modal.Title>Add Caller-ID</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <form className="" onSubmit={handleSubmit} id="caller_id_add" >
                <div className="form-group" >
                    {/* callerId,setCallerId */}
                    <label hrmlFor="caller_id" >Caller ID</label>
                    <input type="number" value={callerId}
                    onChange={(e)=>setCallerId(e.target.value)}
                    id="caller_id" className="form-control" /> 
                </div>

                {/* <div className="form-group" >
                    <button type="submit" className="btn btn-success"  >Save</button>
                </div> */}
            </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading} form="caller_id_add">
          {loading ? "Order Confirming..." : "Order Confirm"}
        </Button>
      </Modal.Footer>

      {/* Toast container */}
      <ToastContainer />
    </Modal>
  );
};

export default AddCallerId;
