// src/App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import { FaHeartbeat } from "react-icons/fa";
import DoctorLogin from "./components/DoctorLogin"
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";
import ContactForm from "./components/ContactForm";
import HealthTips from "./components/HealthTips";
import MedicationReminder from "./components/MedicationReminder";
import DoctorsList from "./components/DoctorsList";
import LoginPage from "./components/LoginPage";
import DoctorDashboard from "./components/DoctorDashboard";
import ChatBot from "./components/UrgentHelpChat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const [currentView, setCurrentView] = useState("login");
  const [userType, setUserType] = useState(""); // 'candidate' or 'doctor'
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check local storage on page load
    const user = JSON.parse(localStorage.getItem('user'));
    const type = localStorage.getItem('userType');
    if (user && type) {
      setLoggedInUser(user);
      setUserType(type);
      setCurrentView(type === "candidate" ? "home" : "doctorDashboard");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedInUser(null);
    setUserType("");
    setCurrentView("login");
  };

  const renderView = () => {
    if (!loggedInUser) {
      return <LoginPage setUserType={setUserType} setLoggedInUser={setLoggedInUser} />;
    }

    if (userType === "doctor") {
      return <DoctorDashboard />;
    }

    switch (currentView) {
      case "appointment":
        return (
          <>
            <h2 className="section-title">Book Appointment</h2>
            <AppointmentForm />
          </>
        );
      case "records":
        return <AppointmentList />;
      case "contact":
        return <ContactForm />;
      case "tips":
        return <HealthTips />;
      case "reminder":
        return <MedicationReminder />;
      case "doctors":
        return <DoctorsList />;
      case "chat":
        return <ChatBot />;
      default:
        return (
          <>
            <p className="tagline">Empowering Health, One Step at a Time.</p>
            <blockquote className="quote">
              “Health is a state of body. Wellness is a state of being.” – J. Stanford
            </blockquote>
          </>
        );
    }
  };

  return (
    <div className="app-background">
      {/* Header */}
      {loggedInUser && (
        <header className="header-bar">
          <div className="logo">
            <FaHeartbeat className="heartbeat-icon" />
            <span>Happy Health</span>
          </div>
          <nav className="nav-links">
            {userType === "candidate" && (
              <>
                <button onClick={() => setCurrentView("home")}>Home</button>
                <button onClick={() => setCurrentView("appointment")}>Appointments</button>
                <button onClick={() => setCurrentView("records")}>Records</button>
                <button onClick={() => setCurrentView("doctors")}>Doctors</button>
                <button onClick={() => setCurrentView("chat")}>Urgent Help</button>
                <button onClick={() => setCurrentView("tips")}>Tips</button>
                <button onClick={() => setCurrentView("reminder")}>Reminder</button>
              </>
            )}
            {userType === "doctor" && (
              <>
                <button onClick={() => setCurrentView("doctorDashboard")}>Dashboard</button>
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </header>
      )}

      {/* Main Content */}
      <main className="main-container">
        <div className="card">
          <div className="content">{renderView()}</div>
        </div>
      </main>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
