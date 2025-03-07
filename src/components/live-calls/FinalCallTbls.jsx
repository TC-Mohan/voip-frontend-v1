import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { tableCustomStyles } from '../../helper/utils';
import { paginationConfig } from '../global/paginationUtils';
// import { tableCustomStyles } from '../../helper/utils';
// import { tableCustomStyles } from "../helper/utils";

const SOCKET_SERVER_URL = window.CAMPAIN_WWS_URL;
const API_SERVER_URL = window.CAMPAIN_WWS_URL;

const FinalCallTbls = ({ user_id }) => {
  const [nullCampaignCalls, setNullCampaignCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!user_id) {
  //     setError('User ID is required.');
  //     setLoading(false);
  //     return;
  //   }

  //   fetchLiveCalls(user_id);
  // }, [user_id]);

  // const fetchLiveCalls = (userId) => {
  //   axios.get(`${API_SERVER_URL}/api/live-calls`, { params: { user_id: userId } })
  //     .then((response) => {
  //       const allCalls = response.data;
        
  //       // Filter calls with null campaign_Id
  //       const nullCalls = allCalls.flatMap(campaign => 
  //         campaign.calls.filter(call => call.campaign_Id === "NULL")
  //       );

  //       setNullCampaignCalls(nullCalls);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching live calls:', err);
  //       setError('Failed to fetch live calls.');
  //       setLoading(false);
  //     });

  //   const socket = io(SOCKET_SERVER_URL);
  //   socket.emit('join', userId);

  //   socket.on('liveCalls', (data) => {
  //     const nullCalls = data.flatMap(campaign => 
  //       campaign.calls.filter(call => call.campaign_Id === "NULL")
  //     );

  //     setNullCampaignCalls(nullCalls);
  //   });

  //   socket.on('connect_error', (err) => {
  //     console.error('Socket connection error:', err);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // };


  const handleBargeCall = (callerId) => {
    // Add logic for barge call
    console.log("Barge call initiated for:", callerId);
  };

  const handleWhisperCall = (callerId) => {
    // Add logic for whisper call
    console.log("Whisper call initiated for:", callerId);
  };

  const handleReceiveCall = (callerId) => {
    // Add logic for receive call
    console.log("Receive call initiated for:", callerId);
  };



  const columns = [

    {
      name: "ACTION",
      center: true,
      sortable: false,
      selector: "null",
      cell: (row) => [
        <button
          key="barge"
          type="button"
          className="btn btn-sm btn-outline-warning"
          onClick={() => handleBargeCall(row.call_from.callerId)}
        >
          Barge Call
        </button>,
        <button
          key="whisper"
          type="submit"
          className="btn btn-sm btn-outline-warning"
          onClick={() => handleWhisperCall(row.call_from.callerId)}
        >
          Whisper Call
        </button>,
        <button
          key="receive"
          type="submit"
          className="btn btn-sm btn-outline-warning"
          onClick={() => handleReceiveCall(row.call_from.callerId)}
        >
          Receive Calls
        </button>,
      ],
    },
    {
      name: "Call ID",
      selector: row => row.pk_id,
      sortable: true,
    },
    {
      name: "From",
      selector: row => row.call_from,
      sortable: true,
    },
    {
      name: "To",
      selector: row => row.call_to,
      sortable: true,
    },
    {
      name: "DID",
      selector: row => row.did,
      sortable: true,
    },
    {
      name: "Direction",
      selector: row => row.direction,
      sortable: true,
    },
    // {
    //   name: "Campaign ID",
    //   selector: row => row.campaign_Id,
    //   sortable: true,
    // },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="live-calls-container">

      {nullCampaignCalls.length === 0 ? (
        <p>No live calls without campaign ID at the moment.</p>
      ) : (
        <div className="campaign-section">
          {/* <h3>
            Unassigned Calls ({nullCampaignCalls.length})
          </h3> */}
          <DataTable
            columns={columns}
            data={nullCampaignCalls}
            pagination
            highlightOnHover
            customStyles={tableCustomStyles}
            {...paginationConfig()}

          />
        </div>
      )}
    </div>
  );
};

export default FinalCallTbls;