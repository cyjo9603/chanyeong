import { ConnectionOptions } from 'typeorm';

import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_ENDPOINT, DB_USERNAME, DB_PASSWORD } = process.env;

const ConnectionOptions: ConnectionOptions = {
  type: 'mysql',
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['src/entities/**.*'],
  host: DB_ENDPOINT,
  port: 3306,
  username: DB_USERNAME,
  password: DB_PASSWORD,
};

export default ConnectionOptions;
