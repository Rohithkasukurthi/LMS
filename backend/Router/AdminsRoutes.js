const express = require('express');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported for password hashing
require('dotenv').config();
const AdminsRoutes = express.Router();
const cookieParser = require('cookie-parser');
const AdminModel = require('../models/AdminModel'); // Correct path for the User model
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authmiddelware');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory buffer
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error('Azure Storage Connection string is not set in .env file');
}

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerName = 'lmsprojectfiles';

AdminsRoutes.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if the user already exists
    const existingUser = await AdminModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = await AdminModel.create({
      email,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    // Set the JWT token in an HTTP-only cookie

    // Respond with success message and user data (without token in body)
    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      data: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// Login route
AdminsRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if the admin exists
    const admin = await AdminModel.findOne({ email }).select('+password'); // Ensure the password field is selected
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the input password with the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });

    // Set the JWT token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,  // Ensures the cookie can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
      sameSite: 'Strict', // Prevent cross-site request forgery
      maxAge: 3600000, // Token expiration time (1 hour)
    });

    // Respond with success message and user data (without the token in the body)
    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        id: admin._id,
        email: admin.email,
        token :token
      },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});



AdminsRoutes.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // Example: Fetch admin-specific data
    res.status(200).json({
      success: true,
      message: 'Welcome to the admin dashboard!',
      data: {
        userId: req.user.id,
        email: req.user.email,
      },
    });
  } catch (error) {
    console.error('Error in dashboard route:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET: Test route
AdminsRoutes.get('/', async (req, res) => {
  try {
    res.send('Hello, this is the AuthRoutes test endpoint!');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});



AdminsRoutes.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Get buffer and original file name
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    // Get container client
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Ensure container exists
    await containerClient.createIfNotExists();

    // Get block blob client and upload file
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileBuffer);

    // Generate the file's URL
    const fileUrl = blockBlobClient.url;

    res.status(200).json({
      message: 'File uploaded successfully',
      fileName,
      fileUrl,
    });
  } catch (error) {
    console.error('Error uploading PDF:', error.message);
    res.status(500).send('Error uploading PDF');
  }
});





module.exports = AdminsRoutes;
