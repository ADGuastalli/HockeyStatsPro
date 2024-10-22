require("dotenv").config();
const express = require("express");
const sequelize = require("./src/db");
const routes = require("./src/routers/routers");
const { preloadClubs, preloadTorneos } = require("./src/preload");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS para todas las solicitudes
app.use(cors());

app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Servidor corriendo en http://localhost:" + PORT);
});

// Conexión a la base de datos
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito.");

    // Sincronizar los modelos
    await sequelize.sync({ force: false }); // Eliminar y recrear tablas
    console.log("Las tablas han sido sincronizadas.");

    await preloadTorneos();
    await preloadClubs();
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  testConnection();
});
