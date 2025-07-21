const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const pool = require('../config/db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal

// Ruta POST para importar CSV
router.post('/importar-csv', upload.single('archivo'), (req, res) => {
  const resultados = [];

  fs.createReadStream(req.file.path)
    .pipe(csv({ trim: true, skipEmptyLines: true }))
    .on('data', (data) => resultados.push(data))
    .on('end', async () => {
      try {
        for (const fila of resultados) {
          // Función para limpiar campos vacíos
          const limpiarCampo = (valor) => (valor === '' ? null : valor);

          // Asegúrate de que las columnas del CSV coincidan con las siguientes:
          const { email, cedula, password, fecha_valoracion, nombre_completo, fecha_nacimiento, edad, genero, ocupacion, nivel_educativo, telefono, direccion, eps } = fila;

          // Verificar duplicado
          const existente = await pool.query('SELECT id FROM usuario WHERE email = $1 OR cedula = $2', [email, cedula]);
          if (existente.rows.length > 0) continue; // saltar si ya existe

          // Insertar en usuario
          const userResult = await pool.query(
            'INSERT INTO usuario (email, cedula, password) VALUES ($1, $2, $3) RETURNING id',
            [email, cedula, password]
          );
          const usuario_id = userResult.rows[0].id;

          // Preparar datos de paciente, limpiando campos vacíos
          const datosPaciente = [
            usuario_id,
            limpiarCampo(fecha_valoracion),
            limpiarCampo(nombre_completo),
            limpiarCampo(fecha_nacimiento),
            limpiarCampo(edad),
            limpiarCampo(genero),
            limpiarCampo(ocupacion),
            limpiarCampo(nivel_educativo),
            limpiarCampo(telefono),
            limpiarCampo(direccion),
            limpiarCampo(eps)
          ];

          // Insertar en pacientes
          await pool.query(
            `INSERT INTO pacientes (
              usuario_id, fecha_valoracion, nombre_completo, fecha_nacimiento, edad, genero, ocupacion, nivel_educativo, telefono, direccion, eps
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
            datosPaciente
          );
        }

        res.json({ mensaje: 'Importación finalizada con éxito' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al importar el CSV' });
      }
    });
});

module.exports = router;
