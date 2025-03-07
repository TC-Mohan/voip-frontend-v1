import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../helper/utils";
import ReactLoading from "react-loading";
import io from 'socket.io-client';
import LiveCallsDisplay from "./boilerPlat/LiveCallsDisplay";
import { DecryptToken } from "../helper/Constants";
// import FinalCallTbls from "./live-calls/FinalCallTbls";
import CampaignLiveCalls from "./live-calls/CampaignLiveCall"


function LiveSummary({ bargeCall, whisperCall, listenCall }) {
  const [activeTab, setActiveTab] = useState("live-calls");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  // useEffect(() => {
  //   const newSocket = io(SERVER_URL, {
  //     withCredentials: true,
  //     transports: ['websocket']
  //   });

  //   newSocket.on('connect', () => {
  //     console.log('Connected to WebSocket server');
  //     setConnectionStatus('Connected');
  //     setIsLoading(false);
  //   });

  //   newSocket.on('disconnect', () => {
  //     console.log('Disconnected from WebSocket server');
  //     setConnectionStatus('Disconnected');
  //     setIsLoading(true);
  //   });

  //   newSocket.on('connect_error', (error) => {
  //     console.error('Connection error:', error);
  //     setConnectionStatus('Error: ' + error.message);
  //     setIsLoading(false);
  //   });

  //   newSocket.on('allCallsUpdate', (calls) => {
  //     console.log('Received live call update', calls);
  //     const formattedCalls = calls.map(call => ({
  //       call_from: { callerId: call.callerIdNum, channel: call.channel },
  //       called_to: { callerId: call.destinationNumber, channel: call.channel },
  //       status: call.status,
  //       uniqueId: call.uniqueId,
  //       duration: "N/A" // You might want to calculate this based on call start time
  //     }));
  //     setData(formattedCalls);
  //   });

  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  // const Live_calls_data = [
  //   // {
  //   //   name: "ACTION",
  //   //   center: true,
  //   //   sortable: false,
  //   //   selector: "null",
  //   //   cell: (row) => [
  //   //     <button
  //   //       key="barge"
  //   //       type="button"
  //   //       className="btn btn-sm btn-outline-warning"
  //   //       onClick={() => handleBargeCall(row.call_from.callerId)}
  //   //     >
  //   //       Barge Call
  //   //     </button>,
  //   //     <button
  //   //       key="whisper"
  //   //       type="submit"
  //   //       className="btn btn-sm btn-outline-warning"
  //   //       onClick={() => handleWhisperCall(row.call_from.callerId)}
  //   //     >
  //   //       Whisper Call
  //   //     </button>,
  //   //     <button
  //   //       key="receive"
  //   //       type="submit"
  //   //       className="btn btn-sm btn-outline-warning"
  //   //       onClick={() => handleReceiveCall(row.call_from.callerId)}
  //   //     >
  //   //       Receive Calls
  //   //     </button>,
  //   //   ],
  //   // },
  //   {
  //     name: "From",
  //     sortable: true,
  //     selector: (row) => row.call_from.callerId,
  //   },
  //   {
  //     name: "To",
  //     selector: (row) => row.called_to.callerId,
  //     sortable: true,
  //   },
    
  //   {
  //     name: "Extensions",
  //     sortable: true,
  //     selector: (row) => `${row.call_from.callerId} to ${row.called_to.callerId}`,
  //   },
  //   {
  //     name: "Duration",
  //     selector: "duration",
  //     sortable: true,
  //   },
  // ];

  // const handleBargeCall = (callerId) => {
  //   // Add logic for barge call
  //   console.log("Barge call initiated for:", callerId);
  // };

  // const handleWhisperCall = (callerId) => {
  //   // Add logic for whisper call
  //   console.log("Whisper call initiated for:", callerId);
  // };

  // const handleReceiveCall = (callerId) => {
  //   // Add logic for receive call
  //   console.log("Receive call initiated for:", callerId);
  // };

  // const filteredData = data.filter((item) =>
  //   Object.values(item).some((value) =>
  //     String(value).toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  
  const userToken = localStorage.getItem("psx_token");
  const decodedToken = DecryptToken(userToken);

  return (
    <main id="main" className="main">
      <section>
        <div className="card">
          <div className="card-body">
          {/* {decodedToken?.userId ? 
          <LiveCallsDisplay userId={decodedToken?.userId}/>
          :"" } */}
            <ul
              className="nav nav-tabs nav-tabs-bordered d-flex"
              id="borderedTabJustified"
              role="tablist"
            >
              <li className="nav-item flex-fill" role="presentation">
                <button
                  className={`nav-link w-100 ${
                    activeTab === "live-calls" && "active"
                  }`}
                  onClick={() => handleTabChange("live-calls")}
                >
                  Live Calls
                </button>
              </li>
            </ul>
            <div className="tab-content pt-2" id="borderedTabJustifiedContent">
              <div
                className={`tab-pane fade ${
                  activeTab === "live-calls" && "show active"
                }`}
                id="bordered-justified-campaign"
                role="tabpanel"
                aria-labelledby="campaign-tab"
              >
                {/* <p>Connection Status: {connectionStatus}</p> */}
                
                {decodedToken?.user_id ? <CampaignLiveCalls user_id={decodedToken?.user_id} /> :""}
                
                {/* {isLoading && (
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
                  <div className="datatable">
                    <DataTable
                      columns={Live_calls_data}
                      data={filteredData}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={true}
                      pagination
                      highlightOnHover
                      customStyles={tableCustomStyles}
                    />
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LiveSummary;