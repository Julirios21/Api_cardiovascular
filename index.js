// index.js
const express = require('express');
const cors = require('cors'); 
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API Cardiovascular funcionando correctamente',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, cedula FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  const { email, cedula, hashed_password } = req.body;
  
  try {
    // Verificar que todos los campos requeridos estén presentes
    if (!email || !cedula || !hashed_password) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos: email, cedula, hashed_password' 
      });
    }

    // Verificar que el email no esté duplicado
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    // Verificar que la cédula no esté duplicada
    const existingCedula = await pool.query('SELECT * FROM users WHERE cedula = $1', [cedula]);
    if (existingCedula.rows.length > 0) {
      return res.status(409).json({ error: 'La cédula ya está registrada' });
    }

    // Insertar el nuevo usuario
    const result = await pool.query(
      'INSERT INTO users (email, cedula, hashed_password) VALUES ($1, $2, $3) RETURNING *',
      [email, cedula, hashed_password]
    );

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: result.rows[0]
    });
  } catch (err) {
    console.error('Error al crear usuario:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener un usuario por correo y cédula
app.get('/usuarios/:correo/:cedula', async (req, res) => {
  const { correo, cedula } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, email, cedula FROM users WHERE email = $1 AND cedula = $2',
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
