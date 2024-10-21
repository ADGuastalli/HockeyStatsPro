const EstadisticaService = require("../services/estadisticasService");

class EstadisticaController {
  // Crear una estadística
  static async createEstadistica(req, res) {
    try {
      const data = req.body;
      const nuevaEstadistica = await EstadisticaService.createEstadistica(data);
      res.status(201).json(nuevaEstadistica);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener todas las estadísticas
  static async getAllEstadisticas(req, res) {
    try {
      const estadisticas = await EstadisticaService.getAllEstadisticas();
      res.status(200).json(estadisticas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una estadística por ID
  static async getEstadisticaById(req, res) {
    try {
      const { id } = req.params;
      const estadistica = await EstadisticaService.getEstadisticaById(id);
      if (estadistica) {
        res.status(200).json(estadistica);
      } else {
        res.status(404).json({ error: "Estadística no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Actualizar una estadística
  static async updateEstadistica(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedEstadistica = await EstadisticaService.updateEstadistica(
        id,
        data
      );
      res.status(200).json(updatedEstadistica);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar una estadística
  static async deleteEstadistica(req, res) {
    try {
      const { id } = req.params;
      await EstadisticaService.deleteEstadistica(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener todas las estadísticas de un partido
  static async getEstadisticasByPartidoId(req, res) {
    try {
      const { partidoId } = req.params;
      const estadisticas = await EstadisticaService.getEstadisticasByPartidoId(
        partidoId
      );
      if (estadisticas) {
        res.status(200).json(estadisticas);
      } else {
        res
          .status(404)
          .json({ error: "No se encontraron estadísticas para este partido" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EstadisticaController;
