const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getUsuarios);
router.get('/:correo/:cedula', usuarioController.getUsuarioByCorreoCedula);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
