// index.js
const express = require('express');
const cors = require('cors'); 
const pool = require('./config/db'); // Importa el pool de conexión para verificar la conexión al inicio

// Importa las rutas de usuario y autenticación
const userRoutes = require('./routes/UserRoutes'); // <-- Importa las rutas de usuario
// const AuthRoutes = require('./routes/AuthRoutes'); // <-- Importa las rutas de autenticación

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS
app.use(cors());
app.use(express.json()); // Para parsear cuerpos de solicitud JSON

// Conexión a la base de datos
pool.connect()
  .then(() => {
    console.log('Conectado a la base de datos PostgreSQL'); // Puedes ajustar el mensaje
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err.message);
    console.error('Detalles del error:', err);
    process.exit(1); // Opcional: salir del proceso si no se puede conectar a la DB
  });

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API Cardiovascular funcionando correctamente',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Usar las rutas de usuario (si aún las necesitas para CRUD básico sin autenticación)
app.use('/usuarios', userRoutes); // Descomentar si se sigue usando estas rutas separadas

// NUEVAS RUTAS DE AUTENTICACIÓN
// Todas las rutas definidas en AuthRoutes.js se montarán bajo el prefijo '/'
// app.use(AuthRoutes);

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