// frontend/src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginPage.css"; // Importa el CSS

function LoginPage() {
  const { signin, isAuth, errors } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signin({ email, cedula }); 
    console.log("Resultado del login:", result);
  };

  useEffect(() => {
    if (isAuth) navigate("/profile");
  }, [isAuth]);

  return (
    <div className="container-fluid login-container d-flex justify-content-center align-items-center">
      <div className="row login-card d-flex flex-lg-row flex-column">
        {/* Sección izquierda: formulario */}
        <div className="col-lg-6 login-form-section d-flex flex-column justify-content-center align-items-center"> 
          {/* Contenedor interno para el contenido real del formulario y mantener el ancho limitado */}
          <div style={{ maxWidth: '400px', width: '100%' }}> 
            <h2 className="login-title mb-2 text-center">Iniciar Sesión</h2> 
            <p className="login-subtitle mb-4 text-center">Accede con tu correo institucional y cédula.</p> 

            {errors?.map((err, i) => (
              <div key={i} className="alert alert-danger py-1">{err}</div>
            ))}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Cédula</label> 
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person-badge"></i> 
                  </span>
                  <input
                    type="text" 
                    className="form-control"
                    value={cedula} 
                    onChange={(e) => setCedula(e.target.value)} 
                    placeholder="123456789" 
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/forgot-password" className="forgot-password-link">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botón de Iniciar Sesión */}
              <button type="submit" className="btn login-button w-100">
                INICIAR SESIÓN
              </button>
            </form>
          </div>
        </div>

        {/* Sección derecha: bienvenida */}
        <div className="col-lg-6 login-welcome-section d-flex flex-column justify-content-center align-items-center text-center p-4">
          <div className="welcome-content">
            <h2 className="welcome-title">¡Bienvenido!</h2>
            <p className="welcome-text">
              Esta plataforma permite registrar información socio-clínica para apoyar procesos de evaluación, docencia e investigación.
            </p>
            <Link to="/register" className="register-button">Registrarse</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;