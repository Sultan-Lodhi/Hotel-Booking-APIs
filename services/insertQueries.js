import db from '../models/index.js';
import { Op } from 'sequelize';
import { MODELS, MESSAGES } from '../constants/index.js';

const { USERS, HOTELS, USER_BOOKINGS, HOTEL_ROOMS } = MODELS;
const { INSERTION_FAILED, BULK_INSERTION_FAILED } = MESSAGES;

export const insertSingleEntity = async (modelName, dataToBeInserted) => {
  if (!Object.entries(dataToBeInserted).length) throw new Error(INSERTION_FAILED);
  return await db[modelName].create(dataToBeInserted);
};

export const insertDataInBulk = async (modelName, dataToBeInserted) => {
  if (!dataToBeInserted.length) throw new Error(BULK_INSERTION_FAILED);
  return await db[modelName].bulkCreate(dataToBeInserted);
};
