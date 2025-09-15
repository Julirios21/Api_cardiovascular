// AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";


import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import TasksPage from "../pages/TasksPage";
import NotFound from "../pages/NotFound";
import ClinicalFormPage from "../pages/ClinicalFormPage";
import PrivateRoute from "../components/PrivateRoute";
import Contact from "../pages/Contact";
import Dashboard from "../pages/DashboardAdmin";

function LayoutWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login","/test", "/register", "/profile", "/dashboard"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/clinica-form" element={<ClinicalFormPage />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}