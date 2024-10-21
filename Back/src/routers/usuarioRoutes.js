// src/routes/userRoutes.js
const express = require("express");
const UserController = require("../controllers/usuarioController");

const router = express.Router();

router.get("/", UserController.getUsuarios); // Ruta pública
router.get("/:id", UserController.getUsuario); // Ruta pública
router.post("/", UserController.createUsuario); // Ruta pública (crear usuario)
router.put("/:id", UserController.updateUsuario); // Ruta protegida (mantén autenticación si es necesario)
router.delete("/:id", UserController.deleteUsuario); // Ruta protegida (mantén autenticación si es necesario)
router.post("/login", UserController.login); // Ruta pública para login

module.exports = router;
