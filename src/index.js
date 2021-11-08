import express from 'express';
import expressConfig from './config/express';
import db from './config/db';
import Logger from './config/logger';

const port = process.env.PORT || 4000;
const app = express();

global.logger = Logger.createLogger({ label: 'swapi' });

expressConfig(app);

db.connect()
  .then((obj) => {
    app.listen(port, () => {
      obj.done();
      logger.info(`starting on port ${port}`);
    });
  })
  .catch((error) => {
    logger.info(error.message);
  });

export default app;
