import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginPage.css"; // Usa el mismo CSS institucional

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) navigate("/tasks");
  });

  return (
    <div className="container-fluid login-container d-flex justify-content-center align-items-center">
      <div className="row login-card d-flex flex-lg-row flex-column">
        {/* Sección izquierda: formulario */}
        <div className="col-lg-6 login-form-section">
          <h2 className="login-title mb-2">Registrarse</h2>
          <p className="login-subtitle mb-4">
            Crea una cuenta con tu nombre, correo institucional y contraseña.
          </p>

          {registerErrors?.map((err, i) => (
            <div key={i} className="alert alert-danger py-1">{err}</div>
          ))}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  {...register("name", { required: true })}
                  className="form-control"
                  placeholder="Tu nombre"
                />
              </div>
              {errors.name && (
                <p className="text-danger mb-0">El nombre es obligatorio</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Correo</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope-at"></i>
                </span>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="form-control"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              {errors.email && (
                <p className="text-danger mb-0">Correo obligatorio</p>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="form-control"
                  placeholder="********"
                />
              </div>
              {errors.password && (
                <p className="text-danger mb-0">Contraseña obligatoria</p>
              )}
            </div>

            <button className="btn login-button w-100" type="submit">
              Registrarse
            </button>

            <div className="mt-3 text-center">
              <span>¿Ya tienes cuenta? </span>
              <Link to="/login" className="forgot-password-link">
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>

        {/* Sección derecha: bienvenida */}
        <div className="col-lg-6 login-welcome-section d-flex flex-column justify-content-center align-items-center text-center p-4">
          <div className="welcome-content">
            <h2 className="welcome-title">¡Bienvenido!</h2>
            <p className="welcome-text">
              Regístrate para comenzar a usar la plataforma de evaluación y registro clínico.
            </p>
            <Link to="/" className="register-button">
              Conoce más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
