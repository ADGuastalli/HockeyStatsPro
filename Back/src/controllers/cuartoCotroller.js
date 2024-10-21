const CuartoService = require("../services/cuartoService");

class CuartoController {
  // Crear un cuarto
  static async createCuarto(req, res) {
    try {
      const data = req.body;
      const nuevoCuarto = await CuartoService.createCuarto(data);
      res.status(201).json(nuevoCuarto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener todos los cuartos
  static async getAllCuartos(req, res) {
    try {
      const cuartos = await CuartoService.getAllCuartos();
      res.status(200).json(cuartos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un cuarto por ID
  static async getCuartoById(req, res) {
    try {
      const { id } = req.params;
      const cuarto = await CuartoService.getCuartoById(id);
      if (cuarto) {
        res.status(200).json(cuarto);
      } else {
        res.status(404).json({ error: "Cuarto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Actualizar un cuarto
  static async updateCuarto(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedCuarto = await CuartoService.updateCuarto(id, data);
      res.status(200).json(updatedCuarto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar un cuarto
  static async deleteCuarto(req, res) {
    try {
      const { id } = req.params;
      await CuartoService.deleteCuarto(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CuartoController;
