// // PayPalPaymentButton.js
// import React from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const PayPalPaymentButton = () => {
//   return (
//     <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
//       <div>
//         {/* <h2>Product: Your Product Name</h2> */}
//         <p>Price: $100.00</p>
//         <PayPalButtons
//           createOrder={(data, actions) => {
//             return actions.order.create({
//               purchase_units: [
//                 {
//                   amount: {
//                     value: "100.00", // Replace with your product's price
//                   },
//                 },
//               ],
//             });
//           }}
//           onApprove={(data, actions) => {
//             return actions.order.capture().then(function (details) {
//               // Payment is successful
//               alert(
//                 "Transaction completed by " + details.payer.name.given_name
//               );
//             });
//           }}
//         />
//       </div>
//     </PayPalScriptProvider>
//   );
// };

// export default PayPalPaymentButton;
