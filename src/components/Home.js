import React from "react";

const Home = ({ onNavigate }) => {
  return (
    <div>
      <h1 style={{ color: "#007acc", marginTop: "20px" }}>🏥 Happy Health</h1>
      <p style={{ fontSize: "18px" }}>Your trusted partner in healthcare.</p>

      <div style={{ marginTop: "30px" }}>
        <button className="button" onClick={() => onNavigate("appointment")}>
          Book Appointment
        </button>
        <button className="button" onClick={() => onNavigate("records")}>
          View Records
        </button>
        <button className="button" onClick={() => onNavigate("contact")}>
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Home;
