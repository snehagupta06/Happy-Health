import "./AppointmentForm.css";
import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({ date: '', time: '', doctorId: '' });
  const [doctors, setDoctors] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    api.get('/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', {
        patientId: user._id,
        doctorId: formData.doctorId,
        date: formData.date,
        time: formData.time
      });
      toast.success("Appointment booked!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment");
    }
  };

  return (
    <div className="appointment-form">
      <h2>Book Appointment</h2> {/* Added title */}
      <form onSubmit={handleSubmit}>
        <select 
          value={formData.doctorId}
          onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option value={doc._id} key={doc._id}>
              {doc.name} ({doc.specialty})
            </option>
          ))}
        </select>

        <input 
          type="date" 
          value={formData.date} 
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required 
        />

        <input 
          type="time" 
          value={formData.time} 
          onChange={(e) => setFormData({...formData, time: e.target.value})}
          required 
        />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;


