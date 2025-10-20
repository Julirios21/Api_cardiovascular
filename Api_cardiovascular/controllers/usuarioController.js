const pool = require('../config/db');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, cedula, tipo_usuario FROM usuario'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener usuario por correo y cédula
exports.getUsuarioByCorreoCedula = async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
};

// Crear usuario
exports.createUsuario = async (req, res) => {
  const { email, cedula, password, tipo_usuario } = req.body;

  try {
    // Verificar si ya existe un usuario con ese correo o cédula
    const existing = await pool.query(
      'SELECT * FROM usuario WHERE email = $1 OR cedula = $2',
      [email, cedula]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe con ese correo o cédula' });
    }

    // Insertar nuevo usuario
    const result = await pool.query(
      'INSERT INTO usuario (email, cedula, password, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING id, email, cedula, tipo_usuario',
      [email, cedula, password, tipo_usuario]
    );

    res.status(201).json({
      message: 'Usuario creado correctamente',
      usuario: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

