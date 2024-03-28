const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("Company", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Company.associate = (models) => {
    Company.belongsTo(models.Customer);
    Company.hasMany(models.Gate, { as: "gates" });
    Company.hasMany(models.User, { as: "users" });
    Company.hasMany(models.Vehicle, { as: "vehicles" });
  };
  return Company;
};
