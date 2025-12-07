import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios khusus untuk upload (multipart/form-data)
const uploadApi = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor: tambah token ke request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

uploadApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Jangan set Content-Type, browser akan set ke multipart/form-data
    delete config.headers['Content-Type'];
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: handle 401
const handleUnauth = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfileData');
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

api.interceptors.response.use((response) => response, handleUnauth);
uploadApi.interceptors.response.use((response) => response, handleUnauth);

export { api, uploadApi };
export default api;