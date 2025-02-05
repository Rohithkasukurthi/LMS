const express = require('express');
const axios = require('axios');
const router = express.Router();

// Middleware to get Zoom Access Token (use a stored access token or refresh it if needed)
async function getAccessToken() {
  try {
    // Ideally, you store the access token and refresh token securely (e.g., in a database).
    const accessToken ="eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjA4YzVlZGY0LTVkMDgtNGVkNi04MzM5LTdmNTQyYzhmYTEzMCJ9.eyJ2ZXIiOjEwLCJhdWlkIjoiNzdiN2E1MmVkZjQyYjM3MzFlOTgyODg0ODdkZDFiOTExZTZiNzBhNTM1ZGJjNGZkODI3ZjcyMzhjODlkMzUxMSIsImNvZGUiOiJUcXFkVjVJMFliNjY4UWF5TjRKUlBTTms1eDh3WG9VcVEiLCJpc3MiOiJ6bTpjaWQ6ODM3WDUySVdTaXVQYlFJeTNwREgxQSIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJKazBxQkc0RFRhTzN4REVhSTlOVEFRIiwibmJmIjoxNzMzMjAyOTA4LCJleHAiOjE3MzMyMDY1MDgsImlhdCI6MTczMzIwMjkwOCwiYWlkIjoiTVFhYnVqSlNSbDJNT3dkcVU0VFdPZyJ9.E9v2X3xiHmI_BK9EX_5tt3PaJMYY8SrjcMnakswEb1IEuwaQxT76v3csv_0meJVTKEwbremxRdW1G_4jms3bUw";
    return accessToken;
  } catch (error) {
    throw new Error('Failed to retrieve access token');
  }
}

// Step 1: Create a Zoom meeting
router.post('/create-meeting', async (req, res) => {
  const { topic, start_time, duration, time_zone } = req.body;

  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      `${process.env.ZOOM_API_URL}/users/${process.env.ZOOM_USER_ID}/meetings`,
      {
        topic: topic,
        type: 2, // Scheduled meeting type
        start_time: start_time,
        duration: duration, // In minutes
        timezone: time_zone,
        agenda: 'Meeting agenda goes here', // Optional
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Return meeting information
    res.json(response.data);
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    res.status(500).send('Error creating meeting');
  }
});

// Step 2: Get a Zoom meeting's details by meeting ID
router.get('/meeting/:meetingId', async (req, res) => {
  const { meetingId } = req.params;

  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${process.env.ZOOM_API_URL}/meetings/${meetingId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Return the meeting details
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching meeting details:', error);
    res.status(500).send('Error fetching meeting details');
  }
});

const getZoomHeaders = () => {
    return {
      Authorization: `Bearer ${process.env.ZOOM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };
  };


const ZOOM_BASE_URL = 'https://api.zoom.us/v2';

// Endpoint to fetch live meetings
router.get('/zoom/meetings', async (req, res) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return res.status(400).send('Access token not available. Please authenticate first.');
    }
  
    try {
      // Call Zoom API to get all meetings for the authenticated user
      const zoomApiUrl = 'https://api.zoom.us/v2/users/me/meetings'; // 'me' refers to the authenticated user
      const response = await axios.get(zoomApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const meetings = response.data.meetings;
      res.json(meetings); // Send the meetings data back to the client
    } catch (error) {
      console.error('Error fetching meetings:', error);
      res.status(500).send('Failed to fetch meetings');
    }
  });

  router.get('/zoom/meeting/:meetingId', async (req, res) => {
    const meetingId = req.params.meetingId; // Get the meeting ID from the URL
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return res.status(400).send('Access token not available. Please authenticate first.');
    }
  
    try {
      // Call Zoom API to get the meeting details by meetingId
      const zoomApiUrl = `https://api.zoom.us/v2/meetings/${meetingId}`;
      const response = await axios.get(zoomApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const meeting = response.data;
      
      // Check if the meeting has started
      const status = meeting.status;
      let meetingStatusMessage = '';
      
      if (status === 'started') {
        meetingStatusMessage = 'The meeting has started.';
      } else if (status === 'waiting') {
        meetingStatusMessage = 'The meeting has not started yet.';
      } else if (status === 'ended') {
        meetingStatusMessage = 'The meeting has ended.';
      } else {
        meetingStatusMessage = 'Unknown meeting status.';
      }
  
      res.json({
        meetingId,
        status,
        message: meetingStatusMessage,
      });
    } catch (error) {
      console.error('Error fetching meeting status:', error);
      res.status(500).send('Failed to fetch meeting status');
    }
  });
  

module.exports = router;
