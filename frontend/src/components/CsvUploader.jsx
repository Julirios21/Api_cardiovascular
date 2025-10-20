import React, { useState } from 'react';
import axios from '../api/axios'; // Asegúrate de que esta ruta a tu instancia de axios sea correcta
import { useAuth } from '../context/AuthContext';

function CsvUploader() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Por favor, selecciona un archivo CSV.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    // 'csvFile' debe coincidir con el nombre de campo en multer (upload.single('csvFile'))
    formData.append('csvFile', selectedFile); 

    try {
      const response = await axios.post('/importar-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // Enviar el token de autenticación en las cookies es manejado por Axios si le pasas withCredentials
        withCredentials: true,
      });
      
      setLoading(false);
      setMessage(response.data.message);
      setError('');
      setSelectedFile(null); // Limpiar el input después de la subida
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Error al importar el CSV. Revise la consola para más detalles.';
      setError(errorMessage);
      setMessage('');
      console.error('Error de subida:', err.response?.data?.errors || err);
    }
  };

  return (
    <div className="card-body">
      <div className="mb-3">
        <input 
          type="file" 
          className="form-control"
          accept=".csv" 
          onChange={handleFileChange} 
          disabled={loading}
        />
      </div>

      <div className="d-grid gap-2">
        <button 
          onClick={handleUpload} 
          className="btn btn-primary btn-lg" 
          disabled={!selectedFile || loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="ms-2">Importando...</span>
            </>
          ) : (
            'Subir CSV'
          )}
        </button>
      </div>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
          {/* Si tienes un array de errores por fila, podrías listarlos */}
          {error.includes('Revise la consola') && <p className="mb-0">Consulta la consola del navegador para ver detalles de errores específicos por fila.</p>}
        </div>
      )}
    </div>
  );
}

export default CsvUploader;