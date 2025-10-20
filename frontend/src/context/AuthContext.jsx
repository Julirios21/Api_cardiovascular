import { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

// recorte clave dentro de AuthContext.jsx:
const signin = async (data) => {
  try {
    const res = await axios.post("/signin", data);   // { access_token, user }
    const token = res.data?.access_token;
    if (token) {
      // guarda token en memoria o storage
      localStorage.setItem('token', token);
      // pide el perfil
      const profile = await axios.get("/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(profile.data);
      setIsAuth(true);
    } else {
      setErrors(['No se recibió token']);
    }
  } catch (err) {
    setErrors([err.response?.data?.message || "Error al iniciar sesión"]);
  }
};


  const signup = async (data) => {
    try {
      const res = await axios.post("/signup", data);
      // Cookie.set("token", res.data.access_token);
      const profile = await axios.get("/profile");
      setUser(profile.data);
      setIsAuth(true);
    } catch (err) {
      setErrors([err.response?.data?.detail || "Error al registrarse"]);
    }
  };

  const signout = () => {
    Cookie.remove("token");
    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      axios.get("/profile")
        .then(res => {
          setUser(res.data);
          setIsAuth(true);
        })
        .catch(() => {
          setUser(null);
          setIsAuth(false);
        });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuth,
      errors,
      signin,
      signup,
      signout,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
