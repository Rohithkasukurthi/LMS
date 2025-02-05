const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function refreshAccessToken(refresh_token) {
  try {
    const response = await axios.post(process.env.ZOOM_TOKEN_URL, null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token: new_refresh_token, expires_in } = response.data;

    // Return the new access and refresh tokens
    return { access_token, refresh_token: new_refresh_token, expires_in };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

module.exports = { refreshAccessToken };
