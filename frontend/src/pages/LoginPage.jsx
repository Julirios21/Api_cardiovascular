// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { signin, profile } from "../api/auth";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", cedula: "" });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);
    try {
      // 1) Login
      const { data } = await signin(form); // { access_token, user }
      if (!data?.access_token) throw new Error("No se recibió token");
      localStorage.setItem("token", data.access_token);

      // 2) Perfil (opcional: para llenar estado)
      await profile();

      // 3) Redirigir
      navigate("/dashboard"); // cambia a tu ruta de inicio interno
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Error al iniciar sesión";
      setErrMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="testpage-container">
      <Container fluid>
        <Row className="vh-100">
          <Col md={6} className="d-none d-md-flex align-items-center justify-content-center left-col" />
          <Col md={6} className="d-flex align-items-center justify-content-center right-col">
            <div className="login-card shadow-sm p-4 rounded w-75">
              <h2 className="text-center fw-bold mb-2 text-danger">VitalNurse</h2>
              <h4 className="text-center mb-3">Bienvenido de nuevo</h4>
              <p className="text-center text-muted mb-4">
                Ingrese sus credenciales para acceder a su cuenta
              </p>

              {errMsg && <Alert variant="danger" className="mb-3">{errMsg}</Alert>}

              <Form onSubmit={onSubmit}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="usuario@unilibre.edu.co"
                    value={form.email}
                    onChange={change}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="cedula" className="mb-3">
                  <Form.Label>Cédula</Form.Label>
                  <Form.Control
                    type="password"
                    name="cedula"
                    placeholder="Ingrese su cédula"
                    value={form.cedula}
                    onChange={change}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check type="checkbox" label="Recordarme" />
                  <a href="#" className="forgot-link">¿Olvidó su contraseña?</a>
                </div>

                <Button variant="danger" type="submit" className="w-100 mb-3" disabled={loading}>
                  {loading ? (<><Spinner size="sm" /> Ingresando…</>) : "Iniciar sesión"}
                </Button>
              </Form>

              <div className="divider"><span></span></div>

              <div className="login-footer text-center mt-4">
                <a href="#">Términos y condiciones</a> | <a href="#">Política de privacidad</a> | <a href="#">Ayuda</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
