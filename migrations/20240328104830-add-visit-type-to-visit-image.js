"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("VisitImages", "visit_type", {
      type: Sequelize.ENUM("entry", "exit"),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("VisitImages", "visit_type");
  },
};
