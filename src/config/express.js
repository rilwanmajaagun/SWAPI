/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import router from '../routes';
import { Helper, genericErrors } from '../utils';

const { errorResponse } = Helper;
const { notFoundApi } = genericErrors;

const expressConfig = (app) => {
  app.use(express.urlencoded({
    extended: false,
  }));
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send({ message: 'Welcome' });
  });

  app.use('/api/v1', router);

  app.use((req, res, next) => next(notFoundApi));

  app.use((err, req, res, next) => {
    errorResponse(req, res, err);
  });
};

export default expressConfig;
