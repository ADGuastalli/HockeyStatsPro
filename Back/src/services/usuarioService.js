// src/services/userService.js
const { Usuario } = require("../models/index");

class UserService {
  static async getAllUsuarios() {
    return await Usuario.findAll();
  }

  static async getUsuarioById(id) {
    return await Usuario.findByPk(id);
  }

  static async getUsuarioByEmail(email) {
    return await Usuario.findOne({ where: { email } });
  }

  static async createUsuario(usuarioData) {
    const { club, password, ...restData } = usuarioData; // Asegúrate de incluir password
    const usuario = await Usuario.create({
      ...restData,
      password: password, // Guarda la contraseña tal como se recibe
      clubId: club,
    });
    return usuario;
  }

  static async updateUsuario(id, usuarioData) {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      return await usuario.update(usuarioData);
    }
    throw new Error("Usuario no encontrado");
  }

  static async deleteUsuario(id) {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      await usuario.destroy();
      return true;
    }
    throw new Error("Usuario no encontrado");
  }
}

module.exports = UserService;
