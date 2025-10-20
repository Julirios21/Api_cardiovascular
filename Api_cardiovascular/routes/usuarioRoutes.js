const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verifyToken, authorize } = require('../middleware/authMiddleware');

// Solo admin e interno pueden ver usuarios
router.get('/', verifyToken, authorize(['admin', 'interno']), usuarioController.getUsuarios);

// Solo admin puede eliminar usuarios
router.delete('/:id', verifyToken, authorize('admin'), usuarioController.deleteUsuario);

module.exports = router;
