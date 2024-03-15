import { RedisClient } from '../config/redis.js';

export const setDataInRedis = async (key, val) => {
  await RedisClient.set(key, JSON.stringify(val));
};

export const getDataFromRedis = async (key) => {
  const result = await RedisClient.get(key);
  return JSON.parse(result);
};

export const deleteDataFromRedis = async (key) => {
  await RedisClient.del(key);
};
