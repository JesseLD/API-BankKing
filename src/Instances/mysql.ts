import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize_dev_work = new Sequelize(
  process.env.MYSQL_DB_DEV_WORK as string,
  process.env.MYSQL_USER_DEV_WORK as string,
  process.env.MYSQL_PASS_DEV_WORK as string,
  {
    dialect: "mysql",
    port: parseInt(process.env.MYSQL_PORT_DEV_WORK as string),
  }
);

const sequelize_dev = new Sequelize(
  process.env.MYSQL_DB_DEV as string,
  process.env.MYSQL_USER_DEV as string,
  process.env.MYSQL_PASS_DEV as string,
  {
    dialect: "mysql",
    port: parseInt(process.env.MYSQL_PORT_DEV as string),
  }
);
const sequelize = new Sequelize(
  process.env.MYSQL_DB as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASS as string,
  {
    dialect: "mysql",
    port: parseInt(process.env.MYSQL_PORT as string),
  }
);

export const enviroments = [sequelize, sequelize_dev, sequelize_dev_work];
