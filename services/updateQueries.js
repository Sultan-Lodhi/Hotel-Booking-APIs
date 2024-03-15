import db from '../models/index.js';
import { MESSAGES } from '../constants/index.js';

const { UPDATE_FAILED } = MESSAGES;

export const updateData = async (modelName, dataToBeUpdated, whereCondition) => {
  if (!Object.entries(dataToBeUpdated).length || !Object.entries(whereCondition).length) {
    throw new Error(UPDATE_FAILED);
  }
  return await db[modelName].update(dataToBeUpdated, { where: whereCondition });
};
