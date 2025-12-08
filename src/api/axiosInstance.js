import axios from 'axios';

// Gunakan Environment Variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const uploadApi = axios.create({
  baseURL: BASE_URL,
});

// ... sisanya sama (interceptor, dll)

// Interceptor: tambah token ke request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

uploadApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Jangan set Content-Type, browser akan set ke multipart/form-data
    delete config.headers["Content-Type"];
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: handle 401
const handleUnauth = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfileData");
    window.location.href = "/login";
  }
  return Promise.reject(error);
};

api.interceptors.response.use((response) => response, handleUnauth);
uploadApi.interceptors.response.use((response) => response, handleUnauth);

export { api, uploadApi };
export default api;
