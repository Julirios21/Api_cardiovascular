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
    const result = await pool.query('SELECT id, email, cedula,tipo_usuario FROM usuario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener los usuarios externos 
app.get('/externo', async (req, res) => {
  try {
    // Consultas a cada tabla
    const pacientes = await pool.query('SELECT * FROM pacientes');
    const mujeres = await pool.query('SELECT * FROM mujeres');
    const antecedentes_personales = await pool.query('SELECT * FROM antecedentes_personales');
    const factores_riesgo = await pool.query('SELECT * FROM factores_riesgo');
    const antecedentes_familiares = await pool.query('SELECT * FROM antecedentes_familiares');

    // Aquí puedes agregar los datos que ya retornabas antes, si los hay
    // Ejemplo: const otrosDatos = await pool.query('SELECT ...');

    res.json({
      // ...otrosDatos.rows, // si tienes otros datos que ya retornabas
      pacientes: pacientes.rows,
      mujeres: mujeres.rows,
      antecedentes_personales: antecedentes_personales.rows,
      factores_riesgo: factores_riesgo.rows,
      antecedentes_familiares: antecedentes_familiares.rows
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  });

// Ruta para obtener los usuarios internos 
app.get('/interno', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, cedula FROM usuario WHERE tipo_usuario = \'interno\';');
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

// Nuevo endpoint para obtener todos los datos detallados de los usuarios
app.get('/usuarios/detallado', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.id as usuario_id, u.email, u.cedula, u.password, u.tipo_usuario,
        p.fecha_valoracion, p.nombre_completo, p.fecha_nacimiento, p.edad, p.genero, p.ocupacion, p.nivel_educativo, p.telefono, p.direccion, p.eps,
        m.ovario_poliquistico, m.primera_menstruacion, m.diabetes_gestacional, m.hijos_bajo_peso, m.parto_pretermino, m.menopausia,
        a.infarto, a.fecha_infarto, a.angina, a.fecha_angina, a.acv, a.fecha_acv, a.eap, a.fecha_eap, a.insuficiencia_cardiaca, a.fecha_ic, a.arritmias, a.fecha_arritmias, a.revascularizacion, a.fecha_revascularizacion, a.fecha_dispositivos_cardiacos,
        f.hta, f.hta_desde, f.hta_tratamiento, f.diabetes as diabetes_riesgo, f.dm_desde, f.dm_tratamiento, f.dislipidemia, f.dislipidemia_desde, f.dislipidemia_tratamiento, f.enfermedad_renal, f.erc_estadio, f.erc_tratamiento, f.tabaquismo, f.anos_tabaquismo, f.alcoholismo, f.cantidad_frecuencia, f.sedentarismo, f.tipo_actividad, f.apnea_sueno, f.frecuencia_fuma, f.vapeo, f.anos_vapeo, f.frecuencia_vapeo, f.dias_ejercicio, f.minuto_ejercicio, f.patologias, f.programas_paxientes, f.medicamentos,
        af.historial_familiar, af.integrante_familia
      FROM usuario u
      LEFT JOIN pacientes p ON u.id = p.usuario_id
      LEFT JOIN mujeres m ON u.id = m.usuario_id
      LEFT JOIN antecedentes_personales a ON u.id = a.usuario_id
      LEFT JOIN factores_riesgo f ON u.id = f.usuario_id
      LEFT JOIN antecedentes_familiares af ON u.id = af.usuario_id
      ORDER BY u.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los datos detallados:', err.message);
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