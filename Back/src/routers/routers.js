// src/routes/index.js
const express = require("express");
const usuarioRouter = require("./usuarioRoutes");
const clubRouter = require("./clubRoutes");
const PartidoRouter = require("./partidoRouter");
const CuartoRouter = require("./cuartoRouter");
const EstadisticaRouter = require("./estadisticaRouter");

const router = express.Router();

// Usar el router de usuarios
router.use("/usuarios", usuarioRouter);

// Usar el router de clubes
router.use("/clubes", clubRouter);

// Ruta de partidos
router.use("/partidos", PartidoRouter);

// Ruta de cuartos
router.use("/cuartos", CuartoRouter);

// Ruta de estadisticas
router.use("/estadisticas", EstadisticaRouter);

module.exports = router;
