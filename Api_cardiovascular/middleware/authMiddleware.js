const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// ✅ Verificar que el token sea válido
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario en la request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

// ✅ Autorizar por tipo de usuario
exports.authorize = (roles = []) => {
  if (typeof roles === 'string') roles = [roles]; // Si se pasa un rol único

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    if (!roles.includes(req.user.tipo_usuario)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    next();
  };
};
