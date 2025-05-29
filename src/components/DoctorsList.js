// src/components/DoctorsList.js

import React, { useEffect, useState } from 'react';
import api from '../api';
import './DoctorsList.css';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get('/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="doctors-container">
      <h2 className="doctors-heading">Our Doctors</h2>
      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            {doctor.image && (
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            )}
            <h3>{doctor.name}</h3>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            {doctor.degree && <p><strong>Degree:</strong> {doctor.degree}</p>}
            {doctor.experience && <p><strong>Experience:</strong> {doctor.experience} years</p>}
            {doctor.clinic && <p><strong>Clinic:</strong> {doctor.clinic}</p>}
            {doctor.location && <p><strong>Location:</strong> {doctor.location}</p>}
            {doctor.fee && <p><strong>Consultation Fee:</strong> ₹{doctor.fee}</p>}
            {doctor.mode && <p><strong>Mode:</strong> {doctor.mode}</p>}
            {doctor.reviews && doctor.reviews.length > 0 && (
              <>
                <p><strong>Reviews:</strong></p>
                <ul>
                  {doctor.reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

