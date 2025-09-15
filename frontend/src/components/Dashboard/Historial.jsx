import React from "react";
import { Card, Table, Badge } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const historial = [
  { fecha: "14/04/2023", sistolica: 138, diastolica: 88, fc: 76, estado: "Elevado" },
  { fecha: "28/04/2023", sistolica: 140, diastolica: 92, fc: 80, estado: "Alta" },
  { fecha: "12/05/2023", sistolica: 142, diastolica: 90, fc: 78, estado: "Elevado" },
];

const data = {
  labels: historial.map((h) => h.fecha),
  datasets: [
    {
      label: "Sistólica (mmHg)",
      data: historial.map((h) => h.sistolica),
      borderColor: "rgb(220, 53, 69)",
      backgroundColor: "rgba(220, 53, 69, 0.3)",
      tension: 0.3,
    },
    {
      label: "Diastólica (mmHg)",
      data: historial.map((h) => h.diastolica),
      borderColor: "rgb(255, 193, 7)",
      backgroundColor: "rgba(255, 193, 7, 0.3)",
      tension: 0.3,
    },
    {
      label: "Frecuencia Cardíaca (lpm)",
      data: historial.map((h) => h.fc),
      borderColor: "rgb(25, 135, 84)",
      backgroundColor: "rgba(25, 135, 84, 0.3)",
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Evolución de registros",
    },
  },
};

const Historial = () => {
  return (
    <Card className="h-100">
      <Card.Header>
        Historial de registros
        <span className="float-end text-danger" style={{ cursor: "pointer" }}>
          Exportar datos
        </span>
      </Card.Header>
      <Card.Body>
        {/* Gráfico */}
        <div className="mb-3">
          <Line data={data} options={options} />
        </div>

        {/* Tabla */}
        <Table hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Sistólica</th>
              <th>Diastólica</th>
              <th>FC</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((h, index) => (
              <tr key={index}>
                <td>{h.fecha}</td>
                <td>{h.sistolica}</td>
                <td>{h.diastolica}</td>
                <td>{h.fc}</td>
                <td>
                  <Badge
                    bg={h.estado === "Alta" ? "danger" : "warning"}
                  >
                    {h.estado}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Historial;
