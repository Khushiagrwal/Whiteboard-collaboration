import React, { useState, useEffect } from 'react';

const Chat = ({connection,room}) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const socket=connection

  // Send a message to the room
  const sendMessage = () => {
    socket.emit('sendMessage', room, message);
    setMessage('');
  };

  // Receive messages from the room
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h3>Chat Messages</h3>
        {chatMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
