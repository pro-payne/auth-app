const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: console.log,
  }
);

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});

module.exports = {
  sequelize,
};

console.log("check::", process.env);
