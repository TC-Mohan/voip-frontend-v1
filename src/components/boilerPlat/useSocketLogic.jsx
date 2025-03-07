// // src/socketLogic.js
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const useSocketLogic = () => {
//   const [socket, setSocket] = useState(null);
//   const [userCalls, setUserCalls] = useState({ userId: null, calls: [] });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const socketIo = io(window.BASE_WEB_SOCKET); // Adjust the URL if needed
//     setSocket(socketIo);

//     socketIo.on('user_calls', (data) => {
//       setUserCalls(data);
//       setError(null);
//     });

//     socketIo.on('error', (errorMessage) => {
//       setUserCalls({ userId: null, calls: [] });
//       setError(errorMessage);
//     });

//     return () => {
//       socketIo.disconnect();
//     };
//   }, []);

//   const fetchUserCalls = (userId) => {
//     if (socket) {
//       socket.emit('fetch_user_calls', userId);
//     }
//   };

//   return { userCalls, error, fetchUserCalls };
// };

// export default useSocketLogic;