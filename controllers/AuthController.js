// backend/controllers/AuthController.js 
const bcrypt = require("bcrypt"); 
const pool = require("../config/db.js"); 
const { createAccessToken } = require("../libs/jwt.js");
const md5 = require('md5');

// ingresa a un usuario existente usando email y cedula
exports.signin = async (req, res) => {
  const { email, cedula } = req.body; 

  try {
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [
      email,
    ]);

    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "El correo no está registrado",
      });
    }

    const user = result.rows[0];

    if (user.cedula !== cedula) {
      return res.status(400).json({
        message: "La cédula es incorrecta", // Mensaje de error ajustado
      });
    }

    const token = await createAccessToken({ id: user.id });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json(user); // Retorna los datos del usuario
  } catch (error) {
    console.error("Error en signin:", error);
    return res.status(500).json({
      message: "Error interno del servidor al iniciar sesión",
      error: error.message
    });
  }
};


// registra un nuevo usuario 
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body; // Sigue esperando password para signup
  try {
    const hashed_Password = await bcrypt.hash(password, 10);
    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;


    const result = await pool.query(
      "INSERT INTO usuario(name, email, password, gravatar) VALUES($1, $2, $3, $4) Returning *",
      [name, email, hashed_Password, gravatar]
    );

    const token = await createAccessToken({ id: result.rows[0].id });
 
    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json(result.rows[0]);
  } catch (error) {
    console.log("error", error)
    if (error.code === "23505") {
      return res.status(400).json({
        message: "El correo ya esta registrado",
      });
    }
    next(error);
  }
};

// cierra la sesión del usuario
exports.signout = (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
}

// obtiene el perfil del usuario
exports.profile = async (req, res) => {
  const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [req.userId]);
  return res.json(result.rows[0]);
}