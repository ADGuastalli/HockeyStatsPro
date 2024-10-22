const express = require("express");
const PartidoController = require("../controllers/partidoController");

const router = express.Router();

router.get("/", PartidoController.getAllPartidos); // Ruta protegida
router.get("/:id", PartidoController.getPartidoById); // Ruta protegida
router.post("/", PartidoController.createPartido); // Ruta protegida
router.put("/:id", PartidoController.updatePartido); // Ruta protegida
router.delete("/:id", PartidoController.deletePartido); // Ruta protegida

// Obtener partidos por usuario
router.get("/usuario/:usuarioId", PartidoController.getPartidosByUsuarioId);

module.exports = router;
