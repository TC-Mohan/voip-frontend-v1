import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PrintBalance = ({ userId }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    // Fetch initial balance
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`https://api.livepbxphone.us/api/balance/${userId}`);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();

    // Set up SSE for real-time updates
    const eventSource = new EventSource(`https://api.livepbxphone.us/api/balance-updates/${userId}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBalance(data.balance);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    // Clean up the event source on component unmount
    return () => {
      eventSource.close();
    };
  }, [userId]);

  return (
    <div>
      <li className="nav-item dropdown">
        <Link
          to="/wallet"
          className="nav-link nav-icon"
          data-bs-toggle="false"
          style={{ display: 'flex', alignItems: 'center' }} // Flexbox for alignment
        >
          <i className="bi bi-wallet" style={{ marginRight: '5px' }} /> {/* Margin to separate icons */}
          <i className="bi bi-currency-dollar" style={{ marginRight: '-2px' }} />
          <span style={{ fontSize: '18px',fontWeight:"bold" }}>
            {balance !== null ? balance : 'Loading balance...'}
            {/* {balance < 10 && <h3 style={{ margin: 0, color: 'red' }}>Low Credit</h3>} Ensure no margin */}
          </span>
        </Link>
      </li>
    </div>
  );
};

export default PrintBalance;