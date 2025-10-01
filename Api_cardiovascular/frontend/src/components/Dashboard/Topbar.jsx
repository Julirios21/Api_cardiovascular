import React from "react";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import "../../styles/Dashboard/Topbar.css";

const Topbar = ({ onLogout = () => {} }) => {
  return (
    <Navbar expand="md" className="topbar px-4">
      <Container fluid>
        {/* Logo o nombre del sistema */}
        <Navbar.Brand className="brand">
          <span className="brand-logo">CardioControl</span>
        </Navbar.Brand>

        {/* Buscador centrado */}
        <div className="search-group d-none d-md-flex">
          <Form className="d-flex w-100">
            <Form.Control
              type="search"
              placeholder="Buscar pacientes, registros..."
              aria-label="Buscar"
            />
            <Button variant="outline-secondary" className="search-btn ms-2">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </div>

        {/* Acciones de usuario */}
        <div className="user-actions ms-auto d-flex align-items-center">
          <Button className="btn-new me-3 d-none d-md-inline">
            + Nuevo registro
          </Button>

          <div className="user-info me-3">
            <div className="name">Dra. Elena Martínez</div>
            <div className="role">Admin</div>
          </div>

          <Button
            variant="outline-danger"
            className="btn-logout"
            onClick={onLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;