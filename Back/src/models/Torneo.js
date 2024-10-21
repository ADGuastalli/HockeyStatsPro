module.exports = (sequelize, DataTypes) => {
  const Torneo = sequelize.define(
    "Torneo",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    {
      tableName: "Torneo",
      timestamps: false,
    }
  );

  return Torneo;
};
