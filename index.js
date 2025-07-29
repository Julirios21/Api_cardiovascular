// backend/index.js 
const express = require('express');
const cors = require('cors');
const pool = require('./config/db.js'); 
const cookieParser = require('cookie-parser');

// Importa las rutas de usuario y autenticación
const userRoutes = require('./routes/UserRoutes.js'); 
const AuthRoutes = require('./routes/AuthRoutes.js'); 
const PatientRoutes = require('./routes/PatientRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL sea la del frontend
  credentials: true // Para enviar y recibir cookies!
}));
app.use(express.json()); // Para parsear cuerpos de solicitud JSON
app.use(cookieParser()); // Para manejar cookies

// Conexión a la base de datos
pool.connect()
  .then(() => {
    console.log('Conectado a la base de datos PostgreSQL');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err.message);
    console.error('Detalles del error:', err);
    process.exit(1);
  });

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API Cardiovascular funcionando correctamente',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Usar las rutas de usuario
app.use('/usuarios', userRoutes);

// RUTAS DE AUTENTICACIÓN
// Todas las rutas definidas en AuthRoutes.js se montarán bajo el prefijo '/api'
app.use('/api', AuthRoutes); 

// Usar las rutas de pacientes
// Todas las rutas definidas en PatientRoutes.js se montarán bajo el prefijo '/api
app.use('/api', PatientRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err.message);
  console.error('Detalles del error:', err);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: err.message
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});