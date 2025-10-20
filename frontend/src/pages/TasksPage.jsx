import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../api/task";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateTask(editing, form);
    } else {
      await createTask(form);
    }
    setForm({ title: "", description: "" });
    setEditing(null);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditing(task.id);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Tareas</h2>

      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-success w-100" type="submit">
            {editing ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </form>

      {tasks.length > 0 ? (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={task.id}>
                <td>{idx + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(task)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay tareas registradas.</p>
      )}
    </div>
  );
}

export default TasksPage;
