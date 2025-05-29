// src/models/Doctor.js

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  degree: { type: String },
  experience: { type: Number },
  clinic: { type: String },
  location: { type: String },
  fee: { type: Number },
  mode: { type: String },
  image: { type: String },
  registrationNumber: { type: String, required: true, unique: true },
  reviews: { type: [String], default: [] },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  password: String,
  otp: String,
  otpExpiry: Date,
});

module.exports = mongoose.model('Doctor', doctorSchema);

