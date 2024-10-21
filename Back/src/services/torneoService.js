// src/services/torneoService.js
const { Torneo } = require("../models"); // Asegúrate de ajustar la ruta según tu estructura de carpetas

const torneoService = {
  getAllTorneos: async () => {
    return await Torneo.findAll();
  },

  getTorneoById: async (id) => {
    return await Torneo.findByPk(id);
  },

  createTorneo: async (torneoData) => {
    return await Torneo.create(torneoData);
  },

  updateTorneo: async (id, torneoData) => {
    const torneo = await Torneo.findByPk(id);
    if (torneo) {
      return await torneo.update(torneoData);
    }
    throw new Error("Torneo no encontrado");
  },

  deleteTorneo: async (id) => {
    const torneo = await Torneo.findByPk(id);
    if (torneo) {
      await torneo.destroy();
      return true;
    }
    throw new Error("Torneo no encontrado");
  },
};

module.exports = torneoService;
