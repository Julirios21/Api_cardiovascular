const pool = require('../config/db');

// Obtener todos los usuarios externos con sus datos asociados
exports.getUsuariosExternos = async (req, res) => {
  try {
    // Consultas a cada tabla relacionada
    const pacientes = await pool.query('SELECT * FROM pacientes');
    const mujeres = await pool.query('SELECT * FROM mujeres');
    const antecedentes_personales = await pool.query('SELECT * FROM antecedentes_personales');
    const factores_riesgo = await pool.query('SELECT * FROM factores_riesgo');
    const antecedentes_familiares = await pool.query('SELECT * FROM antecedentes_familiares');

    res.json({
      pacientes: pacientes.rows,
      mujeres: mujeres.rows,
      antecedentes_personales: antecedentes_personales.rows,
      factores_riesgo: factores_riesgo.rows,
      antecedentes_familiares: antecedentes_familiares.rows
    });
  } catch (error) {
    console.error('Error al obtener usuarios externos:', error.message);
    res.status(500).json({ error: 'Error al obtener los datos de usuarios externos' });
  }
};
