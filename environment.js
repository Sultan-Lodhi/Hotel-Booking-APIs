import dotenv from 'dotenv';
dotenv.config();

export const environment = {
  appPort: process.env.APP_PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT
};
