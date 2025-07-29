// config/db.js
const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });

console.log("Conectando a la base de datos...");

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
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
    console.log('Conectado a la base de datos PostgreSQL en Render');
  }
});

module.exports = pool;
