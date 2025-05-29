// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  console.log('🌐 Attempting MongoDB connection with URI:', mongoURI);

  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

module.exports = connectDB;
