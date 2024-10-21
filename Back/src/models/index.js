const sequelize = require("../db");
const DataTypes = require("sequelize").DataTypes;

const Usuario = require("./Usuario")(sequelize, DataTypes);
const Torneo = require("./Torneo")(sequelize, DataTypes);
const Estadistica = require("./Estadistica")(sequelize, DataTypes);
const Cuarto = require("./Cuarto")(sequelize, DataTypes);
const Partido = require("./Partido")(sequelize, DataTypes);
const Club = require("./Clubes")(sequelize, DataTypes);

// Relaciones
// Relaciones Usuario - Club
Usuario.belongsTo(Club, { foreignKey: "clubId", as: "club" });
Club.hasMany(Usuario, { foreignKey: "clubId", as: "usuarios" });

// Relaciones Partido - Usuario (un usuario puede tener muchos partidos)
Usuario.hasMany(Partido, { foreignKey: "usuarioId" });
Partido.belongsTo(Usuario, { foreignKey: "usuarioId" });

// Relaciones Partido - Torneo
Torneo.hasMany(Partido, { foreignKey: "torneoId" });
Partido.belongsTo(Torneo, { foreignKey: "torneoId" });

// Relaciones Partido - Cuarto (un partido tiene 4 cuartos)
Partido.hasMany(Cuarto, { foreignKey: "partidoId", as: "cuartos" });
Cuarto.belongsTo(Partido, { foreignKey: "partidoId" });

// Relaciones Cuarto - Estadística (cada cuarto puede tener muchas estadísticas)
Cuarto.hasMany(Estadistica, { foreignKey: "cuartoId", as: "estadisticas" });
Estadistica.belongsTo(Cuarto, { foreignKey: "cuartoId" });

// Relación Club - Partido (un club puede participar en muchos partidos)
Club.hasMany(Partido, { foreignKey: "clubId", as: "partidos" });
Partido.belongsTo(Club, { foreignKey: "clubId" });

module.exports = {
  sequelize,
  Usuario,
  Torneo,
  Estadistica,
  Cuarto,
  Partido,
  Club,
};
