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
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      partidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Partido",
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
