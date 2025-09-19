import React from "react";
import { Card, Table, Button, Pagination, Spinner } from "react-bootstrap";

const badgeClass = (s) => {
  const v = (s || "").toLowerCase();
  if (v.includes("normal")) return "badge bg-success";
  if (v.includes("elev")) return "badge bg-warning text-dark";
  return "badge bg-danger";
};

export default function TablaDatos({
  rows,
  total,
  page,
  setPage,
  pageSize,
  columns,
  loading,
  onEdit, // <- NUEVO
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Card className="mb-3">
      <Card.Header className="fw-semibold d-flex align-items-center gap-2">
        Resultados
        {loading && <Spinner animation="border" size="sm" />}
      </Card.Header>

      <Card.Body className="p-0">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id || i}>
                {columns.map((c) => {
                  const val = r[c.key];
                  if (c.key === "estado") {
                    return (
                      <td key={c.key}>
                        <span className={badgeClass(val)}>{val}</span>
                      </td>
                    );
                  }
                  return (
                    <td key={c.key} className={c.className || ""}>
                      {c.render ? c.render(r) : val}
                    </td>
                  );
                })}
                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <Button variant="outline-secondary" onClick={() => onEdit?.(r)}>
                      Editar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center text-muted py-4">
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>

      <Card.Footer className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
        <div className="text-muted small">
          Mostrando {rows.length} de {total} registros
        </div>
        <Pagination className="mb-0">
          <Pagination.Prev disabled={page === 1} onClick={() => setPage(Math.max(1, page - 1))} />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item key={i} active={page === i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={page === totalPages} onClick={() => setPage(Math.min(totalPages, page + 1))} />
        </Pagination>
      </Card.Footer>
    </Card>
  );
}
