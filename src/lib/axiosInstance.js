import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Logging out...");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");

      return Promise.reject({
        ...error,
        customMessage: "Session expired. Please log in again.",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
