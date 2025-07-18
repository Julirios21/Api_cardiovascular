import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isAuth, user, signout } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signout();
    setIsDropdownOpen(false);
  };

  // Cambia el color de fondo del navbar al hacer scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > true); // cambia a true si se desplazó más de 50px
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'} navbar-dark`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center ps-0" to="/"> 
          <img src="/escudo.png" alt="Escudo Universidad" className="navbar-logo me-2" />
          <span className="navbar-title fs-6">Plataforma de Evaluación Socio-Clínica</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item" >
              <Link className="nav-link" to="/about" onClick={handleNavCollapse}>
                Sobre nosotros
              </Link>
            </li>

            {!isAuth ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleNavCollapse}>
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={handleNavCollapse}>
                    Registrarme 
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown" ref={dropdownRef}>
                <button
                  className="nav-link dropdown-toggle"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen ? true : false}
                >
                  {user?.name || 'Usuario'}
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`}
                >
                  <li>
                    <Link className="dropdown-item" to="/profile" onClick={() => { setIsDropdownOpen(false); handleNavCollapse(); }}>
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleSignOut}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;