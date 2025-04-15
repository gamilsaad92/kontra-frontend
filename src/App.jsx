import React, { useState } from 'react';

export default function App() {
  const [message, setMessage] = useState("Waiting...");

  const testBackend = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`);
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Kontra Frontend</h1>
      <button onClick={testBackend}>Test Backend Connection</button>
      <p>Response: {message}</p>
    </div>
  );
}
