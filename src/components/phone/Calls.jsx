import React from "react";
import DataTable from "react-data-table-component";
import { recentcallcolumns, recentcalldata } from "./PhoneData";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { CallGETAPI } from "../../helper/Constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBalance } from "../../slices/WalletSlice";
import { tableCustomStyles } from "../../helper/utils";
import moment from "moment-timezone";
import ReactLoading from "react-loading";
import CallMadeIcon from "@mui/icons-material/CallMade"; 
import CallReceivedIcon from "@mui/icons-material/CallReceived"; 
import MissedCallIcon from "@mui/icons-material/PhoneMissed"; 
import { paginationConfig } from "../global/paginationUtils";
function Calls() {
  const handleButtonClick = () => {
    window.open("https://livepbxphone.us//", "_blank");
  };


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalsCalls, setTotalsCalls] = useState(0);
  const [incomingCalls, setIncomingCalls] = useState(0);
  const [outgoingCalls, setOutgoingCalls] = useState(0);
  const [missedCalls, setMissedCalls] = useState(0);
  const [averageCalls, setAverageCalls] = useState(0);
  // const phoneNumber = useSelector((state) => state.wallet.userId);

  const sip = useSelector((state) => state.wallet.userId);
  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sip) {
          return "";
        }
        setIsLoading(true);
        
        // Fetch call data
        const response = await CallGETAPI(`api/get-cdr-Call-Extension?user_id=${sip}`);
        console.log(response, "check user id api ");
        const CDRData = response?.data?.data?.calls || [];
        setData(CDRData);
  
        // Fetch call summary
        const summaryResponse = await CallGETAPI(`api/get-cdr-Call-Extension?user_id=${sip}`);
        const summaryData = summaryResponse.data?.data;
  
        setTotalsCalls(summaryData.total.count);
        setIncomingCalls(summaryData.incoming.count);
        setOutgoingCalls(summaryData.outgoing.count);
        setMissedCalls(summaryData.missed.count);
        setAverageCalls(summaryData.total.duration);
  
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [sip]); // Fetch data when 'sip' changes
  

  const formatTime = (time) => {
    return moment(time, "HH:mm:ss").format("hh:mm A"); // Convert time to 12-hour format with AM/PM
  };

  const callhistorycolumns = [
   
    {
      name: "Type",
      // selector: "direction",
      selector: row => row.direction,

      cell: (data) => {
        if (data.direction === "inbound" && (data.status === "CANCEL" || data.status === "NOANSWER" || data.status === "CHANUNAVAIL")) {
          return <MissedCallIcon style={{ color: "red" }} />; // Missed inbound call
        } else if (data.direction === "inbound") {
          return <CallReceivedIcon style={{ color: "blue" }} />; // Answered incoming call
        } else if (data.direction === "outbound") {
          return <CallMadeIcon style={{ color: "green" }} />; // Outgoing call
        }
        return null; 
      },
    },
    

    {
      name: "Number",
      // selector: "did",
      selector: row => row.did,

      sortable: true,
      width: "15%",
      // cell: (d) => (
      //     <p class="align-text-bottom text-nowrap">
      //         {d.id}
      //         <button type="submit" class=" btn btn-sm btn-outline-warning"><i class="fa-regular fa-copy "></i></button>
      //     </p>
      // )
      // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
    },
    {
      name: "call_from ",
      // selector: "call_from",
      selector: row => row.call_from,

      sortable: true,
    },
    {
      name: "call_to ",
      // selector: "call_to",
      selector: row => row.call_to,

      sortable: true,
    },
    // {
    //   name: "Channel",
    //   selector: "channel",
    //   sortable: true,
    //   format: (row) => {
    //     if (row.channel.length > 6) {
    //       return row.channel.substring(6);
    //     } else {
    //       return row.channel;
    //     }
    //   },
    // },

    {
      name: "DURATION",
      // selector: "dur",
      selector: row => row.dur,

      sortable: true,
      cell: (d) => {
        const durationInSeconds = parseInt(d.dur) || 0; // यदि d.dur undefined या NaN है तो 0 लें
        
        if (durationInSeconds === 0) {
          return <p className="align-text-bottom text-nowrap">0 sec</p>;
        }
        
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
    
        return (
          <p className="align-text-bottom text-nowrap">
            {hours > 0 ? `${hours} hr ` : ''}
            {minutes > 0 ? `${minutes} min ` : ''}
            {seconds > 0 || (hours === 0 && minutes === 0) ? `${seconds} sec` : ''}
          </p>
        );
      },
    },

    {
      name: "Date",
      // selector: "start_time",
      selector: row => row.start_time,

      sortable: true,
      format: (row) => {
        const dateTime = row.start_time.split("-"); // Split the string by hyphens
        const datePart = `${dateTime[0]}-${dateTime[1]}-${dateTime[2]}`; // Extract the date part
        return moment(datePart).format("DD-MM-YYYY"); // Format to desired date format
      },
    },
    

    {
      name: "TIME",
      // selector: "start_time",
      selector: row => row.start_time,

      sortable: true,
      format: (row) => {
        const timePart = row.start_time.split("-")[3]; // Extract the time part
        return formatTime(timePart); // Format time using a helper function
      },
    }
     
    

  ];
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong className="border-bottom border-3 pb-2">
                  Phone Dashboard
                </strong>
              </h3>
              <div
                className="tab-content pt-2"
                id="borderedTabJustifiedContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="bordered-justified-campaign"
                  role="tabpanel"
                  aria-labelledby="campaign-tab"
                ></div>
              </div>
              <div className="mb-5 col-md-12 text-end mt-3 ">
                <Link to="/manage-users" className="btn btn-outline-dark">
                  <i class="fa-solid fa-users"></i> Manage Users
                </Link>

                <span> </span>
                {/* <Link to="/dial-pad" class="btn btn-outline-dark ">
                                <i class="fa-solid fa-phone"></i> Open your
                                phone
                              </Link> */}
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                      <div>
                        <div className="mb-3 col-md-12 d-flex justify-content-between">
                          <div class="card">
                            <div class="card-body text-start p-4">
                              {/* <h6 class="card-text">
                                All calls over the last 30 days
                              </h6> */}
                              <h6 class="card-text">
                                All calls 
                              </h6>
                              <h1 class="card-text ">{totalsCalls}</h1>
                              <Link to="/dial-pad" class="btn btn-outline-dark mt-5">
                                <i class="fa-solid fa-phone"></i> Open your
                                phone
                              </Link>
                            </div>
                          </div>
                          <div class="card" style={{ width: "700px" }}>
                            <div class="card-body text-start p-3">
                           
                              <div className="p-2 border-bottom d-flex align-items-center">
                                <i
                                  class="bi bi-arrow-down-left-circle-fill mb-5"
                                  style={{ fontSize: "1.5rem" }}
                                ></i>
                                <div class="ms-3">
                                  <h6 class="card-text">Incoming Calls</h6>
                                  <h5 class="card-text">{incomingCalls}</h5>
                                  {/* <h6 class="card-text">-% of all calls</h6> */}
                                </div>
                              </div>
                             
                              <br />
                              <div className="p-2 border-bottom d-flex align-items-center">
                                <i
                                  class="bi bi-arrow-up-right-circle-fill mb-5"
                                  style={{ fontSize: "1.5rem" }}
                                ></i>
                                <div class="ms-3">
                                  <h6 class="card-text">Outgoing Calls</h6>
                                  <h5 class="card-text">{outgoingCalls}</h5>
                                  {/* <h6 class="card-text">100% of all calls</h6> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="card" style={{ width: "700px;" }}>
                            <div class="card-body text-start p-3">
                              <div className="p-2 border-bottom d-flex align-items-center">
                                <i
                                  class="bi bi-arrow-down-left-circle-fill mb-5"
                                  style={{ fontSize: "1.5rem", color: "red" }}
                                ></i>
                                <div class="ms-3">
                                  <h6 class="card-text">Missed Calls</h6>
                                  <h5 class="card-text">{missedCalls}</h5>
                                  {/* <h6 class="card-text">
                                    -% of all incoming calls
                                  </h6> */}
                                </div>
                              </div>
                              <br />
                              <div className="p-2 border-bottom d-flex align-items-center">
                                <i
                                  class="bi bi-telephone-inbound-fill mb-5"
                                  style={{ fontSize: "1.5rem" }}
                                ></i>
                                <div class="ms-3">
                                  <h6 class="card-text">
                                    Average call duratiom
                                  </h6>
                                  <h5 class="card-text">{averageCalls}</h5>
                                  {/* <h6 class="card-text">0 picked up calls</h6> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 col-md-12 text-start d-flex">
                        <h4>Recent calls</h4>
                        <Link to="/dial-pad" className="mt-1 ms-3 ">
                          <i class="fa-regular fa-clock ml-4"></i> All Recent
                          calls
                        </Link>
                      </div>
                      {isLoading && (
                        <div className="d-flex justify-content-center my-5">
                          <ReactLoading
                            type="spokes"
                            color="grey"
                            height={50}
                            width={50}
                          />
                        </div>
                      )}
                       {!isLoading && (
                      <div className="main">
                        {/* <iframe
                          src="https://103.113.27.163/webphone/Phone/index.html"
                          width="800"
                          height="600"
                          frameborder="0"
                          scrolling="no"
                        ></iframe> */}
                        <DataTable
                          columns={callhistorycolumns}
                          data={data}
                          searchable
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={true}
                          pagination
                          highlightOnHover
                          dense
                          {...paginationConfig()}

                        />
                      </div>
                       )}
                      <div className="mb-3 col-md-12 text-start">
                        <h3>Download our apps</h3>
                        <div>
                          <div className="mb-3 col-md-12 d-flex justify-content-between">
                            <div class="card" style={{ width: "700px;" }}>
                              <div class="card-body text-start p-3">
                                <div class="row">
                                  <div class="col-md-6">
                                    <h5 class="card-text">
                                      <i class="fa-solid fa-mobile"></i> Mobile
                                      App
                                    </h5>
                                    <h6 class="card-text">
                                      Take Web Phone with you. Be always
                                      reachable.
                                    </h6>
                                  </div>
                                  <div class="col-md-6">
                                    <a
                                      onClick={handleButtonClick}
                                      href="#"
                                      class="btn btn-outline-dark me-2"
                                    >
                                      <i class="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                                      iOS
                                    </a>
                                    <a
                                      href="#"
                                      class="btn btn-outline-dark"
                                      onClick={handleButtonClick}
                                    >
                                      <i class="fa-solid fa-arrow-up-right-from-square"></i>{" "}
                                      Android
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="card" style={{ width: "700px;" }}>
                              <div class="card-body text-start p-3">
                                <div class="row">
                                  <div class="col-md-6">
                                    <h5 class="card-text">
                                      <i class="fa-solid fa-desktop"></i>{" "}
                                      Desktop App
                                    </h5>
                                    <h6 class="card-text">
                                      Never miss a call while on your computer.
                                    </h6>
                                  </div>
                                  <div class="col-md-6">
                                    <a
                                      href="#"
                                      class="btn btn-outline-dark me-2"
                                    >
                                      <i class="fa-sharp fa-solid fa-download"></i>{" "}
                                      Mac
                                    </a>
                                    <a href="#" class="btn btn-outline-dark ">
                                      <i class="fa-sharp fa-solid fa-download"></i>{" "}
                                      Windows
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Calls;
