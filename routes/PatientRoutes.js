// backend/routes/PatientRoutes.js
const express = require('express');
const { getAllPatients } = require('../controllers/PatientController');
const { isAuth } = require('../middlewares/auth.middleware'); // Si quieres proteger esta ruta

const router = express.Router();

// Ruta para obtener todos los pacientes (protegida por autenticación si es necesario)
router.get('/patients', isAuth, getAllPatients);

module.exports = router;