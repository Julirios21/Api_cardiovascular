import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const MainCards = () => {
  return (
    <Row className="mb-3">
      <Col md={4}>
        <Card>
          <Card.Body>
            <h6>Médico asignado</h6>
            <hr />
            {/* Aquí luego integramos datos reales */}
            <img
              src="slider.png"
              alt="Médico"
              className="rounded-circle mb-2 border p-100 h-100 w-100"
            />
            <h5>Dr. Miguel Sánchez</h5>
            <p>Esp. en Arritmias, 20 años exp.</p>
            <p>⭐⭐⭐⭐⭐</p>
            <Button variant="outline-danger">Detalles</Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md={8}>
        <Card bg="light" border="danger">
          <Card.Body>
            <h6 className="text-danger">
              🔔 Nivel de colesterol ligeramente elevado
            </h6>
            <p className="mb-1">
              Se recomienda reducir el consumo de grasas saturadas.
            </p>
            <p>
                Consulte a su médico para un plan de dieta personalizado.
            </p>
            <Button variant="danger" size="sm">
              Ver
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MainCards;
