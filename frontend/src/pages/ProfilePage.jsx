import React, { useEffect } from "react"; // Importar React y useEffect
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Asegúrate de importar Link si lo usas
import CsvUploader from "../components/CsvUploader"; // Importar el componente de subida de CSV
import PatientsList from "../components/PatientsList"; // Importar el componente de lista de pacientes

// Importar un archivo CSS si tienes estilos específicos para la página de perfil
// import "../styles/ProfilePage.css";

function ProfilePage() {
  const { user, signout, isAuth, loading } = useAuth(); // Añadir 'loading' y 'isAuth' del contexto
  const navigate = useNavigate();

  // Redirigir al login si no está autenticado y no está cargando
  useEffect(() => {
    if (!loading && !isAuth && !user) {
      navigate("/login");
    }
  }, [isAuth, loading, user, navigate]);

  const handleLogout = () => {
    signout();         // Cierra sesión desde el contexto
    navigate("/login"); // Redirige al login
  };

  // Mostrar un estado de carga mientras se obtiene la información del usuario
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no hay usuario o no está autenticado después de cargar, muestra el mensaje de no disponible
  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center" role="alert">
          No hay información de usuario disponible. Por favor, inicia sesión.
          <Link to="/login" className="alert-link ms-2">Ir a Login</Link>
        </div>
      </div>
    );
  }

  // Renderizar la página cuando el usuario está cargado
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">👤 Perfil de Usuario</h2>

      <div className="card shadow-sm mx-auto mb-5" style={{ maxWidth: '600px' }}> {/* Añadir mb-5 para espacio */}
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Información del Usuario Registrado</h5>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item">
              <strong>ID:</strong> {user.id}
            </li>
            <li className="list-group-item">
              <strong>Nombre:</strong> {user.name}
            </li>
            <li className="list-group-item">
              <strong>Correo:</strong> {user.email}
            </li>
            <li className="list-group-item">
              <strong>Cédula:</strong> {user.cedula}
            </li>
            <li className="list-group-item">
              <strong>Tipo de Usuario:</strong> {user.tipo_usuario} {/* Mostrar tipo de usuario */}
            </li>
            {/* Puedes mostrar más datos si tu backend los envía */}
          </ul>

          <div className="d-grid">
            <button onClick={handleLogout} className="btn btn-danger btn-lg">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN PARA CARGA DE CSV (Condicional según tipo de usuario) */}
      {/* Asumiendo que 'admin' es el tipo de usuario que puede importar CSVs */}
      {user.tipo_usuario === 'externo' && ( // O el rol que consideres adecuado
        <div className="card shadow-sm mx-auto mb-5" style={{ maxWidth: '800px' }}>
          <div className="card-body">
            <h5 className="card-title text-center mb-4">📤 Importar Datos de Pacientes (CSV)</h5>
            <CsvUploader />
          </div>
        </div>
      )}

      {/* SECCIÓN PARA LISTAR PACIENTES (Condicional según tipo de usuario) */}
      {/* Puedes decidir si todos los usuarios pueden ver la lista o solo ciertos roles */}
      {user.tipo_usuario === 'externo' || user.tipo_usuario === 'medico' ? ( // Ejemplo: admin o medico pueden ver la lista
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '1000px' }}> {/* Aumentar el ancho para la tabla */}
          <div className="card-body">
            <h5 className="card-title text-center mb-4">📋 Lista de Pacientes Registrados</h5>
            <PatientsList />
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          No tienes permisos para ver la lista de pacientes.
        </div>
      )}
    </div>
  );
}

export default ProfilePage;