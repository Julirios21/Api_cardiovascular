import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/LoginPage.css";

function TestPage() {
  return (
    <div className="testpage-container">
      <Container fluid>
        <Row className="vh-100">
          {/* Columna izquierda: imagen como background */}
          <Col
            md={6}
            className="d-none d-md-flex align-items-center justify-content-center left-col"
          >
            {/* No necesitas <img>, el fondo se maneja en CSS */}
          </Col>

          {/* Columna derecha: formulario */}
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center right-col"
          >
            <div className="login-card shadow-sm p-4 rounded w-75">
              <h2 className="text-center fw-bold mb-2 text-danger">VitalNurse</h2>
              <h4 className="text-center mb-3">Bienvenido de nuevo</h4>
              <p className="text-center text-muted mb-4">
                Ingrese sus credenciales para acceder a su cuenta
              </p>

              <Form>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre de usuario"
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check type="checkbox" label="Recordarme" />
                  <a href="#" className="forgot-link">
                    ¿Olvidó su contraseña?
                  </a>
                </div>

                <Button variant="danger" type="submit" className="w-100 mb-3">
                  Iniciar sesión
                </Button>
              </Form>

              {/* Línea divisoria */}
              <div className="divider">
                <span></span>
              </div>

              {/* Footer */}
              <div className="login-footer text-center mt-4">
                <a href="#">Términos y condiciones</a> |{" "}
                <a href="#">Política de privacidad</a> | <a href="#">Ayuda</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TestPage;
