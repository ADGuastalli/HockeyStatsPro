const { Cuarto } = require("../models");

class CuartoService {
  // Crear un cuarto
  static async createCuarto(data) {
    return await Cuarto.create(data);
  }

  // Obtener todos los cuartos
  static async getAllCuartos() {
    return await Cuarto.findAll();
  }

  // Obtener un cuarto por ID
  static async getCuartoById(id) {
    return await Cuarto.findByPk(id);
  }

  // Actualizar un cuarto
  static async updateCuarto(id, data) {
    const cuarto = await Cuarto.findByPk(id);
    if (cuarto) {
      return await cuarto.update(data);
    }
    throw new Error("Cuarto no encontrado");
  }

  // Eliminar un cuarto
  static async deleteCuarto(id) {
    const cuarto = await Cuarto.findByPk(id);
    if (cuarto) {
      return await cuarto.destroy();
    }
    throw new Error("Cuarto no encontrado");
  }
}

module.exports = CuartoService;
