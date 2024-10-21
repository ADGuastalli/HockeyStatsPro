const sequelize = require("../db");
const DataTypes = require("sequelize").DataTypes;

const Usuario = require("./Usuario")(sequelize, DataTypes);
const Torneo = require("./Torneo")(sequelize, DataTypes);
const Estadistica = require("./Estadistica")(sequelize, DataTypes);
const Cuarto = require("./Cuarto")(sequelize, DataTypes);
const Partido = require("./Partido")(sequelize, DataTypes);
const Club = require("./Clubes")(sequelize, DataTypes);

// Relaciones
Usuario.belongsTo(Club, { foreignKey: "clubId", as: "club" });
Club.hasMany(Usuario, { foreignKey: "clubId", as: "usuarios" });
Usuario.hasMany(Partido, { foreignKey: "usuarioId" });
Partido.belongsTo(Usuario, { foreignKey: "usuarioId" });
Torneo.hasMany(Partido, { foreignKey: "torneoId" });
Partido.belongsTo(Torneo, { foreignKey: "torneoId" });
Estadistica.hasOne(Cuarto, { foreignKey: "primerCuarto" });
Estadistica.hasOne(Cuarto, { foreignKey: "segundoCuarto" });
Estadistica.hasOne(Cuarto, { foreignKey: "tercerCuarto" });
Estadistica.hasOne(Cuarto, { foreignKey: "cuartoCuarto" });
Cuarto.belongsTo(Estadistica, { foreignKey: "primerCuarto" });
Cuarto.belongsTo(Estadistica, { foreignKey: "segundoCuarto" });
Cuarto.belongsTo(Estadistica, { foreignKey: "tercerCuarto" });
Cuarto.belongsTo(Estadistica, { foreignKey: "cuartoCuarto" });
Cuarto.hasOne(Partido, { foreignKey: "cuartoId" });
Partido.belongsTo(Cuarto, { foreignKey: "cuartoId" });

module.exports = {
  sequelize,
  Usuario,
  Torneo,
  Estadistica,
  Cuarto,
  Partido,
  Club,
};
