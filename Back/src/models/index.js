const sequelize = require("../db");
const DataTypes = require("sequelize").DataTypes;

const Usuario = require("./Usuario")(sequelize, DataTypes);
const Torneo = require("./Torneo")(sequelize, DataTypes);
const Estadistica = require("./Estadistica")(sequelize, DataTypes);
const Partido = require("./Partido")(sequelize, DataTypes);
const Club = require("./Clubes")(sequelize, DataTypes);

// Relaciones
// Relaciones Usuario - Club
Usuario.belongsTo(Club, { foreignKey: "clubId", as: "club" });
Club.hasMany(Usuario, { foreignKey: "clubId", as: "usuarios" });

// Relaciones Partido - Usuario
Usuario.hasMany(Partido, { foreignKey: "usuarioId" });
Partido.belongsTo(Usuario, { foreignKey: "usuarioId" });

// Relaciones Partido - Torneo
Torneo.hasMany(Partido, { foreignKey: "torneoId" });
Partido.belongsTo(Torneo, { foreignKey: "torneoId" });

// Relaciones Club - Partido
Club.hasMany(Partido, { foreignKey: "clubId", as: "partidos" });
Partido.belongsTo(Club, { foreignKey: "clubId" });

// No más relaciones con Cuarto

module.exports = {
  sequelize,
  Usuario,
  Torneo,
  Estadistica,
  Partido,
  Club,
};
