import React, { useState } from 'react';
import axios from 'axios';

const CreateMeeting = () => {
  const [formData, setFormData] = useState({
    topic: '',
    start_time: '',
    duration: '',
    time_zone: '',
  });

  const [meetingDetails, setMeetingDetails] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMeetingDetails(null);

    try {
      const response = await axios.post('http://localhost:5001/zoom/create-meeting', formData);
      console.log(response.data);
      
      setMeetingDetails(response.data);

    } catch (err) {
      console.error(err);
      setError('Failed to create the meeting. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Create Zoom Meeting</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          name="topic"
          placeholder="Meeting Topic"
          value={formData.topic}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="start_time"
          placeholder="Start Time"
          value={formData.start_time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (in minutes)"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="time_zone"
          placeholder="Time Zone (e.g., Asia/Kolkata)"
          value={formData.time_zone}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Meeting</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {meetingDetails && (
        <div style={{ marginTop: '20px' }}>
          <h3>Meeting Details</h3>
          <p><strong>Topic:</strong> {meetingDetails.topic}</p>
          <p><strong>Start Time:</strong> {new Date(meetingDetails.start_time).toLocaleString()}</p>
          <p><strong>Duration:</strong> {meetingDetails.duration} minutes</p>
          <p><strong>Join URL:</strong> <a href={meetingDetails.join_url} target="_blank" rel="noopener noreferrer">{meetingDetails.join_url}</a></p>
          <p><strong>Meeting ID:</strong> {meetingDetails.id}</p>
          <p><strong>password:</strong> {meetingDetails.password}</p>

        </div>
      )}
    </div>
  );
};

export default CreateMeeting;
