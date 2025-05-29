const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const sendOTPEmail = require("../utils/sendEmail");
<Route path="/doctor-login" element={<DoctorLogin />} />

// Step 1: Login & Send OTP
router.post("/doctor/login", async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });

  if (!doctor || doctor.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  doctor.otp = otp;
  doctor.otpExpiry = new Date(Date.now() + 5 * 60000);
  await doctor.save();2

  await sendOTPEmail(email, otp);
  res.json({ message: "OTP sent" });
});

// Step 2: Verify OTP
router.post("/doctor/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const doctor = await Doctor.findOne({ email });

  if (!doctor || doctor.otp !== otp || doctor.otpExpiry < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // Clear OTP and login user
  doctor.otp = null;
  doctor.otpExpiry = null;
  await doctor.save();

  res.json({ message: "Login successful", doctor });
});

module.exports = router;
