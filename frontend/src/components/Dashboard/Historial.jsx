import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";

const DATA = [
  { fecha: "12/05/2023", sist: 135, diast: 85, fc: 78, estado: "Elevado" },
  { fecha: "28/04/2023", sist: 140, diast: 90, fc: 82, estado: "Alto" },
  { fecha: "14/04/2023", sist: 138, diast: 88, fc: 76, estado: "Elevado" },
];

export default function Historial() {
  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span className="fw-semibold">Historial de registros</span>
        <Button size="sm" variant="outline-secondary" className="d-flex align-items-center gap-1">
          <FaDownload className="me-1" /> Exportar datos
        </Button>
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive size="sm" hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Fecha</th>
              <th>Sistólica</th>
              <th>Diastólica</th>
              <th>FC</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map((r, i) => (
              <tr key={i}>
                <td>{r.fecha}</td>
                <td>{r.sist}</td>
                <td>{r.diast}</td>
                <td>{r.fc}</td>
                <td>
                  <span className="badge bg-warning text-dark">{r.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
