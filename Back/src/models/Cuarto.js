module.exports = (sequelize, DataTypes) => {
  const Cuarto = sequelize.define(
    "Cuarto",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      primerCuarto: {
        type: DataTypes.INTEGER,
        references: {
          model: "Estadistica",
          key: "id",
        },
      },
      segundoCuarto: {
        type: DataTypes.INTEGER,
        references: {
          model: "Estadistica",
          key: "id",
        },
      },
      tercerCuarto: {
        type: DataTypes.INTEGER,
        references: {
          model: "Estadistica",
          key: "id",
        },
      },
      cuartoCuarto: {
        type: DataTypes.INTEGER,
        references: {
          model: "Estadistica",
          key: "id",
        },
      },
    },
    {
      tableName: "Cuarto",
      timestamps: false,
    }
  );

  return Cuarto;
};
