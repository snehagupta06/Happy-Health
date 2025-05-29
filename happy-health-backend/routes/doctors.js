// routes/doctors.js

const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Doctor Registration
router.post('/register', async (req, res) => {
  try {
    const doctor = new Doctor({
      name: req.body.name,
      specialty: req.body.specialty,
      degree: req.body.degree,
      experience: req.body.experience,
      clinic: req.body.clinic,
      location: req.body.location,
      fee: req.body.fee,
      mode: req.body.mode,
      image: req.body.image,
      registrationNumber: req.body.registrationNumber,
      reviews: req.body.reviews,
      email: req.body.email,
      password: req.body.password, // (Optional later: hash it)
    });

    await doctor.save();
    res.json({ message: 'Doctor registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Doctor registration failed', details: error });
  }
});

// Doctor Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email, password });
    if (!doctor) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Doctor login successful', doctor });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error });
  }
});

// Get All Doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors', details: error });
  }
});

// Bulk Upload Doctors
// Bulk upload multiple doctors
router.post('/bulk-upload', async (req, res) => {
    try {
      const doctorsArray = req.body.doctors; // expecting array
      const createdDoctors = await Doctor.insertMany(doctorsArray);
      res.status(201).json({ message: "Doctors added successfully!", data: createdDoctors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Bulk upload failed", details: error });
    }
  });
  // Delete Doctor by ID
router.delete('/:id', async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.json({ message: 'Doctor deleted successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete doctor', details: error });
    }
  });
  

module.exports = router;
