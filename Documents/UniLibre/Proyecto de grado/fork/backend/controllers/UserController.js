// controllers/UserController.js
const userModel = require('../models/UserModel'); // Asegúrate de que la ruta sea correcta

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error al obtener usuarios:', err.message);
    res.status(500).json({ error: 'Error interno del servidor al obtener usuarios.' });
  }
};

// Crear un nuevo usuario
const postUser = async (req, res) => {
  const { email, cedula, hashed_password } = req.body;

  try {
    // 1. Validar campos requeridos
    if (!email || !cedula || !hashed_password) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos: email, cedula, hashed_password' 
      });
    }

    // 2. Verificar duplicidad de email
    const existingUserByEmail = await userModel.getUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    // 3. Verificar duplicidad de cédula
    const existingUserByCedula = await userModel.getUserByCedula(cedula);
    if (existingUserByCedula) {
      return res.status(409).json({ error: 'La cédula ya está registrada' });
    }

    // 4. Crear el usuario
    const newUser = await userModel.createUser(email, cedula, hashed_password);

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: newUser
    });
  } catch (err) {
    console.error('Error al crear usuario:', err.message);
    res.status(500).json({ error: 'Error interno del servidor al crear usuario.' });
  }
};

// Obtener usuario por correo y cédula
const getUserByCorreoAndCedula = async (req, res) => {
  const { correo, cedula } = req.params; // 'correo' en la URL, 'email' en la DB

  try {
    const user = await userModel.getUserByEmailAndCedula(correo, cedula);
    if (!user) { // user será undefined si no se encuentra
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error al obtener el usuario:', err.message);
    res.status(500).json({ error: 'Error interno del servidor al obtener el usuario.' });
  }
};

module.exports = {
  getUsers,
  postUser,
  getUserByCorreoAndCedula,
};