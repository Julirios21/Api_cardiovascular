import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import NavbarTop from "../components/Dashboard/NavbarTop";
import MainCards from "../components/Dashboard/MainCards";
import RegistrosTabla from "../components/Dashboard/RegistrosTabla";
import Historial from "../components/Dashboard/Historial";
import Recomendaciones from "../components/Dashboard/Recomendaciones";
import { Container, Row, Col } from "react-bootstrap";

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar visible en desktop o en mobile si está abierta */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Contenido principal */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Pasamos el handler para abrir sidebar */}
        <NavbarTop onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Container fluid className="flex-grow-1 py-4">
          <MainCards />
          <RegistrosTabla />
          <Row className="mt-3">
            <Col lg={6} className="mb-3">
              <Historial />
            </Col>
            <Col lg={6} className="mb-3">
              <Recomendaciones />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DashboardAdmin;
