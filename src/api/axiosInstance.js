// src/api/axiosInstance.js
import axios from 'axios';

// Instance utama untuk JSON
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instance khusus untuk Upload (Multipart)
export const uploadApi = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// --- INTERCEPTOR: Otomatis sisipkan Token ---
const addToken = (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(addToken, (error) => Promise.reject(error));

uploadApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Browser akan otomatis set Content-Type: multipart/form-data saat ada File
  return config;
}, (error) => Promise.reject(error));

export default api;