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
      rival: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      torneoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Torneo",
          key: "id",
        },
      },
      cuartoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Cuarto",
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
