// src/controllers/torneoController.js
const torneoService = require("../services/torneoService");

const torneoController = {
  getAllTorneos: async (req, res) => {
    try {
      const torneos = await torneoService.getAllTorneos();
      res.status(200).json(torneos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTorneoById: async (req, res) => {
    const { id } = req.params;
    try {
      const torneo = await torneoService.getTorneoById(id);
      if (!torneo) {
        return res.status(404).json({ message: "Torneo no encontrado" });
      }
      res.status(200).json(torneo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createTorneo: async (req, res) => {
    const torneoData = req.body;
    try {
      const nuevoTorneo = await torneoService.createTorneo(torneoData);
      res.status(201).json(nuevoTorneo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTorneo: async (req, res) => {
    const { id } = req.params;
    const torneoData = req.body;
    try {
      const torneoActualizado = await torneoService.updateTorneo(
        id,
        torneoData
      );
      res.status(200).json(torneoActualizado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTorneo: async (req, res) => {
    const { id } = req.params;
    try {
      await torneoService.deleteTorneo(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = torneoController;
