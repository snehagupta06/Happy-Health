// src/components/DoctorDashboard.js
import "./DoctorDashboard.css";
import React, { useState } from "react";
import api from "../api";

const DoctorDashboard = () => {
  const [regNumber, setRegNumber] = useState("");
  const [history, setHistory] = useState(null);

  const fetchHistory = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/appointments/history/${regNumber}`);
      setHistory(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch history. Check registration number.");
    }
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <form onSubmit={fetchHistory}>
        <input 
          type="text" 
          placeholder="Enter Patient Registration Number"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          required
        />
        <button type="submit">Fetch Patient History</button>
      </form>

      {history && (
        <div className="patient-history">
          <h3>Patient: {history.patient.name}</h3>
          <h4>Appointments:</h4>
          {history.appointments.map((appt, idx) => (
            <div key={idx}>
              <p>Date: {appt.date}, Time: {appt.time}</p>
              <p>Doctor: {appt.doctor.name}</p>
              <p>Prescription: {appt.prescription || "Not Provided"}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
