const Sequelize = require("sequelize");

const sequelize = new Sequelize("anpr", "anpr_admin", "password@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };
