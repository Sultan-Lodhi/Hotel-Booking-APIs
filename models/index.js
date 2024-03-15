'use strict';

import { Sequelize, DataTypes } from 'sequelize';
import { environment } from '../config/environment.js';

import users from './users.js';
import hotels from './hotels.js';
import hotelRooms from './hotel_rooms.js';
import userBookings from './user_bookings.js';

const db = {};
const { dbDatabase, dbUser, dbPassword, dbHost, dbPort, dbDialect } = environment;

const sequelize = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  logging: console.log,//false,
  timezone: '+05:30',
  dialectOptions: {
    decimalNumbers: true,
  },
});

/* adding models */
db.users = users(sequelize, DataTypes);
db.hotels = hotels(sequelize, DataTypes);
db.hotelRooms = hotelRooms(sequelize, DataTypes);
db.userBookings = userBookings(sequelize, DataTypes);

/* adding associations */
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log(err);
  });

/* It creates models tables if not exist and if exists it fetch them */
db.sequelize
  .sync()
  .then(() => {
    console.log('yes re-synced');
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
