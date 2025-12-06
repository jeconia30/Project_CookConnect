// src/api/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Pastikan port ini sama dengan backendmu
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;