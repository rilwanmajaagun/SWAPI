import 'dotenv/config';

export default {
  DATABASE_URL: process.env.SWAPI_DATABASE_DEV_URL,
  NODE_ENV: process.env.SWAPI_NODE_ENV,
};
