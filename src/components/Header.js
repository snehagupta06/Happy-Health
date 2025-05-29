import React from "react";
import { FaHeartbeat } from "react-icons/fa";
import './Header.css'; //


const Header = ({ onNavigate }) => {
  return (
    <header className="main-header">
      <div className="logo-section">
        <FaHeartbeat className="logo-icon" />
        <h1 className="logo-text">Happy Health</h1>
      </div>
      <nav className="nav-links">
        <button onClick={() => onNavigate("home")}>Home</button>
        <button onClick={() => onNavigate("appointment")}>Appointments</button>
        <button onClick={() => onNavigate("records")}>Records</button>
        <button onClick={() => onNavigate("contact")}>Contact</button>
        <button onClick={() => onNavigate("tips")}>Health Tips</button>
        <button onClick={() => onNavigate("reminder")}>Reminder</button>
      </nav>
    </header>
  );
};

export default Header;