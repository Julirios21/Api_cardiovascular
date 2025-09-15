import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import "../../styles/Dashboard/RecordsTable.css";

const mockData = [
  { id: 1, nombre: "Juan Pérez", cedula: "12345678", fecha: "2025-09-01", estado: "Normal" },
  { id: 2, nombre: "María Gómez", cedula: "87654321", fecha: "2025-09-02", estado: "Alerta" },
  { id: 3, nombre: "Carlos Ruiz", cedula: "10567890", fecha: "2025-09-05", estado: "Recomendación" },
];

const RecordsTable = ({ data = mockData }) => {
  return (
    <Card className="records-card">
      <Card.Body>
        <div className="records-header">
          <Card.Title>Registros recientes</Card.Title>
          <Button variant="outline-success" size="sm">
            Exportar Excel
          </Button>
        </div>

        <Table responsive hover className="records-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.map((r) => (
              <tr key={r.id}>
                <td>{r.nombre}</td>
                <td>{r.cedula}</td>
                <td>{r.fecha}</td>
                <td>
                  <span
                    className={`badge ${
                      r.estado === "Alerta"
                        ? "bg-danger"
                        : r.estado === "Recomendación"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {r.estado}
                  </span>
                </td>
                <td>
                  <Button size="sm" variant="outline-primary" className="me-2">
                    Ver
                  </Button>
                  <Button size="sm" variant="outline-secondary">
                    Editar
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

export default RecordsTable;