// src/routes/index.js
const express = require("express");
const usuarioRouter = require("./usuarioRoutes");
const clubRouter = require("./clubRoutes");

const router = express.Router();

// Usar el router de usuarios
router.use("/usuarios", usuarioRouter);

// Usar el router de clubes
router.use("/clubes", clubRouter);

module.exports = router;
