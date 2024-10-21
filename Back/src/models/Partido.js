module.exports = (sequelize, DataTypes) => {
  const Partido = sequelize.define(
    "Partido",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fechaTorneo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clubId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Clubes",
          key: "id",
        },
      },
      torneoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Torneo",
          key: "id",
        },
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
    },
    {
      tableName: "Partido",
      timestamps: false,
    }
  );

  return Partido;
};
