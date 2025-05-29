// src/components/AppointmentList.js

import React, { useEffect, useState } from 'react';
import api from "../api";
import './AppointmentList.css'; // Import your CSS file for styling

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    api.get(`/appointments/patient/${user._id}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Sort appointments by date (newest first)
  const sortedAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="appointments-container">
      <h2 className="appointments-heading">Your Appointments</h2>

      {sortedAppointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        sortedAppointments.map((appt) => (
          <div key={appt._id} className="appointment-card">
            <p><strong>Doctor:</strong> {appt.doctor ? appt.doctor.name : "Unknown Doctor"}</p>
            <p><strong>Date:</strong> {appt.date} at {appt.time}</p>
            <p><strong>Prescription:</strong> {appt.prescription || "Not Provided"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentList;

