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
    // Obtener las estadísticas de los cuartos asociados a un partido
    return await Cuarto.findAll({
      where: { partidoId }, // Filtrar por partidoId
      include: [
        {
          model: Estadistica, // Incluir las estadísticas
          as: "estadisticas",
        },
      ],
    });
  }
}

module.exports = EstadisticaService;
