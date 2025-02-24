import React, { useState, useEffect } from "react";

const WelcomePopup = ({ onClose }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    // Send name to backend
    try {
      await fetch("https://shyara-gold.onrender.com/save-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      localStorage.setItem("username", name); // Store name in localStorage
      onClose(); // Close popup
    } catch (error) {
      console.error("Error saving name:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h2>Welcome to Shyara Gold</h2>
        <p>Please enter your name:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default WelcomePopup;
