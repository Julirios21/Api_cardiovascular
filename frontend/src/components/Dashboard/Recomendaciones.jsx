import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

export default function Recomendaciones() {
  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span className="fw-semibold">Recomendaciones</span>
        <Button size="sm" variant="outline-secondary">
          <FaEdit className="me-1" /> Editar
        </Button>
      </Card.Header>
      <Card.Body>
        <ul className="mb-3">
          <li className="mb-2">
            <strong>Ejercicio cardiovascular:</strong> 30 minutos de caminata diaria para mejorar la salud cardíaca.
          </li>
          <li className="mb-2">
            <strong>Dieta baja en sodio:</strong> Reducir el consumo de sal para controlar la presión arterial.
          </li>
        </ul>

        <div className="bg-light p-3 rounded">
          <p className="mb-1 fw-semibold">Dr. Miguel Sánchez</p>
          <p className="mb-0 text-muted small">
            Esp. en Arritmias, 20 años exp.{" "}
            <button className="btn btn-link btn-sm p-0 align-baseline">Detalles</button>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
