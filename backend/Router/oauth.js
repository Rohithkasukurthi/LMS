const express = require('express');
const axios = require('axios');
const router = express.Router();
const Token = require('../models/TokenModel');

// Step 1: Redirect the user to Zoom's OAuth authorization page
router.get('/authorize', (req, res) => {
  const url = `${process.env.ZOOM_AUTHORIZATION_URL}?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.ZOOM_REDIRECT_URI)}`;
  res.redirect(url);
});

// Step 2: Handle the OAuth callback to exchange the authorization code for an access token and refresh token


router.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Authorization code not provided');
  }

  try {
    const response = await axios.post(process.env.ZOOM_TOKEN_URL, null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.ZOOM_REDIRECT_URI,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    // Calculate expiry date
    const expires_at = new Date(Date.now() + expires_in * 1000);

    // Store the token in MongoDB
    const userId = '19l31a05h2'; // Replace with actual user identification logic
    await Token.findOneAndUpdate(
      { user_id: userId },
      { access_token, refresh_token, expires_at },
      { upsert: true } // Create if not exists
    );

    res.json({ access_token, refresh_token, expires_in });
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    res.status(500).send('Error while exchanging code for tokens');
  }
});


router.get('/refresh-token', async (req, res) => {
    const userId = '19l31a05h2'; // Replace with actual user identification logic
  
    try {
      // Fetch the refresh_token from the database
      const tokenData = await Token.findOne({ user_id: userId });
  
      if (!tokenData || !tokenData.refresh_token) {
        return res.status(404).send('Refresh token not found for the user');
      }
  
      // Use the refresh_token to get a new access_token
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
  
      // Calculate new expiry date
      const expires_at = new Date(Date.now() + expires_in * 1000);
  
      // Update the database with the new tokens
      await Token.findOneAndUpdate(
        { user_id: userId },
        { access_token, refresh_token, expires_at }
      );
  
      res.json({
        access_token,
        refresh_token,
        expires_in,
        message: 'Token refreshed successfully',
      });
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(500).send('Error while refreshing token');
    }
  });
  


module.exports = router;
