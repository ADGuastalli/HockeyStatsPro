module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
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
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      clubId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Clubes", // Nombre de la tabla Clubes
          key: "id", // Campo que actúa como llave foránea
        },
      },
    },
    {
      tableName: "Usuarios",
      timestamps: false,
    }
  );
  return Usuario;
};
