import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Asegúrate de que esta ruta a tu instancia de axios sea correcta

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/api/patients', {
          withCredentials: true, // Para enviar las cookies de sesión
        }); 
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Error al cargar la lista de pacientes.');
        setLoading(false);
      }
    };

    fetchPatients();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  if (loading) {
    return <p>Cargando pacientes...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (patients.length === 0) {
    return <p>No hay pacientes registrados todavía.</p>;
  }

  return (
    <div>
      <h5 className="card-title text-center mb-4">📋 Lista de Pacientes Registrados</h5>
      <div style={{ overflowX: 'auto' }}> {/* Añadido para hacer la tabla responsive */}
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Email</th>
              <th scope="col">Cédula</th>
              <th scope="col">Nombre Completo</th>
              <th scope="col">Fecha Nac.</th>
              <th scope="col">Edad</th>
              <th scope="col">Género</th>
              <th scope="col">Tipo Usuario</th>
              {/* Agrega más encabezados si necesitas mostrar más información */}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.user_id}>
                <td>{patient.user_id}</td>
                <td>{patient.email}</td>
                <td>{patient.cedula}</td>
                <td>{patient.nombre_completo || 'N/A'}</td>
                <td>{patient.fecha_nacimiento ? new Date(patient.fecha_nacimiento).toLocaleDateString() : 'N/A'}</td>
                <td>{patient.edad || 'N/A'}</td>
                <td>{patient.genero || 'N/A'}</td>
                <td>{patient.tipo_usuario || 'N/A'}</td>
                {/* Agrega más celdas aquí */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientsList;