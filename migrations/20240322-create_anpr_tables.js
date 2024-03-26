"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Gates table
    await queryInterface.createTable("Gates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gate_type: {
        type: Sequelize.ENUM("entry", "exit"),
        allowNull: true,
      },
      CompanyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Companies",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create Vehicles table
    await queryInterface.createTable("Vehicles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plate_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vehicle_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      CompanyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Companies",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create VehicleVisits table
    await queryInterface.createTable("VehicleVisits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      visit_type: {
        type: Sequelize.ENUM("entry", "exit"),
        allowNull: true,
      },
      date_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      GateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Gates",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      VehicleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Vehicles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create VisitImages table
    await queryInterface.createTable("VisitImages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image_type: {
        type: Sequelize.ENUM("number_plate", "vehicle"),
        allowNull: false,
      },
      image_path: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      VehicleVisitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "VehicleVisits",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order
    await queryInterface.dropTable("VisitImages");
    await queryInterface.dropTable("VehicleVisits");
    await queryInterface.dropTable("Vehicles");
    await queryInterface.dropTable("Gates");
  },
};
