import axios from "axios";
import { saveToken, getToken, removeToken } from './tokenHelper';

const API_BASE_URL = "http://localhost:5001/api"; // Update with your backend URL

// Register Admin
export const registerAdmin = async (email, password) => {
    try {
      // Make the API request to register the admin
      const response = await axios.post(
        `${API_BASE_URL}/admin/register`,
        { email, password },
      );
  
      // Extract the JWT from the response (assuming it's returned in the response body)
      const { token } = response.data.data;
  
      // Store the JWT in sessionStorage
      if (token) {
        saveToken(token);
      } else {
        console.warn("No token received during registration.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.message || error.message);
      throw error;
    }
  };
  

  export const loginAdmin = async (email, password) => {
    try {
      // Make the API request to register the admin
      const response = await axios.post(
        `${API_BASE_URL}/admin/login`,
        { email, password },
      );
  
      // Extract the JWT from the response (assuming it's returned in the response body)
      const { token } = response.data.data;
      // Store the JWT in sessionStorage
      if (token) {
        saveToken(token);        
      } else {
        console.warn("No token received during registration.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.message || error.message);
      throw error;
    }
  };



export const fetchDashboardData = async () => {
    try {
        const token = getToken();
        
        
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
         const response = await axios.get(`${API_BASE_URL}/admin/dashboard`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
      });
      return response.data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching dashboard data:', error.response?.data?.message || error.message);
      throw error; // Throw the error to be handled by the caller
    }
  };



export const Trainerregister = async (email, password) => {
    try {
      // Make the API request to register the admin
      const response = await axios.post(
        `${API_BASE_URL}/trainers/register`,
        { email, password },
      );
  
      // Extract the JWT from the response (assuming it's returned in the response body)
      const { token } = response.data.data;
  
      // Store the JWT in sessionStorage
      if (token) {
        saveToken(token);
      } else {
        console.warn("No token received during registration.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.message || error.message);
      throw error;
    }
  };
  

  export const Trainerlogin = async (email, password) => {
    try {
      // Make the API request to register the admin
      const response = await axios.post(
        `${API_BASE_URL}/trainers/login`,
        { email, password },
      );
  
      // Extract the JWT from the response (assuming it's returned in the response body)
      const { token } = response.data.data;
      // Store the JWT in sessionStorage
      if (token) {
        saveToken(token);
      } else {
        console.warn("No token received during registration.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.message || error.message);
      throw error;
    }
  };


export const Tporegister = async (email, password) => {
    try {
      // Make the API request to register the admin
      const response = await axios.post(
        `${API_BASE_URL}/tpos/register`,
        { email, password },
      );

      // Extract the JWT from the response (assuming it's returned in the response body)
      const { token } = response.data;
  
      // Store the JWT in sessionStorage
      if (token) {
        
        saveToken(token);
      } else {
        console.warn("No token received during registration.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.message || error.message);
      throw error;
    }
  };
  

  export const Tpologin = async (email, password) => {
    try {
      // Make the API request to register the admin
      const response = await axios.post(
        `${API_BASE_URL}/tpos/login`,
        { email, password },
      );
  
      // Extract the JWT from the response (assuming it's returned in the response body)
      const { token } = response.data.data;
      // Store the JWT in sessionStorage
      if (token) {
        saveToken(token);
      } else {
        console.warn("No token received during registration.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.message || error.message);
      throw error;
    }
  };



export const Studentregister = async (email, password) => {
    try {
      // Make the API request to register the admin
      const response = await axios.post(
        `${API_BASE_URL}/students/register`,
        { email, password },
      );
  
      // Extract the JWT from the response (assuming it's returned in the response body)
      const { token } = response.data;
  
      // Store the JWT in sessionStorage
      if (token) {
        saveToken(token);
      } else {
        console.warn("No token received during registration.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.message || error.message);
      throw error;
    }
  };
  

  export const Studentlogin = async (email, password) => {
    try {
      // Make the API request to register the admin
      const response = await axios.post(
        `${API_BASE_URL}/students/login`,
        { email, password },
      );
  
      // Extract the JWT from the response (assuming it's returned in the response body)
      const { token } = response.data.data;
      // Store the JWT in sessionStorage
      if (token) {
        saveToken(token);
      } else {
        console.warn("No token received during registration.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.message || error.message);
      throw error;
    }
  };


  export const createMeeting = async (meetingDetails) => {
    const response = await axios.post(`${API_BASE_URL}/create`, meetingDetails);
    return response.data;
  };