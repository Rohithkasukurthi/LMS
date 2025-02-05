import React, { useState } from 'react';
import axios from 'axios';

const ZoomApp = () => {
  const [meetingDetails, setMeetingDetails] = useState({
    topic: '',
    start_time: '',
    duration: '',
    time_zone: 'UTC',
  });
  const [createdMeeting, setCreatedMeeting] = useState(null);
  const [fetchedMeeting, setFetchedMeeting] = useState(null);
  const [meetingId, setMeetingId] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Create a new Zoom meeting
  const createMeeting = async () => {
    try {
      const response = await axios.post('http://localhost:5001/zoomMeeting/create-meeting', meetingDetails);
      setCreatedMeeting(response.data);
      alert('Meeting created successfully!');
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Failed to create meeting.');
    }
  };

  // Fetch meeting details by ID
  const fetchMeetingDetails = async () => {
    if (!meetingId) {
      alert('Please enter a valid meeting ID.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/zoomMeeting/meeting/${meetingId}`);
      setFetchedMeeting(response.data);
    } catch (error) {
      console.error('Error fetching meeting details:', error);
      alert('Failed to fetch meeting details.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create Zoom Meeting</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMeeting();
        }}
      >
        <div>
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={meetingDetails.topic}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            value={meetingDetails.start_time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={meetingDetails.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time Zone:</label>
          <input
            type="text"
            name="time_zone"
            value={meetingDetails.time_zone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Meeting</button>
      </form>

      {createdMeeting && (
        <div style={{ marginTop: '20px' }}>
          <h3>Created Meeting Details:</h3>
          <pre>{JSON.stringify(createdMeeting, null, 2)}</pre>
        </div>
      )}

      <hr />

      <h2>Fetch Meeting Details</h2>
      <div>
        <label>Meeting ID:</label>
        <input
          type="text"
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
        />
        <button onClick={fetchMeetingDetails}>Fetch Details</button>
      </div>

      {fetchedMeeting && (
        <div style={{ marginTop: '20px' }}>
          <h3>Fetched Meeting Details:</h3>
          <pre>{JSON.stringify(fetchedMeeting, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ZoomApp;
