import Redis from 'ioredis';
import { environment } from './environment.js';

export const RedisClient = new Redis({
  host: environment.redisHost,
  port: environment.redisPort
});
