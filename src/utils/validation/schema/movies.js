import Joi from 'joi';

export const addComment = {
  schema: Joi.object().keys({
    comment: Joi.string()
      .required()
      .label('comment'),
  }),
  message: 'Error adding comment',
};

export const moviesEpisodeId = {
  schema: Joi.object().keys({
    episodeId: Joi.number()
      .required()
      .label('episodeId'),
  }),
  message: 'Error adding comment',
};
