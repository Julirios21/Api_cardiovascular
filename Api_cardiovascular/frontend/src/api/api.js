// frontend/src/api/api.js
import API from "./axios";

// Login: se convertirá en http://localhost:5173/api/signin (proxied -> 3000)
export const loginRequest = (data) => API.post('/signin', data);

// Si llamas /profile desde aquí, ya usará el Bearer del interceptor:
export const profileRequest = () => API.get('/profile');
