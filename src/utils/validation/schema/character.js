/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const getCharacter = {
  schema: Joi.object().keys({
    sort: Joi.string()
      .valid('name', 'height', 'gender')
      .label('episodeId'),
    order: Joi.string()
      .valid('asc', 'desc')
      .label('order'),
    gender: Joi.string()
      .valid('male', 'female', 'n/a')
      .label('gender'),
  }),
  message: 'Error adding comment',
};
