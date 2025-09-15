import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import "../../styles/Dashboard/Recommendations.css";

const recommendations = [
  "Controlar la presión arterial semanalmente",
  "Realizar actividad física 30 min, 3 veces/semana",
  "Agendar evaluación nutricional",
];

const Recommendations = () => {
  return (
    <Card className="recommend-card mb-4">
      <Card.Body>
        <Card.Title>Recomendaciones</Card.Title>

        <ListGroup variant="flush" className="recommend-list">
          {recommendations.map((r, i) => (
            <ListGroup.Item key={i}>{r}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Recommendations;