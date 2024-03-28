const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Customer.associate = (models) => {
    Customer.hasMany(models.Company, {
      as: "companies",
    });
  };
  return Customer;
};
