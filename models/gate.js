const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Gate = sequelize.define("Gate", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gate_type: {
      type: DataTypes.ENUM("entry", "exit"),
      allowNull: true,
    },
  });

  Gate.associate = (models) => {
    Gate.belongsTo(sequelize.models.Company);
  };

  return Gate;
};
