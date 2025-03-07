import { BuildOptions, Model, DataTypes, Sequelize } from "sequelize";
import { stringifyDataType } from "./Utils.Schema";
import { TUser } from 'type';

export interface UserSchema extends TUser {
  
}

// For Typescript type stuff
export interface UserModel extends Model<UserSchema>, UserSchema {}
export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export const tableDefine = {
  name: "users",
  columns: {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
    },
    role: {
      type: DataTypes.TEXT,
    },
    firstName: {
      type: DataTypes.TEXT,
    },
    lastName: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    photoUrl: {
      type: DataTypes.TEXT,
    },
    otherData: {
      type: DataTypes.TEXT,
      ...stringifyDataType("otherData"),
    },
    addressLine1: {
      type: DataTypes.TEXT,
    },
    addressLine2: {
      type: DataTypes.TEXT,
    },
    town: {
      type: DataTypes.TEXT,
    },
    country: {
      type: DataTypes.TEXT,
    },
    postCode: {
      type: DataTypes.TEXT,
    },
    resellerStripeId: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    resellerId: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    onlineStoreId: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    isAutoAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    currency: {
      type: DataTypes.TEXT,
      defaultValue: 'GBP',
    },
    accountName: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    walletBalance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  }
};

export const createUser = async (instance: Sequelize): Promise<UserStatic> => {
  const User = <UserStatic>instance.define(
    tableDefine.name,
    tableDefine.columns,
    {
      indexes: [],
    }
  );

  User.beforeSave((User: UserModel, options) => {});

  await User.sync({ force: false });
  return User;
};
