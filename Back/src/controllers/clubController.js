const { Club } = require("../models");

// Controlador para clubes
const clubesController = {
  createClub: async (req, res) => {
    try {
      const newClub = await Club.create(req.body);
      res.status(201).json(newClub);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllClubs: async (req, res) => {
    try {
      const clubs = await Club.findAll();
      res.status(200).json(clubs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getClubById: async (req, res) => {
    try {
      const club = await Club.findByPk(req.params.id);
      if (!club) return res.status(404).json({ message: "Club no encontrado" });
      res.status(200).json(club);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteClub: async (req, res) => {
    try {
      const result = await Club.destroy({
        where: { id: req.params.id },
      });
      if (!result)
        return res.status(404).json({ message: "Club no encontrado" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = clubesController;
