// config/db.js
const { Pool } = require('pg');

let connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // fallback si no está definida
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || 5432;
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || 'CardidbAdmin004';
  const db = process.env.DB_NAME || 'cardio';
  connectionString = `postgres://${user}:${password}@${host}:${port}/${db}`;
}

console.log('Conectando a la base de datos con:', connectionString);

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log('✅ Conectado a la base de datos'))
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    console.error('Detalles del error:', err);
  });

module.exports = pool;
