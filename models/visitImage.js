const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const VisitImage = sequelize.define("VisitImage", {
    image_type: {
      type: DataTypes.ENUM("number_plate", "vehicle"),
      allowNull: false,
    },
    image_path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  VisitImage.associate = (models) => {
    VisitImage.belongsTo(sequelize.models.VehicleVisit);
  };

  return VisitImage;
};