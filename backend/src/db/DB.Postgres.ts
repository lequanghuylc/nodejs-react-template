import { QueryInterface } from 'sequelize';
const Sequelize = require('sequelize');
export const Op = Sequelize.Op;
const GlobalEvent = require('js-events-listener');
import { UserStatic, createUser } from './Schema.User';
import { GeneralDataStatic, createGeneralData } from './Schema.GeneralData';
import { migration } from './migration';

class DB {

  instance;

  _ready = false;
  makeReady = () => {
    console.log('MAKE READY');
    this._ready = true;
    GlobalEvent.emit('DB_READY', undefined);
  }
  onReady = () => new Promise((resolve, reject) => {
    if (this._ready) return resolve(undefined);
    GlobalEvent.on('DB_READY', () => {
      resolve(undefined);
    });
  })

  async init() {

    if (this.instance) return this.instance;
    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
    this.instance = new Sequelize(`${DB_CONNECTION_STRING}`, {
      logging: false,
    });
    await this.migrateTables();
    return this.instance;
  }

  User : UserStatic;
  GeneralData : GeneralDataStatic;

  queryInterface: any;

  async migrateTables() {
    this.User = await createUser(this.instance);
    this.GeneralData = await createGeneralData(this.instance);
    this.queryInterface = this.instance.getQueryInterface();
    await migration(this);
    this.makeReady();
  }
}

export default new DB();
