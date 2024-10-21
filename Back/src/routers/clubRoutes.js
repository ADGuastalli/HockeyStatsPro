const express = require("express");
const ClubController = require("../controllers/clubController");

const router = express.Router();

router.get("/", ClubController.getAllClubs); // Ruta protegida
router.get("/:id", ClubController.getClubById); // Ruta protegida
router.post("/", ClubController.createClub); // Ruta protegida
router.delete("/:id", ClubController.deleteClub); // Ruta protegida

module.exports = router;
