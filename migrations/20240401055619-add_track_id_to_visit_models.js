"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("VehicleVisits", "track_id", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("VisitImages", "track_id", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("VehicleVisits", "track_id");
    await queryInterface.removeColumn("VisitImages", "track_id");
  },
};
