// import React from "react";
// import DataTable from "react-data-table-component";

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { CallGETAPI } from "../../helper/Constants";
// import { fetchBalance } from "../../slices/WalletSlice";
// import { tableCustomStyles } from "../../helper/utils";
// import moment from "moment-timezone";
// import ReactLoading from "react-loading";
// import { CSVLink } from "react-csv";

// function Callhistory() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);

//   // Function to export call history data

//   const sip = useSelector((state) => state.wallet.extension_number);
//   useEffect(() => {
//     dispatch(fetchBalance());
//   }, [dispatch]);

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await CallGETAPI(`api/call-history-v2/?extension=${sip}`);
//       // console.log({ response });
//       const CDRData = response?.data?.data || [];
//       setData(CDRData);
//       // console.log(setData);
//       setIsLoading(false);
//     } catch (error) {
//       // console.log(error.message);
//       console.error("Error fetching data:", error);
//       setIsLoading(false);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const formatTime = (dateString) => {
//     const time = moment(dateString).subtract(5, 'hours').subtract(30, 'minutes');
//     return time.format("hh:mm:ss A");
//   };

//   const callhistorycolumns = [
//     {
//       name: "Number",
//       selector: "src",
//       sortable: true,
//       width: "15%",
//       // cell: (d) => (
//       //     <p class="align-text-bottom text-nowrap">
//       //         {d.id}
//       //         <button type="submit" class=" btn btn-sm btn-outline-warning"><i class="fa-regular fa-copy "></i></button>
//       //     </p>
//       // )
//       // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
//     },
//     {
//       name: "Called To ",
//       selector: "dst",
//       sortable: true,
//     },
//     // {
//     //   name: "Channel",
//     //   selector: "channel",
//     //   sortable: true,
//     //   format: (row) => {
//     //     if (row.channel.length > 6) {
//     //       return row.channel.substring(6);
//     //     } else {
//     //       return row.channel;
//     //     }
//     //   },
//     // },

//     {
//       name: "DURATION",
//       selector: "duration",
//       sortable: true,
//       cell: (d) => {
//         const durationInSeconds = d.duration;
//         const hours = Math.floor(durationInSeconds / 3600);
//         const minutes = Math.floor((durationInSeconds % 3600) / 60);
//         const seconds = durationInSeconds % 60;

//         return (
//           <p className="align-text-bottom text-nowrap">
//             {`${hours > 0 ? hours + " hr " : ""}${minutes} min ${seconds} sec`}
//             <svg height={24}>
//               <circle cx="12" cy="12" r="5" fill="green" />
//             </svg>
//           </p>
//         );
//       },
//     },

//     {
//       name: "Date",
//       selector: "calldate",
//       sortable: true,
//       format: (row) => moment(row.calldate).format("DD-MM-YYYY"),
//     },

//     {
//       name: "TIME",
//       selector: "calldate",
//       sortable: true,
//       format: (row) => formatTime(row.calldate),
//     },
//   ];

//   return (
//     <>
//       <main id="main" className="main">
//         <div className="pagetitle">
//           <nav>
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item">
//                 <Link to="/dashboard">Home</Link>
//               </li>
//               <li className="breadcrumb-item active">Call History</li>
//             </ol>
//           </nav>
//         </div>
//         <section className="section dashboard">
//           <div className="card">
//             <div className="card-body mt-3">
//               <h3>
//                 <strong className="border-bottom border-3 pb-2">
//                   Call History
//                 </strong>
//               </h3>

//               <div
//                 className="tab-content pt-2"
//                 id="borderedTabJustifiedContent"
//               >
//                 <div
//                   className="tab-pane fade show active"
//                   id="bordered-justified-campaign"
//                   role="tabpanel"
//                   aria-labelledby="campaign-tab"
//                 ></div>
//               </div>
//               <div className="mb-3 col-md-12 text-end mt-4">
//                 {data.length > 0 && (
//                   <CSVLink
//                     data={data}
//                     filename={"call_history.csv"}
//                     className="btn btn-outline-dark"
//                     onClick={() => fetchData()}
//                   >
//                     <i className="fa-sharp fa-solid fa-download"></i> Export
//                     call History
//                   </CSVLink>
//                 )}

