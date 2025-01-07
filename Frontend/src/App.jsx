// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// // Connect to the backend server
// const socket = io('http://localhost:8080');

// const App = () => {
//   const [userId, setUserId] = useState('');
//   const [status, setStatus] = useState(false);
//   const [room, setRoom] = useState('');
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);

//   // Handle socket connection
//   useEffect(() => {
//     socket.on('connect', () => {
//       setStatus(true);
//       setUserId(socket.id);
//     });

//     // Receive messages from the room
//     socket.on('receiveMessage', (message) => {
//       setChatMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('receiveMessage');
//     };
//   }, []);

//   // Join a room
//   const joinRoom = () => {
//     if (room) {
//       socket.emit('joinRoom', room);
//     }
//   };

//   // Leave a room
//   const leaveRoom = () => {
//     if (room) {
//       socket.emit('leaveRoom', room);
//     }
//   };

//   // Send a message to the room
//   const sendMessage = () => {
//     if (room && message) {
//       socket.emit('sendMessage', room, message);
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <h1>Socket.IO Chat App</h1>
//       <div>
//         {status ? (
//           <p>UserID: {userId} connected successfully</p>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>

//       <div>
//         <h2>Room</h2>
//         <input
//           type="text"
//           placeholder="Enter Room"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>
//         <button onClick={leaveRoom}>Leave Room</button>
//       </div>

//       <div>
//         <h2>Chat</h2>
//         <input
//           type="text"
//           placeholder="Enter message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       <div>
//         <h3>Chat Messages</h3>
//         {chatMessages.length > 0 ? (
//           chatMessages.map((msg, index) => <p key={index}>{msg}</p>)
//         ) : (
//           <p>No messages yet</p>
//         )}
//       </div>``
//     </div>
//   );
// };

// export default App;




import React from 'react'
import Home from "../components/Home"
import {BrowserRouter as  Router,Routes,Route } from "react-router-dom"


function App() 
{
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App