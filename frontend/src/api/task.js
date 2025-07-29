import axios from "./axios";

// Todas las tareas
export const getTasks = () => axios.get("/tasks");

// Crear una tarea
export const createTask = (data) => axios.post("/tasks", data);

// Eliminar una tarea
export const deleteTask = (id) => axios.delete(`/tasks/${id}`);

// Actualizar una tarea
export const updateTask = (id, data) => axios.put(`/tasks/${id}`, data);
