const express = require('express');
const router = express.Router();
const internoController = require('../controllers/internoController');

// GET: listar usuarios internos
router.get('/', internoController.getUsuariosInternos);

module.exports = router;
