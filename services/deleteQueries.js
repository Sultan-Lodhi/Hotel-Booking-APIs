import db from '../models/index.js';
import { MESSAGES } from '../constants/index.js';

const { DELETION_FAILED } = MESSAGES;

export const deleteData = async (modelName, whereCondition) => {
  if (!Object.entries(whereCondition).length) throw new Error(DELETION_FAILED);
  return await db[modelName].destroy({ where: whereCondition });
};
