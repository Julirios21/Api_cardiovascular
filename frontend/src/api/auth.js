// src/api/auth.js
import API from './axios';

export const signin = (data) => API.post('/signin', data); // { email, cedula }
export const profile = () => API.get('/profile');
