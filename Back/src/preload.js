// preload.js
const { Club } = require("./models");
const { Torneo } = require("./models");

const preloadClubs = async () => {
  const clubs = [
    { nombre: "Argentino" },
    { nombre: "Dublin" },
    { nombre: "El Nacional A" },
    { nombre: "El Nacional B" },
    { nombre: "Independiente" },
    { nombre: "Monte Hermoso" },
    { nombre: "Pacifico A" },
    { nombre: "Pacifico B" },
    { nombre: "Palihue" },
    { nombre: "Puerto Belgrano A" },
    { nombre: "Puerto Belgrano B" },
    { nombre: "Sociedad Sportiva A" },
    { nombre: "Sociedad Sportiva B" },
    { nombre: "Sporting" },
    { nombre: "Tiro Federal" },
    { nombre: "Union" },
    { nombre: "Universitario A" },
    { nombre: "Universitario B" },
    { nombre: "Universitario C" },
    { nombre: "Villa Mitre" },
  ];
  try {
    const existingClubs = await Club.findAll();
    if (existingClubs.length > 0) {
      console.log("Los clubes ya están precargados en la base de datos.");
      return; // Salimos si ya hay clubes
    }
    await Club.bulkCreate(clubs, { ignoreDuplicates: true });
    console.log("Clubs precargados exitosamente.");
  } catch (error) {
    console.error("Error al precargar clubs:", error);
  }
};

const preloadTorneos = async () => {
  const torneos = [{ nombre: "Apertura 2024" }, { nombre: "Clausura 2024" }];

  try {
    const existingTorneos = await Torneo.findAll();
    if (existingTorneos.length > 0) {
      console.log("Los torneos ya están precargados en la base de datos.");
      return; // Salimos si ya hay torneos
    }
    await Torneo.bulkCreate(torneos, { ignoreDuplicates: true });
    console.log("Torneos precargados exitosamente.");
  } catch (error) {
    console.error("Error al precargar torneos:", error);
  }
};

module.exports = { preloadClubs, preloadTorneos };
