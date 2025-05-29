// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Candidate (Patient) Registration
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: 'Candidate registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error });
  }
});

// Candidate (Patient) Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error });
  }
});

module.exports = router;
