// config/db.js
const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });

console.log("Conectando a la base de datos...");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // <-- tu URL completa de conexión

});

// Agregar manejo de errores más detallado
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de conexiones:', err);
});

pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    console.error('Detalles del error:', err);
  } else {
    console.log('Conectado a la base de datos PostgreSQL');
  }
});

module.exports = pool;
