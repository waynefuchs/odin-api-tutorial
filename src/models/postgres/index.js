import Sequelize from "sequelize";
import getUserModel from "./user.js";
import getMessageModel from "./message.js";

const isConsoleLoggingAllSQLQueries = false;

// Database Name, Postgres User, Postgres Password
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    logging: false,
  }
);

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
