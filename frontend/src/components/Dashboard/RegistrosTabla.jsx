import React from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

const registros = [
  {
    fecha: "15/05/2023",
    tipo: "Presión Arterial",
    valor: "135/85 mmHg",
    estandar: "120/80 mmHg",
    estado: "Elevada",
    notas: "Medición después de ejercicio",
  },
  {
    fecha: "02/05/2023",
    tipo: "Colesterol Total",
    valor: "195 mg/dL",
    estandar: "< 200 mg/dL",
    estado: "Normal",
    notas: "Análisis trimestral",
  },
];

const RegistrosTabla = () => {
  return (
    <Card className="mb-3">
      <Card.Header>Registros Detallados</Card.Header>
      <Card.Body className="p-0">
        <Table striped hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Estándar</th>
              <th>Estado</th>
              <th>Notas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r, index) => (
              <tr key={index}>
                <td>{r.fecha}</td>
                <td>{r.tipo}</td>
                <td>{r.valor}</td>
                <td>{r.estandar}</td>
                <td>
                  <Badge
                    bg={
                      r.estado === "Normal"
                        ? "success"
                        : r.estado === "Elevada"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {r.estado}
                  </Badge>
                </td>
                <td>{r.notas}</td>
                <td>
                  <Button size="sm" variant="light">
                    🔎
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default RegistrosTabla;
