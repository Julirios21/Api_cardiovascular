// backend/controllers/PatientController.js
const pool = require('../config/db');

exports.getAllPatients = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        u.id as user_id,
        u.email,
        u.cedula,
        u.tipo_usuario,
        p.nombre_completo,
        p.fecha_nacimiento,
        p.edad,
        p.genero,
        p.ocupacion,
        p.telefono,
        p.direccion,
        p.eps,
        p.fecha_valoracion
        -- Puedes añadir más campos de otras tablas si haces más JOINs
      FROM
        usuario u
      LEFT JOIN
        pacientes p ON u.id = p.usuario_id
      ORDER BY
        u.id ASC;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener todos los pacientes:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener pacientes.' });
  }
};