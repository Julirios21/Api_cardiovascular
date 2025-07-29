// backend/middlewares/auth.middleware.js (VERSIÓN CORREGIDA PARA COMMONJS)
const jwt = require("jsonwebtoken"); // Corregido: CommonJS

exports.isAuth = (req, res, next) => { // Corregido: CommonJS (exports.)
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No estas autorizado",
    });
  }

  jwt.verify(token, "xyz123", (err, decoded) => { // Usa la misma clave secreta que en jwt.js
    if (err)
      return res.status(401).json({
        message: "No estas autorizado",
      });

    req.userId = decoded.id;

    next();
  });
};