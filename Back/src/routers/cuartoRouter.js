const express = require("express");
const CuartoController = require("../controllers/cuartoCotroller");

const router = express.Router();

router.get("/", CuartoController.getAllCuartos); // Ruta protegida
router.get("/:id", CuartoController.getCuartoById); // Ruta protegida
router.post("/", CuartoController.createCuarto); // Ruta protegida
router.put("/:id", CuartoController.updateCuarto); // Ruta protegida
router.delete("/:id", CuartoController.deleteCuarto); // Ruta protegida

module.exports = router;
