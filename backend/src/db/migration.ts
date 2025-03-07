import dbInstace from './DB.Postgres';

import * as UserSchema from './Schema.User';

const ALL_SCHEMAS = [
  UserSchema,
];

export const migration = async (DB: typeof dbInstace) => {
  await Promise.all(
    ALL_SCHEMAS.map(async (schema) => {
      const tableName = schema.tableDefine.name;
      const tableDefinition = await DB.instance.queryInterface.describeTable(tableName);
      await Promise.all(
        Object.keys(schema.tableDefine.columns).map(async (colName) => {
          if (!tableDefinition[colName]) {
            const { type, defaultValue } = schema.tableDefine.columns[colName]
            await DB.instance.queryInterface.addColumn(tableName, colName, {
              type,
              defaultValue: defaultValue || null,
            });
            console.log(`Auto migrate: Add column ${tableName}.${colName}`)
          }
        })
      )
    })
  )
}
