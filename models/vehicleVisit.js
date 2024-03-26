const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const VehicleVisit = sequelize.define("VehicleVisit", {
    visit_type: {
      type: DataTypes.ENUM("entry", "exit"),
      allowNull: true,
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  VehicleVisit.associate = (models) => {
    VehicleVisit.belongsTo(sequelize.models.Gate);
    VehicleVisit.belongsTo(sequelize.models.Vehicle);
  };

  return VehicleVisit;
};
