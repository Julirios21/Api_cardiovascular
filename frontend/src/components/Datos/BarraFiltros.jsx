// src/components/Datos/BarraFiltros.jsx
import React from "react";
import { Card, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { FaFilter, FaDownload, FaBroom, FaColumns } from "react-icons/fa";

export default function BarraFiltros({
  filters,
  setFilter,
  clearFilters,
  onExport,
  columns,
  toggleColumn,
}) {
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span className="fw-semibold">Búsqueda y filtros</span>
        <Dropdown align="end">
          <Dropdown.Menu className="p-2" style={{ minWidth: 260 }}>
            {columns.map((c) => (
              <Form.Check
                key={c.key}
                type="checkbox"
                id={`col-${c.key}`}
                className="mb-1"
                label={c.label}
                checked={c.visible}
                onChange={(e) => toggleColumn(c.key, e.target.checked)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>

      <Card.Body>
        <Row className="g-3">
          <Col md={3} lg={2}>
            <Form.Label className="small text-muted">Buscar</Form.Label>
            <Form.Control
              value={filters.q}
              onChange={(e) => setFilter({ q: e.target.value })}
              placeholder="Paciente, tipo, estado, nota…"
            />
          </Col>
          <Col xs={6} md={4} lg={2}>
            <Form.Label className="small text-muted">Desde</Form.Label>
            <Form.Control
              type="date"
              value={filters.desde}
              onChange={(e) => setFilter({ desde: e.target.value })}
            />
          </Col>
          <Col xs={6} md={4} lg={2}>
            <Form.Label className="small text-muted">Hasta</Form.Label>
            <Form.Control
              type="date"
              value={filters.hasta}
              onChange={(e) => setFilter({ hasta: e.target.value })}
            />
          </Col>
          <Col md={4} lg={2}>
            <Form.Label className="small text-muted">Tipo</Form.Label>
            <Form.Select
              value={filters.tipo}
              onChange={(e) => setFilter({ tipo: e.target.value })}
            >
              <option value="">Todos</option>
              <option>Presión Arterial</option>
              <option>Colesterol Total</option>
              <option>Triglicéridos</option>
              <option>Frecuencia Cardíaca</option>
            </Form.Select>
          </Col>
          <Col md={3} lg={2}>
            <Form.Label className="small text-muted">Estado</Form.Label>
            <Form.Select
              value={filters.estado}
              onChange={(e) => setFilter({ estado: e.target.value })}
            >
              <option value="">Todos</option>
              <option>Normal</option>
              <option>Elevado</option>
              <option>Alta</option>
            </Form.Select>
          </Col>
          <Col xs="auto" className="d-flex align-items-end">
            <Button
              variant="outline-secondary"
              className="d-flex align-items-center gap-1"
              onClick={onExport}
            >
              <FaDownload /> Exportar
            </Button>
          </Col>
        </Row>

        <div className="d-flex flex-wrap align-items-center gap-2 mt-3">
          <Button
            variant="link"
            className="p-0 d-flex align-items-center gap-2"
            onClick={clearFilters}
          >
            <FaBroom /> Limpiar filtros
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
