const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usuarioService = require("./usuarioService");

class AuthService {
  // Autenticación de usuario por email y password
  static async authenticate(email, password) {
    console.log("en autenticacion", email, password);

    const usuario = await usuarioService.getUsuarioByEmail(email); // Asegúrate de esperar el resultado
    console.log("Usuario recuperado:", usuario); // Log del usuario recuperado

    if (usuario && bcrypt.compareSync(password, usuario.password)) {
      console.log("Usuario después del if:", usuario);
      return usuario;
    }
    return null;
  }

  // Generar un token JWT
  static generateToken(usuario) {
    const payload = { id: usuario.id, email: usuario.email };
    const secret = process.env.JWT_SECRET; // Tomar la clave secreta del .env
    const expiresIn = process.env.JWT_EXPIRES_IN; // Definir el tiempo de expiración desde el .env
    return jwt.sign(payload, secret, { expiresIn });
  }

  // Verificar token JWT
  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = AuthService;
