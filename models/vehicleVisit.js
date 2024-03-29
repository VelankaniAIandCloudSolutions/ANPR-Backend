const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const VehicleVisit = sequelize.define("VehicleVisit", {
    visit_type: {
      type: DataTypes.ENUM("entry", "exit"),
      allowNull: true,
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    entry_date_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    exit_date_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // track_id: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  });

  VehicleVisit.associate = (models) => {
    VehicleVisit.belongsTo(sequelize.models.Gate);
    VehicleVisit.belongsTo(sequelize.models.Vehicle);
    VehicleVisit.hasMany(sequelize.models.VisitImage, { as: "visitImages" });
  };

  return VehicleVisit;
};
