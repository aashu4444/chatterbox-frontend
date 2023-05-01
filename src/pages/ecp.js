import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  const [websocket, setWebsocket] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/message/');

    socket.onopen = () => {
      console.log('WebSocket connected');
      setWebsocket(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (websocket) {
      const message = 'Hello, Django Channels!';
      websocket.send(JSON.stringify({ message }));
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      <p>Received Message: {message}</p>
    </div>
  );
}

export default ExampleComponent;
