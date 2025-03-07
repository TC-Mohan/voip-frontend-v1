import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BalanceCkeck = ({ userId }) => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    // Fetch initial balance
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/balance/${userId}`);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();

    // Set up SSE for real-time updates
    const eventSource = new EventSource(`http://localhost:3000/api/balance-updates/${userId}`);

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
      <h1>User Balance</h1>
      {balance !== null ? (
        <p>Current Balance: ${balance}</p>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
};

export default BalanceCkeck;