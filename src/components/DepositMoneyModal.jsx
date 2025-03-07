// import React, { useState } from "react";
// import Modal from "antd/es/modal/Modal";
// import { CallGETAPI, CallPOSTAPI } from "../helper/Constants";
// import { Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import StripeCheckout from "react-stripe-checkout";
// import { message } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchBalance,
//   addMoney,
//   spendMoney,
//   updatedMoney,
// } from "../slices/WalletSlice";
// import { useEffect } from "react";
// // import onToken from "react-stripe-checkout";

// function DepositMoneyModal({
//   showDepositModal,
//   setshowDepositModal,
//   reloadData,
// }) {
//   const [validated, setValidated] = useState(false);
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     amount: "",
//     address_city: "",
//     address_country: "",
//     address_line1: "",
//     address_line2: "",
//     address_state: "",
//     address_zip: "",
//     name: "",
//     email: "",
//     transaction_type: "Stripe_pay",
//   });

//   const balance = useSelector((state) => state.wallet.balance);

//   useEffect(() => {
//     dispatch(fetchBalance());
//   }, []);

//   const DepositFunds = async (payload) => {
//     try {
//       const body = {
//         address_city: payload.token.card.address_city,
//         address_country: payload.token.card.address_country,
//         address_state: payload.token.card.address_state,
//         address_line1: payload.token.card.address_line1,
//         address_line2: payload.token.card.address_line2,
//         address_zip: payload.token.card.address_zip,
//         name: payload.token.card.name,
//         transaction_type: "Stripe_pay",
//         amount: formData.amount,
//         email: payload.token.email,
//       };
//       const { data } = await CallPOSTAPI(`api/deposit-transaction`, body);
//       return data;
//     } catch (error) {
//       return error.response.data;
//     }
//   };

//   const handlechange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };
//   //   {
//   const onToken = async (token) => {
//     try {
//       const response = await DepositFunds({ token, formData });

//       if (response.status) {
//         setshowDepositModal(false);

//         // console.log(setFormData);
//         toast.success(" Deposit Transaction Successfully");
//         dispatch(addMoney(formData.amount));
//       } else {
//         setshowDepositModal(true);
//         toast.error("Deposit Transaction Failed.");
//         console.error("Failed to save data.");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred. Please try again later.");
//       console.error("Error:", error);
//     }
//   };
//   //   }
//   return (
//     <div>
//       <Modal
//         title="Deposit Money"
//         open={showDepositModal}
//         onCancel={() => setshowDepositModal(false)}
//         footer={null}
//       >
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Form.Group controlId="validationCustom03">
//             <Form.Label
//               style={{
//                 fontWeight: "bold",
//                 fontSize: "13px",
//               }}
//             >
//               Add Balance *
//             </Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Add Balance"
//               required
//               name="amount"
//               id="amount"
//               onChange={handlechange}
//               className="w-100 mt-2"
//             />
//             <Form.Control.Feedback type="invalid">
//               Please Enter the Amount First.
//             </Form.Control.Feedback>
//           </Form.Group>

//           <div className="d-flex justify-content-center mt-4">
//             <StripeCheckout
//               token={onToken}
//               shippingAddress
//               allowRememberMe
//               stripeKey="pk_test_51P3xxaSB1wVRMXizxEFGgQWwC62tEtpqyzs7QbLwGOx2t5NmPXSwIRHiLecn5XWqpvVKiVenRPZqy4xNwk2A2pYW00xZg6emTA"
//             >
//               <Button type="submit" variant="success">
//                 Deposit Now{" "}
//               </Button>
//             </StripeCheckout>
//           </div>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// // export default TransferfundModal;
// export { DepositMoneyModal };

import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchBalance } from "../slices/WalletSlice";
import QRCode from "react-qr-code"; 
import { toast } from "react-toastify";
import { CopyOutlined } from '@ant-design/icons'; 
import Link from "antd/es/typography/Link";

function DepositMoneyModal({ showDepositModal, setshowDepositModal }) {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.wallet.balance);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const whatsappLink =
    "https://api.whatsapp.com/send/?phone=61280437729&text&type=phone_number&app_absent=0";

  const paymentCode = `TAuWb5qDm7w9NRyQj2Gqx4eAvhCCAr9wQ4`;
  const transactionId = "TAuWb5qDm7w9NRyQj2Gqx4eAvhCCAr9wQ4";
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => {
        toast.success("Transaction ID copied to clipboard!");
      })
      .catch((error) => {
        console.error("Could not copy text: ", error);
      });
  };

  return (
    <Modal
      title="Deposit Money {Only USDT Payment Accept}"
      open={showDepositModal}
      onCancel={() => setshowDepositModal(false)}
      footer={null}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <QRCode value={paymentCode} size={200} />
         
        </div> 
        <h2>~USDT Payment~</h2>
        <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', marginLeft: 8 }} onClick={copyToClipboard}>
              {transactionId} 
              <CopyOutlined style={{ marginLeft: 4, fontSize: 16, verticalAlign: 'middle',color:"gray" }} />
            </span>

        <div style={{ textAlign: "left", width: "100%", marginBottom: 20,marginTop:"12px" }}>
          <p className="font-color">
            After payment send details on WhatsApp in given format:
          </p>
          <p className="font-color">Name:-</p>
          <p className="font-color">Mob:-</p>
          <p className="font-color">Amount:-</p>
          <p className="font-color">Transaction ID:-</p>
          {/* <p className="font-color">
            Wallet Address: 
            
          </p> */}
        </div>
        <Link style={{textDecoration: 'underline'}} type="primary" href={whatsappLink} target="_blank">
          Send Details on WhatsApp
        </Link>
      </div>
    </Modal>
  );
}

export { DepositMoneyModal };
