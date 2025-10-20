const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');



router.post('/signin', async (req, res) => {
  let { email, cedula } = req.body || {};
  // Normalización defensiva
  email  = (email  ?? '').toString().trim().toLowerCase();
  cedula = (cedula ?? '').toString().trim().replace(/\D+/g, ''); // deja solo dígitos

  if (!email || !cedula) {
    return res.status(400).json({ message: 'email y cedula son requeridos' });
  }

  try {
    // Búsqueda laxa en email (ILIKE) y exacta en cédula normalizada
    const { rows } = await pool.query(
      `SELECT id, email, cedula, tipo_usuario
         FROM usuario
        WHERE lower(email) = $1
          AND regexp_replace(cedula, '\\D+', '', 'g') = $2
        LIMIT 1`,
      [email, cedula]
    );

    if (!rows.length) return res.status(401).json({ message: 'Credenciales inválidas' });

    const user = rows[0];
    const token = jwt.sign(
      { sub: user.id, email: user.email, tipo_usuario: user.tipo_usuario },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.json({ access_token: token, user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error de servidor' });
  }
});

module.exports = router;