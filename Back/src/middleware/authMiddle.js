const authService = require("../services/authService");

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]; // Leer el token desde los headers
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const payload = authService.verifyToken(token.split(" ")[1]); // Verificar el token (sin el prefijo "Bearer")
    req.user = payload; // Agregar los datos del usuario al request
    next(); // Continuar con la ejecución de la siguiente función
  } catch (error) {
    return res.status(401).json({ error: "Token inválido." });
  }
}

module.exports = authMiddleware;
