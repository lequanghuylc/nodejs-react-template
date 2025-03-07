import { BuildOptions, Model, DataTypes, Sequelize } from "sequelize";
import { stringifyDataType } from "./Utils.Schema";
import { TGeneralData } from 'type';

export interface GeneralDataSchema extends TGeneralData {
  
}

// For Typescript type stuff
export interface GeneralDataModel extends Model<GeneralDataSchema>, GeneralDataSchema {}
export type GeneralDataStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): GeneralDataModel;
};
export const tableDefine = {
  name: "general_data",
  columns: {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    field1: {
      type: DataTypes.TEXT,
    },
    field2: {
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.TEXT,
      ...stringifyDataType("data"),
    },
  }
};

export const createGeneralData = async (instance: Sequelize): Promise<GeneralDataStatic> => {
  const GeneralData = <GeneralDataStatic>instance.define(
    tableDefine.name,
    tableDefine.columns,
    {
      indexes: [],
    }
  );

  GeneralData.beforeSave((GeneralData: GeneralDataModel, options) => {});

  await GeneralData.sync({ force: false });
  return GeneralData;
};
