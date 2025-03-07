import React, { useState } from "react";
import { Form, Modal } from "antd";
import { CallGETAPI, CallPOSTAPI } from "../helper/Constants";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
function TransferfundModal({
  showtransferModal,
  setshowtransferModal,
  reloadData,
}) {
  const [formData, setFormData] = useState({
    receiver_id: Number,
    amount: Number,
    description: "",
    status: "success",
  });

  const [message, setMessage] = useState("");

  const verifyaccount = async () => {
    try {
      const response = await CallGETAPI(
        `api/get-user-by-id/${formData.receiver_id}`
      );
      // console.log(">>>>>", response);
      setMessage(response.data.message);

      if (response.status) {
        setMessage(response?.data?.message);
      } else {
        setMessage(response?.data?.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CallPOSTAPI(`api/user-transaction`, formData);
      // console.log(">>>>>", response);

      if (response.status) {
        // console.log("Data saved successfully!");
        setFormData({
          receiver_id: "",
          amount: "",
          description: "",
          status: "success",
        });

        // console.log(setFormData);
        toast.success("Transaction Successfully");
      } else {
        toast.error("Transaction Failed.");
        console.error("Failed to save data.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Modal
        title="Transfer Funds"
        open={showtransferModal}
        onCancel={() => setshowtransferModal(false)}
        footer={null}
      >
        <form onSubmit={handlesubmit}>
          <div className="d-flex gap-2 align-items-center row">
            <div>
              <input
                type="number"
                className="form-control"
                name="receiver_id"
                value={formData.receiver_id}
                onChange={handlechange}
              ></input>
            </div>
            <div className="col-4">
              <button
                className="btn btn-primary w-50  mt-1"
                type="button"
                onClick={verifyaccount}
              >
                Verify
              </button>
            </div>
          </div>
          {message === "true" && (
            <div
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px",
                borderRadius: "3px",
              }}
            >
              {setMessage}
            </div>
          )}
          {message === "false" && (
            <div
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px",
                borderRadius: "3px",
              }}
            >
              {setMessage}
            </div>
          )}
          <div>
            <input
              type="number"
              className="form-control form-group w-100 mt-3"
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handlechange}
              id="amount"
            ></input>
          </div>
          <div>
            <input
              type="text"
              className="form-control form-group w-100 mt-3"
              label="description"
              name="description"
              id="description"
              value={formData.description}
              onChange={handlechange}
            ></input>
          </div>
          <div className="d-flex justify-content-end gap-2 ">
            <button className="btn btn-primary w-20  mt-1" type="button">
              Cancel
            </button>
            <button className="btn btn-primary w-20  mt-1" type="submit">
              Transfer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// export default TransferfundModal;
export { TransferfundModal };
