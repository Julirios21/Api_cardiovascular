// config/db.js
const { Pool } = require('pg');
const path = require('path');

// Carga .env desde la raíz del proyecto
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('Conectando a la base de datos con:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  name: process.env.DB_NAME,
  passwordType: typeof process.env.DB_PASSWORD
});

const pool = new Pool({
  host: process.env.DB_HOST,                       // 127.0.0.1
  port: Number(process.env.DB_PORT || 5432),       // 5432
  user: process.env.DB_USER,                       // support
  password: process.env.DB_PASSWORD,               // support (string)
  database: process.env.DB_NAME,                   // cardio_db
  // ssl: { rejectUnauthorized: false } // descomenta si tu servidor exige SSL
});

pool.on('error', (err) => {
  console.error('Error inesperado en el pool:', err);
});

pool.connect()
  .then(() => console.log('Conectado a PostgreSQL exitosamente'))
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err.message);
    console.error('Detalles del error:', err);
    process.exit(1);
  });

module.exports = pool;
