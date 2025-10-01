import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";
import "../../styles/Dashboard/Alerts.css";

const alerts = [
  { id: 1, title: "Tensión arterial elevada", subtitle: "Juan Pérez - 180/110", severity: "Alta" },
  { id: 2, title: "IMC fuera de rango", subtitle: "María Gómez - IMC 31", severity: "Media" },
];

const Alerts = () => {
  return (
    <Card className="alerts-card">
      <Card.Body>
        <Card.Title>Alertas</Card.Title>

        <ListGroup variant="flush" className="alerts-list">
          {alerts.map((a) => (
            <ListGroup.Item key={a.id} className="d-flex justify-content-between align-items-start">
              <div>
                <div className="fw-bold">{a.title}</div>
                <div className="small text-muted">{a.subtitle}</div>
              </div>
              <Badge bg={a.severity === "Alta" ? "danger" : "warning"}>
                {a.severity}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Alerts;