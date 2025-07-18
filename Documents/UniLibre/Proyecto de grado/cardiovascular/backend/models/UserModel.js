// models/UserModel.js
const pool = require('../config/db'); // Asegúrate de que la ruta sea correcta

const getAllUsers = async () => {
  const result = await pool.query('SELECT id, email, cedula FROM users');
  return result.rows;
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0]; // Retorna el primer usuario encontrado o undefined
};

const getUserByCedula = async (cedula) => {
  const result = await pool.query('SELECT * FROM users WHERE cedula = $1', [cedula]);
  return result.rows[0]; // Retorna el primer usuario encontrado o undefined
};

const getUserByEmailAndCedula = async (email, cedula) => {
  const result = await pool.query(
    'SELECT id, email, cedula FROM users WHERE email = $1 AND cedula = $2',
    [email, cedula]
  );
  return result.rows[0]; // Retorna el primer usuario encontrado o undefined
};

const createUser = async (email, cedula, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (email, cedula, hashed_password) VALUES ($1, $2, $3) RETURNING id, email, cedula',
    [email, cedula, hashedPassword]
  );
  return result.rows[0]; // Retorna el usuario recién creado
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserByCedula,
  getUserByEmailAndCedula,
  createUser,
};