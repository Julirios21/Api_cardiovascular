import React from "react";
import { Navbar, Button, Form, InputGroup } from "react-bootstrap";
import { Search, PlusCircle, Menu } from "lucide-react";

const NavbarTop = ({ onToggleSidebar }) => {
  return (
    <Navbar bg="white" className="px-4 border-bottom w-100" expand="lg">
      {/* Botón hamburguesa solo en pantallas pequeñas */}
      <Button
        variant="outline-secondary"
        className="me-3 d-lg-none"
        onClick={onToggleSidebar}
      >
        <Menu size={18} />
      </Button>

      {/* Buscador */}
      <InputGroup style={{ maxWidth: "350px" }}>
        <InputGroup.Text>
          <Search size={16} />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Buscar pacientes, registros o síntomas..."
        />
      </InputGroup>

      {/* Botón + usuario */}
      <div className="ms-auto d-flex align-items-center">
        <Button variant="danger" className="me-3 d-flex align-items-center">
          <PlusCircle size={16} className="me-1" />
          Nuevo registro
        </Button>
        <img
          src="https://via.placeholder.com/40"
          alt="Doctor"
          className="rounded-circle border"
        />
        <span className="ms-2 fw-bold">Dra. Elena Martínez</span>
      </div>
    </Navbar>
  );
};

export default NavbarTop;
