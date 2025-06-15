// src/services/userService.js
import axios from "axios";

const CLIENT_API = import.meta.env.CLIENT_API || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: CLIENT_API,
  withCredentials: true,
});

/**
 * Registers a new user with the backend.
 * @param {Object} formData - User registration data.
 * @returns {Promise<Object>} - The response data from the server.
 */
export const registerUser = async (formData) => {
  try {
    const response = await apiClient.post("/user/register", formData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed";
    throw new Error(message);
  }
};

/**
 * Logs in a user with the backend.
 * @param {Object} formData - User login data (e.g., { identifier, password }).
 * @returns {Promise<Object>} - The response data including access token and user info.
 */
export const loginUser = async (formData) => {
  try {
    const response = await apiClient.post("/user/login", formData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Login failed. Please check your credentials.";
    throw new Error(message);
  }
};

/**
 * Sets the Authorization header for subsequent requests.
 * @param {string} token - The access token (or null to clear).
 */
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.Authorization;
  }
};