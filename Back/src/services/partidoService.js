const { Partido } = require("../models");

class PartidoService {
  async createPartido(data) {
    return await Partido.create(data);
  }

  async getAllPartidos() {
    return await Partido.findAll();
  }

  async getPartidoById(id) {
    return await Partido.findByPk(id);
  }

  async updatePartido(id, data) {
    const partido = await Partido.findByPk(id);
    if (partido) {
      return await partido.update(data);
    }
    throw new Error("Partido no encontrado");
  }

  async deletePartido(id) {
    const partido = await Partido.findByPk(id);
    if (partido) {
      return await partido.destroy();
    }
    throw new Error("Partido no encontrado");
  }
  async getPartidosByUsuarioId(usuarioId) {
    try {
      const partidos = await Partido.findAll({
        where: {
          usuarioId,
        },
      });
      return partidos;
    } catch (error) {
      throw new Error("Error al obtener los partidos: " + error.message);
    }
  }
}

module.exports = new PartidoService();
