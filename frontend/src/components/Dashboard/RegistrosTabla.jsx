import React, { useMemo, useState } from "react";
import { Card, Form, Button, Table, Pagination, Row, Col } from "react-bootstrap";
import { FaDownload, FaFilter } from "react-icons/fa";

const MOCK_DATA = [
  { fecha: "15/05/2023", tipo: "Presión Arterial", valor: "135/85 mmHg", estandar: "120/80 mmHg", estado: "Elevada", notas: "Medición después de ejercicio" },
  { fecha: "02/05/2023", tipo: "Colesterol Total", valor: "195 mg/dL", estandar: "< 200 mg/dL", estado: "Normal", notas: "Análisis trimestral" },
  { fecha: "28/04/2023", tipo: "Frecuencia Cardíaca", valor: "78 lpm", estandar: "60-100 lpm", estado: "Normal", notas: "Medición en reposo" },
  { fecha: "15/04/2023", tipo: "Presión Arterial", valor: "142/88 mmHg", estandar: "120/80 mmHg", estado: "Alta", notas: "Después de reunión estresante" },
  { fecha: "01/04/2023", tipo: "Triglicéridos", valor: "165 mg/dL", estandar: "< 150 mg/dL", estado: "Elevado", notas: "Análisis trimestral" },
];

export default function RegistrosTabla() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    if (!q) return MOCK_DATA;
    const term = q.toLowerCase();
    return MOCK_DATA.filter(
      (r) =>
        r.fecha.toLowerCase().includes(term) ||
        r.tipo.toLowerCase().includes(term) ||
        r.valor.toLowerCase().includes(term) ||
        r.estado.toLowerCase().includes(term) ||
        r.notas.toLowerCase().includes(term)
    );
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const data = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
        <div className="fw-semibold">Registros Detallados</div>
        <div className="d-flex align-items-center gap-2">
          <Form.Control
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Buscar por fecha, tipo de medición..."
            style={{ maxWidth: 280 }}
          />
          <Button variant="outline-secondary" className="d-flex align-items-center gap-1">
            <FaFilter /> Filtrar
          </Button>
          <Button variant="outline-secondary" className="d-flex align-items-center gap-1">
            <FaDownload /> Exportar
          </Button>
        </div>
      </Card.Header>

      <Card.Body className="p-0">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Estándar</th>
              <th>Estado</th>
              <th>Notas</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i}>
                <td>{r.fecha}</td>
                <td>{r.tipo}</td>
                <td>{r.valor}</td>
                <td>{r.estandar}</td>
                <td>
                  <span
                    className={
                      "badge " +
                      (r.estado.toLowerCase().includes("normal")
                        ? "bg-success"
                        : r.estado.toLowerCase().includes("elev")
                        ? "bg-warning text-dark"
                        : "bg-danger")
                    }
                  >
                    {r.estado}
                  </span>
                </td>
                <td className="text-muted">{r.notas}</td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <Button variant="outline-secondary">Ver</Button>
                    <Button variant="outline-secondary">Editar</Button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>

      <Card.Footer className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
        <div className="text-muted small">
          Mostrando {data.length} de {filtered.length} registros
        </div>
        <Pagination className="mb-0">
          <Pagination.Prev disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={page === i + 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
        </Pagination>
      </Card.Footer>
    </Card>
  );
}
