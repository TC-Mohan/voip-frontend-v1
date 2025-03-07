import React, { useState, useEffect } from "react";

import ReactLoading from "react-loading";
import { BASE_API, CallPOSTAPI, CallGETAPI } from "../helper/Constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Footer";
import { Button } from "react-bootstrap";
import { Table } from "antd";
import { TransferfundModal } from "./TransferfundModal";
import { DecryptToken } from "../helper/Constants";
import moment from "moment-timezone";
import { DepositMoneyModal } from "./DepositMoneyModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchBalance, addMoney, spendMoney, fetchWalletBalance } from "../slices/WalletSlice";

const Wallet = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showtransferModal, setshowtransferModal] = useState(false);
  const [showDepositModal, setshowDepositModal] = useState(false);
  const userToken = localStorage.getItem("psx_token");
  const decodedToken = DecryptToken(userToken);
  const dispatch = useDispatch();
  // console.log(">>>>>>>>>>>", decodedToken, decodedToken.user_id);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY");
      },
    },

    {
      title: "Amount",
      dataIndex: "amount",
    },

    // {
    //   title: "Type",
    //   dataIndex: "transaction_id",
    // },

    {
      title: "Description",
      dataIndex: "description",
    },

    {
      title: "Status",
      dataIndex: "status",
    },
    // {
    //   title: "Type",
    //   dataIndex: "type",
    //   render: (type, record) => {
    //     return record.sender_id === decodedToken.user_id
    //       ? "Debited"
    //       : "Credited";
    //   },
    // },
    // {
    //   title: "Reference Account",
    //   dataIndex: "",
    //   render: (type, record) => {
    //     return record.sender_id === decodedToken.user_id
    //       ? record.receiver_id
    //       : record.sender_id;
    //   },
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    // },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const userId = decodedToken.user_id; // Get user_id from the decoded token
      const response = await CallGETAPI(`api/get-user-transaction?user_id=${userId}`); // Include user_id in the API call
      console.log(response,"check wallet api")
      setData(response.data?.transactions);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const balance = useSelector((state) => state.wallet.balance);
  const firstName = useSelector((state) => state.wallet.firstName);

  useEffect(() => {
    // Use fetchWalletBalance instead of fetchBalance
    dispatch(fetchWalletBalance());
  }, [dispatch]);

  // console.log(data);

  const filteredData = data?.data?.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      {" "}
      <main id="main" className="main">
        <div
          className="pagetitle"
          // style={{ paddingRight: "60%", fontWeight: "bold",fontSize:"medium", }}
        >
          <h3 style={{fontSize:"medium",fontWeight:"bold",display:"flex"}}>Hello {firstName}, Welcome to Your Wallet</h3>
        </div>
        <section>
          <div className="card">
            <div className="card-body mt-3">
              <h1></h1>
              {/* Bordered Tabs Justified */}
              <div className="container-fluid ">
                <div className="row">
                  <div className="col-6 d-flex justify-content-start ">
                    <i class="fa fa-wallet"></i>
                    <div className="row">
                      <div className="row-6">Balance</div>
                      <div className="row-6">{balance}</div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-end ">
                    <div>
                      <Button
                        variant="warning"
                        size="lg"
                        onClick={() => setshowDepositModal(true)}
                      >
                        Deposit Money
                      </Button>
                    </div>
                    {showDepositModal && (
                      <DepositMoneyModal
                        showDepositModal={showDepositModal}
                        setshowDepositModal={setshowDepositModal}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* <div>
                <Button
                  onClick={() => setshowtransferModal(true)}
                  variant="success"
                >
                  Send Money{" "}
                </Button>
              </div> */}
              {showtransferModal && (
                <TransferfundModal
                  showtransferModal={showtransferModal}
                  setshowtransferModal={setshowtransferModal}
                />
              )}

              <div
                className="container-fluid mt-4 "
                style={{ color: "blue", marginTop: "12%", textAlign: "start" }}
              >
                <div className="row">
                  <h5>All Transaction History</h5>
                </div>
              </div>
              {isLoading && (
                <div
                  className="d-flex justify-content-center my-5"
                  style={{ marginTop: "20px" }}
                >
                  <ReactLoading
                    type="spokes"
                    color="grey"
                    height={50}
                    width={50}
                  />
                </div>
              )}

              {!isLoading && (
                <div>
                  <Table columns={columns} dataSource={data} className="mt-2" />
                </div>
              )}
              {/* End Bordered Tabs Justified */}
            </div>
          </div>
        </section>
      </main>
      {/* <Footer></Footer> */}
    </>
  );
};

export { Wallet };
