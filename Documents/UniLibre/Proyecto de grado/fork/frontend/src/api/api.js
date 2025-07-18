import API from "./axios";
import Cookie from "js-cookie";

// Función para enviar login
export const loginRequest = (data) => API.post("/signin", data);
