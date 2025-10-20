import { Container, Row, Col, Button } from "react-bootstrap";

function CallToAction() {
  return (
    <section className="py-5 bg-danger text-white text-center">
      <Container>
        <Row>
          <Col>
            <h2 className="fw-bold mb-3">¿Listo para cuidar tu corazón?</h2>
            <p className="mb-4">
              Agenda una consulta con nuestros especialistas y da el primer paso hacia una mejor salud cardiovascular.
            </p>
            <div>
              <Button variant="light" className="me-2" href="/contact">
                Agendar cita
              </Button>
              <Button variant="outline-light" className="me-2" href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                Contactar por WhatsApp
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CallToAction;
