import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { isAuth, loading } = useAuth();

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
