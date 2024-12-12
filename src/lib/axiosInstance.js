import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Directly return the error promise
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return response data directly if no error
    return response.data;
  },
  (error) => {
    // Handle response errors
    if (error.response && error.response.status === 401) {
      // Optionally handle unauthorized errors (e.g., logout the user)
      console.error("Unauthorized! Logging out...");
      localStorage.removeItem("token");
      // localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
