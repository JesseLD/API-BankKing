import { DataTypes, Model } from "sequelize";
import { enviroments } from "../Instances/mysql";

interface UserInterface extends Model {
  id: number;
  uuid: string;
  name: string;
  password: string;
  email: string;
}

export const User = enviroments[3].define<UserInterface>(
  "User",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    uuid: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);
