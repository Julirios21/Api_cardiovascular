// frontend/src/api/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api', 
    withCredentials: true // Necesario para que Axios envíe y reciba cookies (como tu token JWT)
});


export default instance;
