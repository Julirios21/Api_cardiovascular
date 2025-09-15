import React from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import {
  Home,
  Database,
  BarChart2,
  Lightbulb,
  User,
  Settings,
  LogOut,
  AlertTriangle,
} from "lucide-react";

const SidebarContent = () => (
  <div className="d-flex flex-column justify-content-between h-100">
    <div>
      <h5 className="text-danger mb-4">❤️ CardioControl</h5>
      <Nav className="flex-column gap-2">
        <Nav.Link href="#"><Home size={16} className="me-2" /> Inicio</Nav.Link>
        <Nav.Link href="#"><Database size={16} className="me-2" /> Datos</Nav.Link>
        <Nav.Link href="#"><BarChart2 size={16} className="me-2" /> Estadísticas</Nav.Link>
        <Nav.Link href="#"><Lightbulb size={16} className="me-2" /> Recomendaciones</Nav.Link>
        <Nav.Link href="#"><User size={16} className="me-2" /> Quienes somos</Nav.Link>
      </Nav>

      <div className="alert alert-danger mt-4">
        <AlertTriangle className="me-2" size={16} />
        <strong>Alerta</strong>
        <p className="mb-0 small">
          Su próximo control de presión arterial está programado para mañana.
        </p>
      </div>
    </div>

    <Nav className="flex-column gap-2">
      <Nav.Link href="#"><Settings size={16} className="me-2" /> Configuración</Nav.Link>
      <Nav.Link href="#"><LogOut size={16} className="me-2" /> Cerrar sesión</Nav.Link>
    </Nav>
  </div>
);

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Sidebar fijo para pantallas grandes */}
      <div
        className="bg-light border-end p-3 d-none d-lg-block"
        style={{ width: "240px", minHeight: "100vh" }}
      >
        <SidebarContent />
      </div>

      {/* Sidebar colapsable para móviles */}
      <Offcanvas show={open} onHide={onClose} className="bg-light" style={{ width: "240px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-danger">❤️ CardioControl</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
