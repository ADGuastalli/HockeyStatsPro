const express = require("express");
const TorneoController = require("../controllers/torneoController");

const router = express.Router();

router.get("/", TorneoController.getAllTorneos); // Ruta protegida
router.get("/:id", TorneoController.getTorneoById); // Ruta protegida
router.post("/", TorneoController.createTorneo); // Ruta protegida
router.put("/:id", TorneoController.updateTorneo); // Ruta protegida
router.delete("/:id", TorneoController.deleteTorneo); // Ruta protegida

module.exports = router;
