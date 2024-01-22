const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
  port: process.env.PORT,
  logging: console.log
});

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});

module.exports = {
  sequelize,
};
