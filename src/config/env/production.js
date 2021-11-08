import 'dotenv/config';

export default {
  DATABASE_URL: process.env.SWAPI_DATABASE_PROD_URL,
  NODE_ENV: process.env.SWAPI_NODE_ENV,
};
