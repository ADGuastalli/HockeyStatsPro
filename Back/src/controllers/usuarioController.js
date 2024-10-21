// src/controllers/usuarioController.js
const usuarioService = require("../services/usuarioService");
const bcrypt = require("bcrypt"); // Asegúrate de importar bcrypt

class UserController {
  static async getUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.getAllUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async getUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.getUsuarioById(id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error(`Error obteniendo usuario con ID ${id}:`, error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async createUsuario(req, res) {
    try {
      const usuario = await usuarioService.createUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      console.error("Error creando usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async updateUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.updateUsuario(id, req.body);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error(`Error actualizando usuario con ID ${id}:`, error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async deleteUsuario(req, res) {
    const { id } = req.params;
    try {
      await usuarioService.deleteUsuario(id);
      res.status(204).send(); // No content, successful deletion
    } catch (error) {
      console.error(`Error eliminando usuario con ID ${id}:`, error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    console.log("lo que llega al back", email, password);

    try {
      // Obtener el usuario de la base de datos por correo electrónico
      const usuario = await usuarioService.getUsuarioByEmail(email);
      console.log("usuario encontrado", usuario);

      // Aquí no se usa bcrypt, ya que estamos comparando texto plano
      const passwordMatch = usuario && password === usuario.password;

      console.log("¿Contraseña coincide?", passwordMatch);

      if (passwordMatch) {
        // Login exitoso sin token
        res.status(200).json({ usuario }); // Devuelve el usuario sin token
      } else {
        res.status(401).json({ error: "Credenciales incorrectas" });
      }
    } catch (error) {
      console.error("Error en el proceso de login:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = UserController;
