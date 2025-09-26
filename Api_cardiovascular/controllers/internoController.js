const pool = require('../config/db');

// Obtener todos los usuarios internos
exports.getUsuariosInternos = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, cedula FROM usuario WHERE tipo_usuario = 'interno';"
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los usuarios internos:', err.message);
    res.status(500).json({ error: err.message });
  }
};
