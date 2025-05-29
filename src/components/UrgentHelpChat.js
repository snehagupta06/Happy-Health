// src/components/UrgentHelpChat.js

import React, { useState } from 'react';
import './UrgentHelpChat.css'; // ✨ import styling

const UrgentHelpChat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    if (message.trim() === '') return;

    // Add user's message to chat
    const newChat = [...chat, { sender: 'user', text: message }];
    setChat(newChat);
    setMessage('');

    // Simulate doctor auto-reply after 1 sec
    setTimeout(() => {
      setChat((prevChat) => [...prevChat, { sender: 'doctor', text: 'Doctor will contact you soon!' }]);
    }, 1000);
  };

  return (
    <div className="urgent-container">
      <h2 className="urgent-heading">💬 Urgent Help Chat</h2>

      <div className="chat-box">
        {chat.length === 0 ? (
          <p className="no-messages">No urgent messages yet.</p>
        ) : (
          chat.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))
        )}
      </div>

      <div className="send-box">
        <input
          type="text"
          placeholder="Enter your urgent message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default UrgentHelpChat;

