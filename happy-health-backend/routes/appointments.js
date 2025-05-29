// routes/appointments.js

const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

// Book Appointment
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;
    const appointment = new Appointment({ patient: patientId, doctor: doctorId, date, time });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
});

// Get Appointments for a Patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId }).populate('doctor');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
});

// Get Patient History by Registration Number (Doctor)
router.get('/history/:registrationNumber', async (req, res) => {
  try {
    const patient = await User.findOne({ registrationNumber: req.params.registrationNumber });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const appointments = await Appointment.find({ patient: patient._id }).populate('doctor');
    res.json({ patient, appointments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient history', error });
  }
});

module.exports = router;

