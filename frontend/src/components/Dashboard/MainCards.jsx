import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  FaPlusCircle,
  FaClipboardList,
  FaEdit,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";

export default function MainCards() {
  return (
    <>
      {/* Encabezado: título + acciones */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <h1 className="h2 fw-bold mb-3 mb-md-0">Dashboard Administrativo</h1>
        <div className="d-flex flex-wrap gap-2">
          {/* En el mock solo se ven estos dos */}
          <Button variant="outline-danger" className="d-flex align-items-center gap-2 px-3">
            <FaClipboardList /> Registrar datos
          </Button>
          <Button variant="danger" className="d-flex align-items-center gap-2 px-3">
            <FaEdit /> Editar Recomendaciones
          </Button>
        </div>
      </div>
      <br />
      {/* Fila superior: Doctor (izq) + Alertas (der) */}
      <Row className="g-4">
        {/* Tarjeta Doctor */}
        <Col lg={6}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column flex-sm-row align-items-center gap-3">
              {/* Avatar */}
              <img
                src="https://i.pravatar.cc/120?img=12"
                alt="Foto del doctor"
                width={96}
                height={96}
                className="rounded-circle object-fit-cover"
                style={{ objectFit: "cover" }}
              />
              {/* Info */}
              <div className="flex-grow-1 w-100">
                <h5 className="mb-1 fw-semibold">Dr. Miguel Sánchez</h5>
                <p className="text-muted mb-3">Esp. en Arritmias, 20 años exp.</p>

                {/* Estrellas */}
                <div className="mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="me-1 text-warning" />
                  ))}
                </div>

                {/* Botón Detalles */}
                <Button
                  variant="danger"
                  className="px-4 py-2"
                  style={{ borderRadius: 12 }}
                >
                  Detalles
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Tarjeta Alertas y priorización */}
        <Col lg={6}>
          <Card
            className="h-100"
            style={{
              backgroundColor: "#ffe3e6", // rosa claro
              borderColor: "#f5c2c7",     // borde rosa
            }}
          >
            <Card.Body className="d-flex flex-column">
              <h5 className="fw-semibold mb-3">Alertas y priorización</h5>

              {/* Item 1 */}
              <div className="d-flex align-items-start gap-3 mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 40,
                    height: 40,
                    background: "#fff",
                  }}
                >
                  <FaExclamationTriangle className="text-warning" />
                </div>
                <div>
                  <div className="fw-semibold">
                    Nivel de colesterol ligeramente elevado
                  </div>
                  <div className="text-muted">
                    Se recomienda reducir el consumo de grasas saturadas
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="d-flex align-items-start gap-3 mb-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 40,
                    height: 40,
                    background: "#fff",
                  }}
                >
                  <FaCalendarAlt className="text-danger" />
                </div>
                <div>
                  <div className="fw-semibold">Paciente</div>
                  <div className="text-muted">Nombre del paciente</div>
                </div>
              </div>

              {/* Botón Ver */}
              <div className="mt-auto">
                <Button
                  variant="outline-danger"
                  className="w-100 py-2"
                  style={{ borderRadius: 12 }}
                >
                  Ver
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
