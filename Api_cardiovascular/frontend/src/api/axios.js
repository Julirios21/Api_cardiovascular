// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api',          // Proxy de Vite -> http://localhost:3000/api
  withCredentials: false    // usamos token Bearer, no cookies httpOnly
});

// Adjunta Bearer a TODAS las requests si existe en localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
