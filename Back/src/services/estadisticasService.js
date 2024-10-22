const { Estadistica, Cuarto } = require("../models");

class EstadisticaService {
  // Crear una estadística
  static async createEstadistica(data) {
    return await Estadistica.create(data);
  }

  // Obtener todas las estadísticas
  static async getAllEstadisticas() {
    return await Estadistica.findAll();
  }

  // Obtener una estadística por ID
  static async getEstadisticaById(id) {
    return await Estadistica.findByPk(id);
  }

  // Actualizar una estadística
  static async updateEstadistica(id, data) {
    const estadistica = await Estadistica.findByPk(id);
    if (estadistica) {
      return await estadistica.update(data);
    }
    throw new Error("Estadística no encontrada");
  }

  // Eliminar una estadística
  static async deleteEstadistica(id) {
    const estadistica = await Estadistica.findByPk(id);
    if (estadistica) {
      return await estadistica.destroy();
    }
    throw new Error("Estadística no encontrada");
  }

  // Obtener todas las estadísticas de un partido
  static async getEstadisticasByPartidoId(partidoId) {
    if (!partidoId) {
      throw new Error("El ID del partido es requerido");
    }

    return await Estadistica.findAll({
      where: { partidoId }, // Asegúrate de que este campo esté definido en tu modelo
    });
  }
}

module.exports = EstadisticaService;
