import React, { useState } from 'react';
import PharmacistHeader from './PharmacistHeader';

function PharmacyCommunication() {
  // State to manage messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Function to send a new message
  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage.trim(), sender: 'Pharmacist', timestamp: new Date() }]);
      setNewMessage('');
    }
  };

  return (
    <>
    <PharmacistHeader/>
    <div>
      <h1>Communication</h1>
      <div className='contact-form' style={{maxWidth:"100%"}}>
        <h2>Messages</h2>
        <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '300px', overflowY: 'scroll' }}>
          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.sender}: </strong>{message.text}
              <div style={{ fontSize: '0.8em', color: '#888' }}>{message.timestamp.toLocaleString()}</div>
            </div>
          ))}
        </div>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          style={{ width: '100%', marginTop: '10px' }}
        />
        <button onClick={sendMessage} style={{ marginTop: '10px' }}>Send Message</button>
      </div>
    </div>
    </>
  );
}

export default PharmacyCommunication;