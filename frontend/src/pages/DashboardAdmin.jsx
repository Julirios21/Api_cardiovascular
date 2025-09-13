import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Dashboard/Sidebar";
import Topbar from "../components/Dashboard/Topbar";
import DashboardHome from "../components/Dashboard/DashboardHome";
import RecordsTable from "../components/Dashboard/RecordsTable";
import Recommendations from "../components/Dashboard/Recommendations";
import Alerts from "../components/Dashboard/Alerts";
import "../styles/Dashboard/DashboardHome.css";

function DashboardAdmin() {
  return (
    <div className="dashboard-admin">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <Container fluid className="mt-4">
          <Row>
            <Col md={8}>
              <DashboardHome />
              <RecordsTable />
            </Col>
            <Col md={4}>
              <Recommendations />
              <Alerts />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default DashboardAdmin;
