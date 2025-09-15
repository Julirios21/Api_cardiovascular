import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import "../styles/Contact.css";

function Contact() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowAlert(true);

    // Mostrar la alerta por 3s y luego redirigir
    setTimeout(() => {
      setShowAlert(false);
      navigate("/"); // 👈 redirige al inicio
    }, 3000);
  };

  return (
    <section className="contact-section py-5 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center mb-4">
              <h2 className="fw-bold">Comunicación con Especialista</h2>
              <p className="text-muted">
                Consulta con nuestros especialistas en salud cardiovascular para
                recibir asesoramiento personalizado
              </p>
            </div>

            <Card className="shadow-sm border-0 p-4">
              {/* Alerta de éxito dentro de la Card */}
              {showAlert && (
                <Alert variant="success" className="mb-3 text-center fw-semibold">
                  ✅ ¡Su consulta fue enviada exitosamente!
                  <br />
                  Redirigiendo al inicio...
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control type="text" placeholder="Nombre" required />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control type="email" placeholder="Correo" required />
                </Form.Group>

                <Form.Group controlId="phone" className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="text" placeholder="Teléfono" required />
                </Form.Group>

                <Form.Group controlId="message" className="mb-4">
                  <Form.Label>Motivo de consulta</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Describa brevemente el motivo de su consulta"
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="danger" type="submit">
                    Confirmar
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
