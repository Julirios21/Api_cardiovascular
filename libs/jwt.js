// backend/libs/jwt.js (VERSIÓN CORREGIDA PARA COMMONJS)
const jwt = require("jsonwebtoken"); // Corregido: CommonJS

exports.createAccessToken = (payload) => { // Corregido: CommonJS (exports.)
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      "xyz123", // Considera mover esto a una variable de entorno para mayor seguridad
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};