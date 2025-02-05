// src/ZoomApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pages/zoom.css'

const ZoomApp = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const [meetingStatus, setMeetingStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if the access token is already stored in localStorage
  useEffect(() => {
    const token ="eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjA4YzVlZGY0LTVkMDgtNGVkNi04MzM5LTdmNTQyYzhmYTEzMCJ9.eyJ2ZXIiOjEwLCJhdWlkIjoiNzdiN2E1MmVkZjQyYjM3MzFlOTgyODg0ODdkZDFiOTExZTZiNzBhNTM1ZGJjNGZkODI3ZjcyMzhjODlkMzUxMSIsImNvZGUiOiJUcXFkVjVJMFliNjY4UWF5TjRKUlBTTms1eDh3WG9VcVEiLCJpc3MiOiJ6bTpjaWQ6ODM3WDUySVdTaXVQYlFJeTNwREgxQSIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJKazBxQkc0RFRhTzN4REVhSTlOVEFRIiwibmJmIjoxNzMzMjAyOTA4LCJleHAiOjE3MzMyMDY1MDgsImlhdCI6MTczMzIwMjkwOCwiYWlkIjoiTVFhYnVqSlNSbDJNT3dkcVU0VFdPZyJ9.E9v2X3xiHmI_BK9EX_5tt3PaJMYY8SrjcMnakswEb1IEuwaQxT76v3csv_0meJVTKEwbremxRdW1G_4jms3bUw";
    if (token) {
      setAccessToken(token);
    }
  }, []);

  // Handle OAuth login redirection
  const handleOAuth = () => {
    window.location.href = 'http://localhost:3000/zoom/authorize'; // Backend URL to redirect for OAuth
  };

  // Fetch all meetings for the authenticated user
  const fetchMeetings = async () => {
    if (!accessToken) {
      alert('Please authenticate first!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/zoom/zoom/meetings', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMeetings(response.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      setLoading(false);
    }
  };

  // Fetch the status of a specific meeting by its ID
  const checkMeetingStatus = async (meetingId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/zoom/zoom/meeting/${meetingId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMeetingStatus(response.data.message);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meeting status:', error);
      setLoading(false);
    }
  };

  return (
    <div className="zoom-app">
      <h1>Zoom Meetings Dashboard</h1>

      {!accessToken ? (
        <button onClick={handleOAuth}>Authenticate with Zoom</button>
      ) : (
        <div>
          <p>Authenticated successfully!</p>
          <button onClick={fetchMeetings}>Fetch All Meetings</button>
        </div>
      )}

      {loading && <p>Loading...</p>}

      {meetings.length > 0 && (
        <div>
          <h2>Your Meetings</h2>
      <ul>
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            <div style={{display:'flex'}}>
              <h3>{meeting.topic} (ID: {meeting.id})</h3>
              <p>Start Time: {new Date(meeting.start_time).toLocaleString()}</p>
              <p>Duration: {meeting.duration} minutes</p>
              <a href={meeting.join_url} target="_blank" rel="noopener noreferrer">
                Join Meeting
              </a>
              <button onClick={() => checkMeetingStatus(meeting.id)}>
                Check Status
              </button>
            </div>
          </li>
        ))}
      </ul>
        </div>
      )}

      {meetingStatus && (
        <div>
          <h3>Meeting Status</h3>
          <p>{meetingStatus}</p>
        </div>
      )}
    </div>
  );
};

export default ZoomApp;
