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
  };
  return Company;
};
