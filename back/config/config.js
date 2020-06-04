const dotenv = require('dotenv');

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_ENDPOINT } = process.env;

const config = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_ENDPOINT,
    dialect: 'mysql',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_ENDPOINT,
    dialect: 'mysql',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_ENDPOINT,
    dialect: 'mysql',
  },
};

module.exports = config;
