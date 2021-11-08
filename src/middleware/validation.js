/* eslint-disable no-useless-escape */
/* eslint-disable import/prefer-default-export */
import HttpStatus from 'http-status-codes';
import { Helper, genericErrors } from '../utils';

const { errorResponse } = Helper;
const { serverError } = genericErrors;
const validateData = (data, type) => async (req, res, next) => {
  try {
    const getType = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    const options = { language: { key: '{{key}} ' } };
    const result = getType[type];

    const isValid = await data.schema.validate(result, options);
    if (!isValid.error) {
      req[type] = isValid.value;
      return next();
    }

    const { message } = isValid.error.details[0];
    return errorResponse(req, res, {
      status: HttpStatus.BAD_REQUEST,
      message: message.replace(/[\"]/gi, ''),
      errors: data.message,
    });
  } catch (error) {
    logger.error('validateData::VALIDATOR MIDDLEWARE', error);
    return next(serverError);
  }
};

export default validateData;
