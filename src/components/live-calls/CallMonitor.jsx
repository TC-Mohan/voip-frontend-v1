import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const CallMonitor = ({ userId, userType }) => {
  const [socket, setSocket] = useState(null);
  const [activeCalls, setActiveCalls] = useState([]);
  const [queueCalls, setQueueCalls] = useState([]);

  useEffect(() => {
    const newSocket = io(window.BASE_WEB_SOCKET);
    setSocket(newSocket);

    newSocket.emit('subscribe', userId);

    newSocket.on('userCallsUpdate', ({ activeCalls, queueCalls }) => {
      setActiveCalls(activeCalls);
      setQueueCalls(queueCalls);
    });

    newSocket.on('allCallsUpdate', ({ activeCalls, queueCalls }) => {
    //   if (userType === 1) { // Admin
        setActiveCalls(activeCalls);
        setQueueCalls(queueCalls);
    //   }
    });

    return () => newSocket.close();
  }, [userId, userType]);

  return (
    <div>
      <h2>Active Calls</h2>
      {JSON.stringify(activeCalls)}
      {activeCalls.map(call => (
        <div key={call.uniqueId}>
          <p>Caller: {call.callerIdName} ({call.callerIdNum})</p>
          <p>Destination: {call.destinationNumber}</p>
          <p>Status: {call.status}</p>
          {call.isQueueCall && <p>Queue: {call.queueName}</p>}
          {call.agentNum && <p>Agent: {call.agentNum}</p>}
          {call.user_data && <p>User ID: {call.user_data.user_id}</p>}
        </div>
      ))}

      <h2>Queue Calls</h2>
      {queueCalls.map(call => (
        <div key={call.uniqueId}>
          <p>Caller: {call.callerIdName} ({call.callerIdNum})</p>
          <p>Queue: {call.queue}</p>
          <p>Position: {call.position}</p>
          <p>Status: {call.status}</p>
          {call.agentNum && <p>Agent: {call.agentNum}</p>}
          {call.user_data && <p>User ID: {call.user_data.user_id}</p>}
        </div>
      ))}
    </div>
  );
};

export default CallMonitor;