const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cutagcoz_authapp", "cutagcoz_authapp", "F@KG;rMr6(+I", {
  host: "cutag.co.za",
  dialect: "mysql",
  logging: console.log
});

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});

module.exports = {
  sequelize,
};