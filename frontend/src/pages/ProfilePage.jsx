import { useEffect } from "react"; // Importar useEffect para posibles usos futuros, aunque no sea estrictamente necesario en este ejemplo inmediato
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">👤 Perfil de Usuario</h2> {/* Centrar el título */}

      {user ? (
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}> {/* Añadir sombra y centrar la tarjeta */}
          <div className="card-body">
            <h5 className="card-title text-center mb-4">Información del Usuario Registrado</h5> {/* Título más descriptivo */}
            <ul className="list-group list-group-flush mb-4"> {/* Aumentar mb */}
              <li className="list-group-item">
                <strong>ID:</strong> {user.id}
              </li>
              <li className="list-group-item">
                <strong>Nombre:</strong> {user.name} {/* Asumiendo que el backend también envía el nombre */}
              </li>
              <li className="list-group-item">
                <strong>Correo:</strong> {user.email}
              </li>
              <li className="list-group-item">
                <strong>Cédula:</strong> {user.cedula} {/* Mostrar la cédula */}
              </li>
              {/* Puedes mostrar más datos si tu backend los envía */}
              {/* Por ejemplo: <li className="list-group-item"><strong>Rol:</strong> {user.role}</li> */}
            </ul>

            <div className="d-grid"> {/* Hacer el botón ocupar todo el ancho */}
              <button onClick={handleLogout} className="btn btn-danger btn-lg"> {/* Botón más grande */}
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning text-center" role="alert"> {/* Centrar el mensaje de advertencia */}
          No hay información de usuario disponible. Por favor, inicia sesión.
          <Link to="/login" className="alert-link ms-2">Ir a Login</Link>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;