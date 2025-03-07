import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../helper/Constants";

const SuccessPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const itemPrice = "300.00";
const itemCurrency = "USD";
const itemQuantity = 2;

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const url = BASE_API +"/success";
        const config = {
          method: "POST",
          
          body: JSON.stringify({
            paymentId: getQueryParam("paymentId"),
            PayerID: getQueryParam("PayerID"),
            itemPrice,
      itemCurrency,
      itemQuantity,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, config);
        if (response.data.status) {
          // console.log(response.data.data);
          setPaymentData(response.data.data);
        } else {
          console.error(response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPaymentData();
  }, []);

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  };
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1 style={{ marginTop: "61px" }}>Your payment has been Success!</h1>
      </div>
    </main>
  );
};

export default SuccessPage;
