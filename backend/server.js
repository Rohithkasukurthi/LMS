// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const crypto = require('crypto');
// Load environment variables
const { zoom } = require('./config/zoom');
dotenv.config();

// Import routes
const adminsRoutes = require('./Router/AdminsRoutes');
const studentRoutes = require('./Router/StudentRoutes');
const tpoRoutes = require('./Router/TpoRoutes');
const trainerRoutes = require('./Router/TrainerRoutes');
const zoomMeeting =require('./Router/zoomMeeting')


// Initialize Express app
const app = express();

// Connect to MongoDB Atlas

connectDB();

// Middleware
app.use(express.json()); // Parse JSON payloads// Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Log HTTP requests
app.use(cookieParser());


const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only your React app (frontend) to make requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
    credentials: true,  // Allow cookies to be sent with the request
  };


  app.use(cors(corsOptions)); 
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.use('/api/admin', adminsRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/tpos', tpoRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/oauth', require('./Router/oauth'));
app.use('/zoom', require('./Router/zoom'));
app.use('/zoomMeeting', zoomMeeting);

// app.use('/api/admins', adminRoutes);

const API_KEY = process.env.ZOOM_CLIENT_ID;
const API_SECRET = process.env.ZOOM_CLIENT_SECRET;

app.post('/generateSignature', (req, res) => {
  const { meetingNumber, role } = req.body;
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(`${API_KEY}${meetingNumber}${timestamp}${role}`).toString('base64');
  const hash = crypto.createHmac('sha256', API_SECRET).update(msg).digest('base64');
  const signature = Buffer.from(`${API_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString(
    'base64'
  );
  res.json({ signature });
});



app.get('/api', async (req, res) => {
    try {
      res.send('Hello, this is the AuthRoutes test endpoint!');
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });


// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Server Error',
//   });
// });

// Define the PORT
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
