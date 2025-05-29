// routes/chat.js

const express = require('express');
const router = express.Router();

// In-memory store for urgent messages
const messages = [];

// Patient sends urgent message
router.post('/send', (req, res) => {
  const { from, to, message } = req.body;
  messages.push({ from, to, message, timestamp: new Date() });
  res.json({ message: 'Message sent!' });
});

// Doctor checks messages
router.get('/receive/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  const doctorMessages = messages.filter(m => m.to === doctorId);
  res.json(doctorMessages);
});

module.exports = router;
