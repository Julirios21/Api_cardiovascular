import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();              // Cierra sesión desde el contexto
    navigate("/login");     // Redirige al login
  };

  

  return (
    <div className="container py-5">
      <h2 className="mb-4">👤 Perfil de Usuario</h2>

      {user ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Información del usuario</h5>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">
                <strong>ID:</strong> {user.id}
              </li>
              <li className="list-group-item">
                <strong>Correo:</strong> {user.email}
              </li>
              {/* Puedes mostrar más datos si tu backend los envía */}
            </ul>

            <button onClick={handleLogout} className="btn btn-danger">
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          No hay información del usuario.
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
