import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptar cada petición para incluir el token
instance.interceptors.request.use((config) => {
  const token = Cookie.get("token");  //  leer el token de la cookie
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  //  agregar encabezado
  }
  return config;
});

export default instance;
