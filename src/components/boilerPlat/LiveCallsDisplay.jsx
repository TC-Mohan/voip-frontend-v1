// src/LiveCallsDisplay.js
import React, { useEffect } from 'react';
import useSocketLogic from './socketLogic';
// import useSocketLogic from './socketLogic';

function LiveCallsDisplay({ userId }) {
  const { userCalls, error, fetchUserCalls } = useSocketLogic();
  console.log({userCalls})

  useEffect(() => {
    if (userId) {
      fetchUserCalls(userId);
    }
  }, [userId, fetchUserCalls]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userCalls.userId) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <h2>Live Calls for User {userCalls.userId}:</h2>
      {userCalls.calls.length > 0 ? (
        userCalls.calls.map((call, index) => (
          <div key={index}>
            {/* Adjust these fields based on your LiveCalls model structure */}
            <p>Call ID: {call.id}</p>
            <p>Status: {call.status}</p>
            {/* Add more fields as needed */}
          </div>
        ))
      ) : (
        <p>No live calls found for this user.</p>
      )}
    </div>
  );
}

export default LiveCallsDisplay;