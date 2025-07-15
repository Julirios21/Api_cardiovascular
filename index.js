// index.js
const express = require('express');
const cors = require('cors'); 
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS
app.use(cors());
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener un usuario por correo electrónico
app.get('/usuarios/:correo', async (req, res) => {
  const { correo } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE correo = $1', [correo]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener un usuario por correo y cédula
app.get('/usuarios/:correo/:cedula', async (req, res) => {
  const { correo, cedula } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM task WHERE correo = $1 AND documento_identidad = $2',
      [correo, cedula]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el usuario:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
