const express = require("express");
const CuartoController = require("../controllers/estadisticasController");

const router = express.Router();

router.get("/", CuartoController.getAllEstadisticas); // Ruta protegida
router.get("/:id", CuartoController.getEstadisticaById); // Ruta protegida
router.post("/", CuartoController.createEstadistica); // Ruta protegida
router.put("/:id", CuartoController.updateEstadistica); // Ruta protegida
router.delete("/:id", CuartoController.deleteEstadistica); // Ruta protegida

// Obtener estadísticas por partido
router.get("/cuartos/:partidoId", CuartoController.getEstadisticasByPartidoId);

module.exports = router;
