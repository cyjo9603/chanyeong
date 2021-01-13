import dotenv from 'dotenv';

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_ENDPOINT } = process.env;

type Config = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql';
};

interface ConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: ConfigGroup = {
  development: {
    username: DB_USERNAME!,
    password: DB_PASSWORD!,
    database: DB_NAME!,
    host: DB_ENDPOINT!,
    dialect: 'mysql',
  },
  test: {
    username: DB_USERNAME!,
    password: DB_PASSWORD!,
    database: DB_NAME!,
    host: DB_ENDPOINT!,
    dialect: 'mysql',
  },
  production: {
    username: DB_USERNAME!,
    password: DB_PASSWORD!,
    database: DB_NAME!,
    host: DB_ENDPOINT!,
    dialect: 'mysql',
  },
};

export default config;
