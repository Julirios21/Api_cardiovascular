import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHeart, FaStar, FaHandshake, FaLightbulb } from "react-icons/fa";
import "../styles/AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      {/* Nuestra Misión */}
      <section className="mission-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <img
                src="/slider.png" // 
                alt="Nuestra misión"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2 className="fw-bold text-danger">Nuestra Misión</h2>
              <p className="mt-3 text-muted">
                En VitalNurse, nos dedicamos a proporcionar atención médica de la
                más alta calidad con un enfoque centrado en el paciente.
                Nuestra misión es mejorar la salud y el bienestar de las
                comunidades a las que servimos, ofreciendo servicios médicos
                accesibles, compasivos y efectivos.
              </p>
              <p className="text-muted">
                Creemos que cada persona merece una atención médica excepcional
                entregada con dignidad y respeto. Trabajamos incansablemente
                para garantizar que nuestros pacientes reciban el mejor cuidado
                posible en un ambiente acogedor y profesional.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Nuestra Historia */}
      <section className="history-section py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-5">Nuestra Historia</h2>
          <Row className="text-center">
            <Col md={4}>
              <Card className="p-3 shadow-sm border-0">
                <h4 className="text-danger fw-bold">2005</h4>
                <h6 className="fw-bold">Fundación</h6>
                <p className="text-muted">
                  VitalNurse fue fundada por un grupo de médicos visionarios
                  comprometidos con transformar la experiencia de atención
                  médica.
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-3 shadow-sm border-0">
                <h4 className="text-danger fw-bold">2012</h4>
                <h6 className="fw-bold">Expansión</h6>
                <p className="text-muted">
                  Abrimos cinco nuevas clínicas en todo el país y ampliamos
                  nuestros servicios para incluir especialidades médicas
                  avanzadas.
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-3 shadow-sm border-0">
                <h4 className="text-danger fw-bold">2023</h4>
                <h6 className="fw-bold">Innovación</h6>
                <p className="text-muted">
                  Implementamos tecnologías de vanguardia y telemedicina para
                  mejorar el acceso a la atención médica para todos.
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Nuestros Valores */}
      <section className="values-section py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5">Nuestros Valores</h2>
          <Row>
            <Col md={3} className="mb-4">
              <Card className="p-4 text-center shadow-sm border-0 h-100">
                <FaHeart className="text-danger mb-3 fs-2" />
                <h5 className="fw-bold">Compasión</h5>
                <p className="text-muted">
                  Tratamos a cada paciente con empatía, dignidad y respeto.
                </p>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="p-4 text-center shadow-sm border-0 h-100 bg-danger text-white">
                <FaStar className="mb-3 fs-2" />
                <h5 className="fw-bold">Excelencia</h5>
                <p>
                  Nos esforzamos por alcanzar los más altos estándares en
                  atención médica y servicio al paciente.
                </p>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="p-4 text-center shadow-sm border-0 h-100">
                <FaHandshake className="text-danger mb-3 fs-2" />
                <h5 className="fw-bold">Integridad</h5>
                <p className="text-muted">
                  Actuamos con honestidad y transparencia en todas nuestras
                  interacciones y decisiones.
                </p>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="p-4 text-center shadow-sm border-0 h-100 bg-danger text-white">
                <FaLightbulb className="mb-3 fs-2" />
                <h5 className="fw-bold">Innovación</h5>
                <p>
                  Buscamos continuamente nuevas formas de mejorar nuestros
                  servicios y la experiencia del paciente.
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call To Action */}
      <section className="cta-section py-5 bg-light text-center">
        <Container>
          <h2 className="fw-bold mb-3">Únete a Nuestra Comunidad</h2>
          <p className="text-muted mb-4">
            En VitalNurse, creemos en construir relaciones duraderas con nuestros
            pacientes. Nos esforzamos por crear un ambiente donde todos se
            sientan bienvenidos y atendidos.
          </p>
          <div>
            <Button variant="danger" className="me-3">
              Agendar Cita
            </Button>
            <Button variant="outline-secondary" href="https://www.unilibre.edu.co/pereira/">Conoce la Universidad</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default AboutPage;
