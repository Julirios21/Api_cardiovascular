const express = require('express');
const router = express.Router();
const externoController = require('../controllers/externoController');

// GET: listar usuarios externos con datos asociados
router.get('/', externoController.getUsuariosExternos);

module.exports = router;
