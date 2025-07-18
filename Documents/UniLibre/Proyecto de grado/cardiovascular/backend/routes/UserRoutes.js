// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController'); 

// Ruta para obtener todos los usuarios
router.get('/', userController.getUsers);
router.post('/', userController.postUser);
router.get('/:correo/:cedula', userController.getUserByCorreoAndCedula);

// Exportar las rutas
module.exports = router;

