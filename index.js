// index.js
const express = require('express');
const cors = require('cors'); 
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

const importarCSV = require('./routes/importarCSV');

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
    const result = await pool.query('SELECT id, email, cedula FROM usuario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener un usuario por correo y cédula
app.get('/usuarios/:correo/:cedula', async (req, res) => {
  const { correo, cedula } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, email, cedula FROM usuario WHERE email = $1 AND cedula = $2',
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

// POST


app.use('/api', importarCSV);


app.post('/registro-completo', async (req, res) => {
  const {
    email,
    cedula,
    password,
    fecha_valoracion,
    nombre_completo,
    fecha_nacimiento,
    edad,
    genero,
    ocupacion,
    nivel_educativo,
    telefono,
    direccion,
    eps
  } = req.body;

  try {
    // Verificar duplicados en usuario
    const existingUser = await pool.query('SELECT id FROM usuario WHERE email = $1 OR cedula = $2', [email, cedula]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'El email o la cédula ya están registrados' });
    }

    // Insertar en usuario
    const userResult = await pool.query(
      'INSERT INTO usuario (email, cedula, password) VALUES ($1, $2, $3) RETURNING id',
      [email, cedula, password]
    );
    const usuario_id = userResult.rows[0].id;



    // Verificar que no exista ya un paciente para ese usuario_id (opcional)
    const pacienteResult = await pool.query('SELECT id FROM pacientes WHERE usuario_id = $1', [usuario_id]);
    if (pacienteResult.rows.length > 0) {
      return res.status(409).json({ error: 'Ya existe información de paciente para este usuario' });
    }

    //  Insertar en pacientes
    const insertResult = await pool.query(
      `INSERT INTO pacientes (
        usuario_id, fecha_valoracion, nombre_completo, fecha_nacimiento, edad, genero, ocupacion, nivel_educativo, telefono, direccion, eps
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [usuario_id, fecha_valoracion, nombre_completo, fecha_nacimiento, edad, genero, ocupacion, nivel_educativo, telefono, direccion, eps]
    );

    res.status(201).json({
      message: 'Usuario y paciente creados exitosamente',
      paciente: insertResult.rows[0]
    });

  } catch (err) {
    console.error('Error en el registro completo:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});


// DELETE
// Eliminar un usuario por id
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Elimina el usuario, y la BD eliminará en cascada los datos relacionados
    const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar el usuario:', err.message);
    res.status(500).json({ error: err.message });
  }
});