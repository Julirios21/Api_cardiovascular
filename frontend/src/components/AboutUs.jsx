import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <section className="py-5" id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="fw-bold text-danger">Quiénes somos</h2>
            <p>
              Un proyecto de la <strong>Universidad Libre</strong>.  
              El sistema de control a problemas cardiovasculares es una iniciativa institucional enfocada 
              en la prevención y seguimiento de la salud comunitaria, permitiendo la recolección estructurada 
              de datos clínicos básicos y el desarrollo de tamizajes que faciliten una evaluación temprana 
              del estado de salud de la población.
            </p>
            <Button variant="danger" to="/about" as={Link}>Conoce más</Button>
          </Col>
          <Col md={6}>
            <img
              src="about.png"
              alt="Quiénes somos"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AboutUs;
