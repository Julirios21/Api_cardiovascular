import React from "react";
import { Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaHome, FaDatabase, FaChartBar, FaHeartbeat, FaInfoCircle } from "react-icons/fa";
import "../../styles/Dashboard/Sidebar.css";

const LINKS = [
  { to: "/dashboard", label: "Inicio", icon: <FaHome /> },
  { to: "/datos", label: "Datos", icon: <FaDatabase /> },
  { to: "/estadisticas", label: "Estadísticas", icon: <FaChartBar /> },
  { to: "/recomendaciones", label: "Recomendaciones", icon: <FaHeartbeat /> },
  { to: "/about", label: "Configuraciones", icon: <FaInfoCircle /> },
];

export default function Sidebar({ open, onClose }) {
  return (
    <Offcanvas
      show={open}
      onHide={onClose}
      placement="start"
      className="cc-offcanvas"
      backdrop
      scroll={false}
      style={{ width: 280 }}  // ancho cómodo en desktop y mobile
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menú</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0">
        <nav className="cc-sidebar-nav">
          <ul className="list-unstyled m-0 p-0">
            {LINKS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    "cc-sidebar-link" + (isActive ? " active" : "")
                  }
                  onClick={onClose}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
