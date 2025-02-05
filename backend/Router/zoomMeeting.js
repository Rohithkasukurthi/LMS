const express = require('express');
const axios = require('axios');
const router = express.Router();
const Token = require('../models/TokenModel'); // Assuming a Mongoose model for tokens

// Utility function to check if the token is expired
function isTokenExpired(expiryDate) {
  return new Date() >= expiryDate;
}

// Function to refresh the access token
async function refreshAccessToken(userId) {
  try {
    // Fetch the refresh token from the database
    const tokenData = await Token.findOne({ user_id: userId });

    if (!tokenData || !tokenData.refresh_token) {
      throw new Error('Refresh token not found');
    }

    // Use the refresh token to get a new access token
    const response = await axios.post(process.env.ZOOM_TOKEN_URL, null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: tokenData.refresh_token,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;
    const expires_at = new Date(Date.now() + expires_in * 1000);

    // Update the database with the new tokens
    await Token.findOneAndUpdate(
      { user_id: userId },
      { access_token, refresh_token, expires_at }
    );

    return access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new Error('Failed to refresh access token');
  }
}

// Middleware to get a valid access token
async function getAccessToken(userId) {
  try {
    const tokenData = await Token.findOne({ user_id: userId });

    if (!tokenData) {
      throw new Error('Token data not found');
    }

    if (isTokenExpired(tokenData.expires_at)) {
      return await refreshAccessToken(userId);
    }

    return tokenData.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to retrieve access token');
  }
}

// Step 1: Create a Zoom meeting
router.post('/create-meeting', async (req, res) => {
  const { topic, start_time, duration, time_zone } = req.body;
  const userId = '19l31a05h2'; // Replace with dynamic user ID logic

  try {
    const accessToken = await getAccessToken(userId);

    const response = await axios.post(
      `${process.env.ZOOM_API_URL}/users/${process.env.ZOOM_USER_ID}/meetings`,
      {
        topic,
        type: 2, // Scheduled meeting
        start_time,
        duration,
        timezone: time_zone,
        agenda: 'Meeting agenda goes here',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    res.status(500).send('Error creating meeting');
  }
});

// Step 2: Get a Zoom meeting's details by meeting ID
router.get('/meeting/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  const userId = '19l31a05h2';

  try {
    const accessToken = await getAccessToken(userId);

    const response = await axios.get(
      `${process.env.ZOOM_API_URL}/meetings/${meetingId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching meeting details:', error);
    res.status(500).send('Error fetching meeting details');
  }
});

module.exports = router;
