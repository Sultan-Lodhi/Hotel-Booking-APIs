import db from '../models/index.js';
import { Op } from 'sequelize';
import { MODELS } from '../constants/index.js';

const { USERS, HOTELS, USER_BOOKINGS, HOTEL_ROOMS } = MODELS;

export const toPlainObject = (data) => {
  if (!data || !Array.isArray(data)) return data;
  return data.map((el) => el.get({ plain: true }));
};

export const getAllData = async (modelName, whereCondition = null) => {
  const result = !whereCondition
    ? await db[modelName].findAll()
    : await db[modelName].findAll({ where: whereCondition });

  return toPlainObject(result);
};

export const getSingleRecord = async (modelName, whereCondition) => {
  const result = await db[modelName].findOne({ where: whereCondition });
  return toPlainObject(result);
};

export const getUserBookingsDetails = async (userId) => {
  const result = await db.userBookings.findAll(
    {
      include: [
        {
          model: db.hotels
        },
        {
          model: db.hotelRooms
        }
      ]
    },
    {
      where: { userId }
    }
  );
  return toPlainObject(result);
};
