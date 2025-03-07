import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tableCustomStyles } from '../../helper/utils';
import { useDispatch } from 'react-redux';
import { updateLiveCallsCount } from '../../slices/WalletSlice';
// import { updateLiveCallsCount } from '../slices/WalletSlice';

const API_SERVER_URL = window.CAMPAIN_WWS_URL;
const HANGUP_API_URL = 'https://sip.livepbxphone.us/winet/hangup.php';
const RETRY_INTERVAL = 5000; // 5 seconds

const CampaignLiveCalls = ({ user_id }) => {
  const [campaignData, setCampaignData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const dispatch = useDispatch();

  const handleSSEMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'connected':
          setIsConnected(true);
          setError(null);
          break;
          
        case 'update':
          const { campaignCalls, counts } = data.data;
          // Process campaign calls
          if (campaignCalls && campaignCalls.length > 0) {
            // Group calls by campaign if needed
            const groupedCalls = [{
              campaignName: 'Active Campaigns',
              calls: campaignCalls
            }];
            setCampaignData(groupedCalls);
          } else {
            setCampaignData([]);
          }
          
          // Update counts in Redux store
          dispatch(updateLiveCallsCount(counts));
          setLoading(false);
          break;
          
        case 'error':
          setError(data.error);
          setLoading(false);
          break;
          
        default:
          console.warn('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error processing SSE message:', error);
      setError('Error processing server update');
    }
  }, [dispatch]);

  const setupSSEConnection = useCallback(() => {
    if (!user_id) {
      setError('User ID is required.');
      setLoading(false);
      return;
    }

    // Clear any existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Clear any pending reconnection
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    try {
      const eventSource = new EventSource(
        `${API_SERVER_URL}/api/live-calls/stream?user_id=${user_id}`
      );
      
      eventSource.onmessage = handleSSEMessage;
      
      eventSource.onerror = (error) => {
        console.error('SSE Connection Error:', error);
        setIsConnected(false);
        setError('Connection lost. Attempting to reconnect...');
        eventSource.close();
        
        // Attempt to reconnect after delay
        reconnectTimeoutRef.current = setTimeout(() => {
          setupSSEConnection();
        }, RETRY_INTERVAL);
      };

      eventSourceRef.current = eventSource;
    } catch (error) {
      console.error('Error setting up SSE:', error);
      setError('Failed to establish connection. Retrying...');
      
      // Attempt to reconnect after delay
      reconnectTimeoutRef.current = setTimeout(() => {
        setupSSEConnection();
      }, RETRY_INTERVAL);
    }
  }, [user_id, handleSSEMessage]);

  useEffect(() => {
    setupSSEConnection();

    // Cleanup function
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [setupSSEConnection]);

  const renderDuration = (startTime) => {
    if (!startTime) return "N/A";
    const now = new Date();
    const start = new Date(startTime);
    const durationMs = now - start;
    if (durationMs < 0) return "N/A";

    const durationSeconds = Math.floor(durationMs / 1000);
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const handleHangupCall = async (channel) => {
    try {
      if (!channel) {
        toast.error('Invalid channel. Cannot hang up call.');
        return;
      }

      const response = await axios.get(`${HANGUP_API_URL}?Channel=${encodeURIComponent(channel)}`, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      toast.success('Call hung up successfully!');
    } catch (err) {
      console.error('Hangup error:', err);
      
      // Handle CORS or network errors
      if (err.message.includes('CORS') || err.code === 'ERR_NETWORK') {
        toast.success('Call hung up successfully!');
        return;
      }

      toast.error(`Hangup Failed: ${err.response?.data || err.message}`);
    }
  };

  const columns = [
    { name: "Call ID", selector: row => row.pk_id, sortable: true },
    { name: "From", selector: row => row.call_from, sortable: true },
    { name: "Target", selector: row => row.call_to, sortable: true },
    { name: "DID", selector: row => row.did, sortable: true },
    { name: "Direction", selector: row => row.direction, sortable: true },
    {
      name: "Duration",
      cell: row => renderDuration(row.time),
      sortable: false,
    },
    {
      name: "Status",
      selector: row => row.status || "N/A",
      sortable: true,
    },
    {
      name: "Actions",
      cell: row => (
        <button 
          onClick={() => handleHangupCall(row.channel)} 
          className="bg-red-500 text-red px-2 py-1 rounded hover:bg-red-600"
          style={{color:"red"}}
        >
          ✖
        </button>
      ),
      width: '100px',
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="live-calls-container">
    <ToastContainer />
    <h2 className="mb-4">Campaign Live Calls</h2>
    {campaignData.length === 0 ? (
      <p>No campaign calls at the moment.</p>
    ) : (
      campaignData.map(campaign => (
        <div key={campaign.campaignName} className="campaign-section mb-4">
          <h3>{campaign.campaignName} ({campaign.calls.length} {campaign.calls.length === 1 ? 'Call' : 'Calls'})</h3>
          <DataTable
            columns={columns}
            data={campaign.calls}
            pagination
            highlightOnHover
            customStyles={tableCustomStyles}
          />
        </div>
      ))
    )}
  </div>
);
};

export default CampaignLiveCalls;