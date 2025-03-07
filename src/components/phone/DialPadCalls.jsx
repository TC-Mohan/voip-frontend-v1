import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const DialPadCalls = () => {

    const [liveCalls, setLiveCalls] = useState([]);
    const [callCounts, setCallCounts] = useState({ total: 0, inbound: 0, outbound: 0 });
  
   
  
    return (
      <div className="live-calls">
        <h2>Live Calls</h2>
        <div className="call-counts">
          <p>Total Calls: {callCounts.total}</p>
          <p>Inbound Calls: {callCounts.inbound}</p>
          <p>Outbound Calls: {callCounts.outbound}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>DID</th>
              <th>Call To</th>
              <th>Call From</th>
              <th>Agent</th>
              <th>Time</th>
              <th>Direction</th>
            </tr>
          </thead>
          <tbody>
            {liveCalls.map((call) => (
              <tr key={call.uniqueid}>
                <td>{call.uniqueid}</td>
                <td>{call.did}</td>
                <td>{call.call_to}</td>
                <td>{call.call_from}</td>
                <td>{call.Agent}</td>
                <td>{new Date(call.time).toLocaleString()}</td>
                <td>{call.direction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default DialPadCalls