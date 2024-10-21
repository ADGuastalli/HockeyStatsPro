module.exports = (sequelize, DataTypes) => {
  const Estadistica = sequelize.define(
    "Estadistica",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      golA: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      golE: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      ccA: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      ccE: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      largoA: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      largoE: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      ingresoA: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      ingresoE: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      tirosA: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      tirosE: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      cuartoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cuarto",
          key: "id",
        },
      },
    },
    {
      tableName: "Estadistica",
      timestamps: false,
    }
  );

  return Estadistica;
};
