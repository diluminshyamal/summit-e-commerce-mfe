import axios from "axios";
import config from "../config/config.json"


const authApiInstance = axios.create({
  baseURL: `${config.serviceBaseURL}/api/v1`,
});

authApiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      
      // Attach the token to the Authorization header if available
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default authApiInstance;