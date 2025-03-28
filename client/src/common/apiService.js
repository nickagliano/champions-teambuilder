import axios from "axios";

// Get the backend base URL from environment variables
export const BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// Request interceptor to add Authorization token if available
api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Add the Authorization header for authenticated requests
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error with request interceptor:", error);
    return Promise.reject(error);
  }
);

export default api;
