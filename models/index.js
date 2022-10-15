const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const Content = require("./content");
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Content = Content;

Content.init(sequelize);

Content.associate(db);

module.exports = db;
