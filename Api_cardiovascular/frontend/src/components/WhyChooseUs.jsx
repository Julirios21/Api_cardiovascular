import { Container, Row, Col } from "react-bootstrap";
import { BsCheck2Circle } from "react-icons/bs";
import "../styles/WhyChooseUs.css";

function WhyChooseUs() {
  return (
    <section className="why-choose-us py-5 bg-light" id="why-choose-us">
      <Container>
        <Row>
          {/* Mitad izquierda: contenido */}
          <Col md={6}>
            <h2 className="fw-bold">¿Por qué elegirnos?</h2>
            <p className="why-text">
              Cuidar tu salud es una decisión importante, y queremos ser tu mejor aliado en ese camino. 
              Nuestro compromiso está en ofrecerte atención de calidad, confianza y acompañamiento para 
              que vivas con tranquilidad y bienestar.
            </p>
            <ul className="why-list">
                <li><BsCheck2Circle className="icon-red" /> Especialistas certificados con amplia experiencia</li>
                <li><BsCheck2Circle className="icon-red" /> Tecnología de última generación</li>
                <li><BsCheck2Circle className="icon-red" /> Atención personalizada y seguimiento continuo</li>
                <li><BsCheck2Circle className="icon-red" /> Te acompañamos en la prevención, cuidado y seguimiento</li>
            </ul>
          </Col>

          {/* Mitad derecha: vacío */}
          <Col md={6}></Col>
        </Row>
      </Container>
    </section>
  );
}

export default WhyChooseUs;
