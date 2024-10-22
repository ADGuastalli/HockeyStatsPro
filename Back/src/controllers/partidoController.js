const partidoService = require("../services/partidoService");
const { Partido } = require("../models/index");

class PartidoController {
  // Controlador de partido
  async createPartido(req, res) {
    try {
      const { fecha, fechaTorneo, clubId, torneoId, usuarioId } = req.body; // Ahora recibes usuarioId del frontend

      const partido = await Partido.create({
        fecha,
        fechaTorneo,
        clubId,
        torneoId,
        usuarioId, // Usar el usuarioId enviado desde el frontend
      });

      res.status(201).json(partido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating partido", error });
    }
  }

  async getAllPartidos(req, res) {
    try {
      const partidos = await partidoService.getAllPartidos();
      res.status(200).json(partidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPartidoById(req, res) {
    try {
      const partido = await partidoService.getPartidoById(req.params.id);
      if (partido) {
        res.status(200).json(partido);
      } else {
        res.status(404).json({ error: "Partido no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePartido(req, res) {
    try {
      const partido = await partidoService.updatePartido(
        req.params.id,
        req.body
      );
      res.status(200).json(partido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletePartido(req, res) {
    try {
      await partidoService.deletePartido(req.params.id);
      res.status(204).json({ message: "Partido eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPartidosByUsuarioId(req, res) {
    try {
      const { usuarioId } = req.params; // Obtener el usuarioId de los parámetros de la solicitud
      const partidos = await partidoService.getPartidosByUsuarioId(usuarioId);
      res.status(200).json(partidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PartidoController();
