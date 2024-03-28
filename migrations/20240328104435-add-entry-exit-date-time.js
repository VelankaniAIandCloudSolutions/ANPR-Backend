"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("VehicleVisits", "entry_date_time", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn("VehicleVisits", "exit_date_time", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    // Change allowNull for date_time to true
    await queryInterface.changeColumn("VehicleVisits", "date_time", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("VehicleVisits", "entry_date_time");
    await queryInterface.removeColumn("VehicleVisits", "exit_date_time");

    await queryInterface.changeColumn("VehicleVisits", "date_time", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
