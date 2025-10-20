import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHeartbeat, FaRunning, FaUserMd } from "react-icons/fa"; // importamos iconos
import "../styles/BenefitsSection.css"; // importamos estilos

function BenefitsSection() {
  const benefits = [
    {
      title: "Previene riesgos",
      text: "Mantener hábitos saludables fortalece tu sistema cardiovascular y reduce la posibilidad de sufrir infartos.",
      link: "#",
      icon: <FaHeartbeat className="benefit-icon" />, // icono
    },
    {
      title: "Más energía",
      text: "Un corazón sano mejora tu resistencia física y mental, ayudándote a disfrutar tus actividades diarias.",
      link: "#",
      icon: <FaRunning className="benefit-icon" />, // icono
    },
    {
      title: "Cirugía cardiovascular",
      text: "Cuidar tu salud cardiovascular no solo aumenta tu esperanza de vida, sino que también asegura años más plenos.",
      link: "#",
      icon: <FaUserMd className="benefit-icon" />, // icono
    },
  ];

  return (
    <section className="py-5 bg-white shadow-sm">
      <Container>
        <Row className="text-center mb-4">
          <h2 className="fw-bold">
            Cuida tu salud, <span className="text-danger">¿Qué esperas?</span>
          </h2>
        </Row>
        <Row>
          {benefits.map((benefit, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="h-100 shadow-sm border-0 text-secondary text-center">
                <Card.Body>
                  {/* Icono arriba */}
                  <div className="mb-3">{benefit.icon}</div>
                  <Card.Title className="fw-bold text-center text-black">
                    {benefit.title}
                  </Card.Title>
                  <Card.Text>{benefit.text}</Card.Text>
                  <Button variant="outline-danger" href={benefit.link}>
                    Más información
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default BenefitsSection;
