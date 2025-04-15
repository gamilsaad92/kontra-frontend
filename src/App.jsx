import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    project: '',
    amount: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/draw-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Create New Draw Request</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label><br />
          <input type="text" name="project" value={formData.project} onChange={handleChange} required />
        </div>
        <div>
          <label>Amount:</label><br />
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit">Submit Draw</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
