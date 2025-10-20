import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../../styles/Dashboard/DashboardHome.css";

const DashboardHome = () => {
  return (
    <div className="dashboard-home mb-4">
      {/* Tarjetas de métricas */}
      <Row className="g-3">
        <Col sm={4}>
          <Card className="summary-card">
            <Card.Body>
              <div className="card-icon bg-users">
                <i className="bi bi-people-fill"></i>
              </div>
              <div>
                <h6>Usuarios</h6>
                <h2>1,234</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="summary-card">
            <Card.Body>
              <div className="card-icon bg-alerts">
                <i className="bi bi-exclamation-triangle-fill"></i>
              </div>
              <div>
                <h6>Alertas</h6>
                <h2>24</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={4}>
          <Card className="summary-card">
            <Card.Body>
              <div className="card-icon bg-recommend">
                <i className="bi bi-lightbulb-fill"></i>
              </div>
              <div>
                <h6>Recomendaciones</h6>
                <h2>68</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gráfica */}
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Actividad reciente</Card.Title>
          <div className="chart-placeholder">
            {/* Aquí luego integramos librería de gráficas */}
            Gráfica de actividad (placeholder)
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardHome;