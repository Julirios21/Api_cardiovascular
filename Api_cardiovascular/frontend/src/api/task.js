// frontend/src/api/task.js (temporal)
import axios from "./axios";
export const getTasks = () => axios.get("/usuarios");  // GET /api/usuarios -> lista
export const createTask  = () => Promise.reject(new Error('No implementado'));
export const updateTask  = () => Promise.reject(new Error('No implementado'));
export const deleteTask  = () => Promise.reject(new Error('No implementado'));
