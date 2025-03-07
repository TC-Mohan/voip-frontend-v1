import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSIPProvider } from "react-sipjs";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from "react-data-table-component";
import { tableCustomStyles } from '../../helper/utils';
import { useDispatch } from 'react-redux';
import { updateLiveCallsCount } from '../../slices/WalletSlice';

const API_SERVER_URL = window.CAMPAIN_WWS_URL;
const RETRY_INTERVAL = 5000; // 5 seconds

const LiveCalls = ({ 
  userId = '', 
  userType = 2, 
  BargeCall,
  WhisperCall,
  ListenCall,
  onTotalLiveCallsUpdate,
  sipData = {}
}) => {
  const [extensionCalls, setExtensionCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const dispatch = useDispatch();

  const {
    sessionManager,
    connectStatus,
    CONNECT_STATUS
  } = useSIPProvider();

  const handleSSEMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'connected':
          setIsConnected(true);
          setError(null);
          break;
          
        case 'update':
          const { extensionCalls, counts } = data.data;
          setExtensionCalls(extensionCalls);
          dispatch(updateLiveCallsCount(counts.extensionCallsCount));
          
          if (onTotalLiveCallsUpdate) {
            onTotalLiveCallsUpdate(counts.totalCallsCount);
          }
          
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
  }, [dispatch, onTotalLiveCallsUpdate]);

  const setupSSEConnection = useCallback(() => {
    if (!userId) {
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
        `${API_SERVER_URL}/api/live-calls/stream?user_id=${userId}`
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
  }, [userId, handleSSEMessage]);

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

  const columns = [
    { name: "Call ID", selector: row => row.pk_id, sortable: true },
    { name: "From", selector: row => row.call_from, sortable: true },
    { name: "To", selector: row => row.did, sortable: true },
    { 
      name: "Status", 
      cell: row => (
        <span className={`badge ${row.status.toLowerCase() === 'ringing' ? 'bg-warning' : 'bg-success'}`}>
          {row.status}
        </span>
      ),
      sortable: true 
    },
    { name: "Extension", selector: row => row.ext_number, sortable: true },
    {
      name: "Duration",
      cell: row => renderDuration(row.time),
      sortable: false,
    },
    {
      name: "Actions",
      cell: row => (
        <div className="btn-group" role="group">
          <button 
            className="btn btn-sm btn-primary mr-1" 
            onClick={() => BargeCall(row.ext_number)}
          >
            Barge
          </button>
          <button 
            className="btn btn-sm btn-info mr-1" 
            onClick={() => WhisperCall(row.ext_number)}
          >
            Whisper
          </button>
          <button 
            className="btn btn-sm btn-secondary" 
            onClick={() => ListenCall(row.ext_number)}
          >
            Listen
          </button>
        </div>
      ),
      width: '250px',
      sortable: false,
    },
  ];

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // Filter out the current user's extension if needed
  const filteredCalls = extensionCalls.filter(call => call.ext_number !== sipData?.aors);

  return (
    <div className="live-calls-container">
      <ToastContainer />
      <h2 className="mb-4">Live Extension Calls</h2>
      {filteredCalls.length === 0 ? (
        <p>No extension calls at the moment.</p>
      ) : (
        <DataTable
          columns={columns}
          data={filteredCalls}
          pagination
          highlightOnHover
          customStyles={tableCustomStyles}
        />
      )}
    </div>
  );
};

export default LiveCalls;