//                 <span> </span>
//                 <Link to="/dial-pad" className="btn btn-outline-dark">
//                   <i className="fa-solid fa-phone"></i> Open your phone
//                 </Link>
//               </div>
//               <div className="card" style={{ boxShadow: "none" }}>
//                 <div className="card-body" style={{ padding: 0 }}>
//                   <div className="container-fluid d-flex justify-content-center">
//                     <div className="w-100">
//                       {isLoading && (
//                         <div className="d-flex justify-content-center my-5">
//                           <ReactLoading
//                             type="spokes"
//                             color="grey"
//                             height={50}
//                             width={50}
//                           />
//                         </div>
//                       )}
//                       {!isLoading && (
//                         <div className="main">
//                           {/* <DataTable
//                           className="border-top border-1 mt-4"
//                           columns={callhistorycolumns}
//                           data={data}
//                           searchable
//                           noHeader
//                           defaultSortField="id"
//                           // sortIcon={<SortIcon />}
//                           defaultSortAsc={true}
//                           pagination
//                           highlightOnHover
//                           dense
//                         /> */}
//                           <DataTable
//                             columns={callhistorycolumns}
//                             data={data}
//                             noHeader
//                             defaultSortField="id"
//                             // sortIcon={<SortIcon />}
//                             defaultSortAsc={true}
//                             pagination
//                             highlightOnHover
//                             // dense
//                             overflowY
//                             customStyles={tableCustomStyles}

//                             // customStyle={tableCustomStyles}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

// export default Callhistory;

import React from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CallGETAPI } from "../../helper/Constants";
import { fetchBalance } from "../../slices/WalletSlice";
import { tableCustomStyles } from "../../helper/utils";
import moment from "moment-timezone";
import ReactLoading from "react-loading";
import { CSVLink } from "react-csv";
import { DatePicker, Space } from "antd";
import CallMadeIcon from "@mui/icons-material/CallMade"; 
import CallReceivedIcon from "@mui/icons-material/CallReceived"; 
import MissedCallIcon from "@mui/icons-material/PhoneMissed"; 
import TableComponent2 from "./TableComponent2";
import { paginationConfig } from "../global/paginationUtils";

const { RangePicker } = DatePicker;

function Callhistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const sip = useSelector((state) => state.wallet.userId);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const fetchData = async (start, end) => {
    try {
      
      if(!sip){
        return "";
      }
      setIsLoading(true);
      let url = `api/get-cdr-Call-Extension?user_id=${sip}`;
      if (start && end) {
        url += `&startDate=${start}&endDate=${end}`;
      }
      const response = await CallGETAPI(url);
      const CDRData = response?.data?.data?.calls || [];
      setData(CDRData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const formattedStartDate = startDate ? startDate.format("YYYY-MM-DD HH:mm:ss") : null;
    const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD HH:mm:ss") : null;
    fetchData(formattedStartDate, formattedEndDate);
  }, [startDate, endDate]);

  const handleDateChange = (dates) => {
    setStartDate(dates ? dates[0] : null);
    setEndDate(dates ? dates[1] : null);
  };

  const formatTime = (time) => {
    return moment(time, "HH:mm:ss").format("hh:mm A"); // Convert time to 12-hour format with AM/PM
  };
  const callHistoryColumns = [
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
    },
    {
      name: "Recording",
      selector: row => row.record_url,
      sortable: false,
      width: "30%",
      cell: (row) => (
          <TableComponent2 data={row} showDetails={false} /> // Sirf recording show karega
      )
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
              <li className="breadcrumb-item active">Call History</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong className="border-bottom border-3 pb-2">
                  Call History
                </strong>
              </h3>

              <div className="tab-content pt-2" id="borderedTabJustifiedContent">
                <div className="tab-pane fade show active" id="bordered-justified-campaign" role="tabpanel" aria-labelledby="campaign-tab"></div>
              </div>
              <div className="mb-3 col-md-12 text-end mt-4">
                <div className="date-picker-container mb-3">
                  <Space direction="vertical" size={12}>
                    <RangePicker
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={handleDateChange}
                    />
                  </Space>
                </div>
                {data.length > 0 && (
                  <CSVLink
                    data={data}
                    filename={"call_history.csv"}
                    className="btn btn-outline-dark"
                  >
                    <i className="fa-sharp fa-solid fa-download"></i> Export call History
                  </CSVLink>
                )}
                <span> </span>
                <Link to="/dial-pad" className="btn btn-outline-dark">
                  <i className="fa-solid fa-phone"></i> Open your phone
                </Link>
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
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
                          <DataTable
                            columns={callHistoryColumns}
                            data={data}
                            noHeader
                            defaultSortField="id"
                            defaultSortAsc={true}
                            pagination
                            highlightOnHover
                            overflowY
                            customStyles={tableCustomStyles}
                            {...paginationConfig()}
                          />
                        </div>
                      )}
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

export default Callhistory;

