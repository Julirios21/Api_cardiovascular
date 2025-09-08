import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa"; // 👈 icono

function CustomNavbar() {
  return (
    <Navbar bg="danger" expand="lg" variant="dark" className="shadow-sm fixed-top">
      <Container>
        {/* Marca con icono */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white d-flex align-items-center">
          <FaHeartbeat className="me-2 brand-icon" /> {/* 👈 icono */}
          VitalNurse
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link href="#home" className="nav-link-custom">Inicio</Nav.Link>
            <Nav.Link href="#about" className="nav-link-custom">Quiénes somos</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">Contacto</Nav.Link>
          </Nav>
          <div className="d-flex ms-lg-4 mt-3 mt-lg-0">
            <Button
              as={Link}
              to="/register"
              variant="outline-light"
              className="me-2 fw-semibold px-4"
            >
              Registrarse
            </Button>
            <Button
              as={Link}
              to="/login"
              variant="light"
              className="fw-semibold px-4 text-danger"
            >
              Iniciar sesión
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
