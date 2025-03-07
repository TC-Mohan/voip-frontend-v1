// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const SERVER_URL = window.BASE_WEB_SOCKET;

// export const UseLiveCallUpdates = (userId, onTotalLiveCallsUpdate) => {
//   const [allCalls, setAllCalls] = useState([]);
//   const [userCalls, setUserCalls] = useState([]);
//   const [connectionStatus, setConnectionStatus] = useState('Disconnected');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io(SERVER_URL, {
//       withCredentials: true,
//       transports: ['websocket']
//     });

//     newSocket.on('connect', () => {
//       console.log('Connected to WebSocket server');
//       setConnectionStatus('Connected');
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Disconnected from WebSocket server');
//       setConnectionStatus('Disconnected');
//     });

//     newSocket.on('connect_error', (error) => {
//       console.error('Connection error:', error);
//       setConnectionStatus('Error: ' + error.message);
//     });

//     newSocket.on('allCallsUpdate', (calls) => {
//       setAllCalls(calls);
//       console.log({calls})
//       if (onTotalLiveCallsUpdate) {
//         onTotalLiveCallsUpdate(calls.length);  // Update the total calls in parent
//       }
//     });

//     newSocket.on('userCallsUpdate', (calls) => {
//       setUserCalls(calls);
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [userId, onTotalLiveCallsUpdate]);

//   useEffect(() => {
//     if (socket && socket.connected && userId) {
//       socket.emit('subscribe', userId);
//     }
//   }, [socket, userId]);

//   return { allCalls, userCalls, connectionStatus };
// };
