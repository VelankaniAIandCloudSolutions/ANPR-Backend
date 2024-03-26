const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("Vehicle", {
    plate_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Vehicle.associate = (models) => {
    Vehicle.belongsTo(sequelize.models.Company);
  };

  return Vehicle;
};
