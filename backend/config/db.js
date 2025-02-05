const mongoose = require('mongoose');

// Load environment variables
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get MongoDB URI from .env


const MONGO_URI = process.env.MONGO_URI;
// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Optional, depends on your Mongoose version
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1); // Exit process if the connection fails
  }
};

module.exports = connectDB;
