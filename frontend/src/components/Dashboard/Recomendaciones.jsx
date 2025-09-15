import React from "react";
import { Card, Button } from "react-bootstrap";

const Recomendaciones = () => {
  return (
    <Card>
      <Card.Header>Recomendaciones</Card.Header>
      <Card.Body>
        <ul>
          <li>🏃 Ejercicio cardiovascular: 30 minutos de caminata diaria</li>
          <li>🥗 Dieta baja en sodio: Reducir consumo de sal</li>
          <li>💧 Hidratación: Beber al menos 8 vasos de agua al día</li>
        </ul>
        <Button size="sm" variant="outline-danger">
          Editar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Recomendaciones;
