// server.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');
const doctorRoutes = require('./routes/doctors');
const chatRoutes = require('./routes/chat');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/appointments', appointmentRoutes);
app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);
app.use('/chat', chatRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
