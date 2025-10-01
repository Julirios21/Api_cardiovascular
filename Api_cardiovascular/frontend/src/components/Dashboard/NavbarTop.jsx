import React from "react";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import { FaSearch, FaHeart } from "react-icons/fa";
import "../../styles/Dashboard/NavbarTop.css";

export default function NavbarTop({ onToggleSidebar }) {
  return (
    <Navbar bg="white" expand="lg-none" className="cc-navbar-top shadow-sm">
      <Container fluid className="d-flex align-items-center justify-content-between">
        
        {/* Marca: ícono + nombre */}
        <div className="d-flex align-items-center gap-1">
        <Button
          variant="outline-secondary"
          className="me-2"
          onClick={onToggleSidebar}
          aria-label="Abrir menú">
          <span className="navbar-toggler-icon" />
        </Button>
          <FaHeart className="text-danger fs-3" />
          <div className="fw-bold text-danger">CardioControl</div>
        </div>

        {/* Buscador */}
        <Form className="cc-search mx-4 flex-grow-1">
          <div className="cc-search-wrapper">
            <FaSearch className="cc-search-icon" />
            <Form.Control
              type="search"
              placeholder="Buscar pacientes, registros o síntomas..."
            />
          </div>
        </Form>

        {/* Botón + Perfil */}
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://i.pravatar.cc/120?img=12"
              alt="Avatar"
              className="rounded-circle"
              width={36}
              height={36}
            />
            <div className="d-flex flex-column">
              <span className="fw-semibold small">Dr. Miguel Sánchez</span>
              <small className="text-danger">Cerrar sesión</small>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
