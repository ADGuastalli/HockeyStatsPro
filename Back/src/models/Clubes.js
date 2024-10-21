module.exports = (sequelize, DataTypes) => {
  const Clubes = sequelize.define(
    "Clubes",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Usuarios", // nombre de la tabla de usuarios
          key: "id",
        },
        allowNull: true, // Cambiar a true para permitir valores nulos
      },
    },
    {
      tableName: "Clubes",
      timestamps: false,
    }
  );

  return Clubes;
};
