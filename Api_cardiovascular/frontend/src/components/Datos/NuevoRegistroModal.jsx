import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

const EMPTY = {
  fecha: "",
  tipo: "",
  valor: "",
  estandar: "",
  estado: "",
  paciente: "",
  notas: "",
};

export default function NuevoRegistroModal({ show, onClose, onCreate }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (!show) setForm(EMPTY);
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fecha || !form.tipo || !form.valor || !form.estado || !form.paciente) return;
    onCreate(form);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
            </Col>
            <Col md={6}>
              <Form.Label>Tipo</Form.Label>
              <Form.Select name="tipo" value={form.tipo} onChange={handleChange} required>
                <option value="">Seleccione…</option>
                <option>Presión Arterial</option>
                <option>Colesterol Total</option>
                <option>Triglicéridos</option>
                <option>Frecuencia Cardíaca</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Valor</Form.Label>
              <Form.Control name="valor" value={form.valor} onChange={handleChange} required />
            </Col>
            <Col md={6}>
              <Form.Label>Estándar</Form.Label>
              <Form.Control name="estandar" value={form.estandar} onChange={handleChange} />
            </Col>
            <Col md={6}>
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={form.estado} onChange={handleChange} required>
                <option value="">Seleccione…</option>
                <option>Normal</option>
                <option>Elevado</option>
                <option>Alta</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Paciente</Form.Label>
              <Form.Control name="paciente" value={form.paciente} onChange={handleChange} required />
            </Col>
            <Col md={12}>
              <Form.Label>Notas</Form.Label>
              <Form.Control name="notas" value={form.notas} onChange={handleChange} as="textarea" rows={3} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="danger" type="submit">Crear</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
