import { DataTypes, Model } from "sequelize";
import { environments } from "../Instances/mysql";
import { ENVIRONMENT } from "./envs";

/*
ENVIRONMENTS

[1] Production
[2] House
[3] Work

*/

const ENV = ENVIRONMENT;

interface UserInterface extends Model {
  id: number;
  uuid: string;
  name: string;
  password: string;
  email: string;
}
interface UserDataInterface extends Model {
  id: number;
  user_id: number;
  cpf_cnpj: string;
  user_type: string;
  wallet_id: number;
}

interface WalletInterface extends Model {
  id: number;
  user_id: number;
  balance: number;
}

export const User = environments[ENV].define<UserInterface>(
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
export const Wallet = environments[ENV].define<WalletInterface>(
  "Wallet",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  },
  {
    tableName: "Wallet",
    timestamps: false,
  }
);
export const UserData = environments[ENV].define<UserDataInterface>(
  "UserData",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    cpf_cnpj: {
      type: DataTypes.STRING,
    },
    user_type: {
      type: DataTypes.STRING,
    },
    wallet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Wallet,
        key: "id",
      },
    },
  },
  {
    tableName: "UserData",
    timestamps: false,
  }
);

User.hasOne(Wallet, {
  foreignKey: "id",
});
Wallet.belongsTo(User);

User.hasOne(UserData, {
  foreignKey: "id",
});
UserData.belongsTo(User);

UserData.belongsTo(User);

environments[ENV].sync()
  .then(() => {
    return Wallet.sync();
  })
  .then(() => {
    return UserData.sync();
  })
  .then(() => {
    console.log(">[Models] Users Tables sync successful");
  })
  .catch((error) => {
    console.error(">[Models] Error on Users table sync", error);
  });
