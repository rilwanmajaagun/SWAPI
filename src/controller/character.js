/* eslint-disable import/prefer-default-export */
import { Helper, ErrorFactory, constants } from '../utils';

const {
  successResponse, makeGetRequest, sortOrFilter,
  totalHeight,
} = Helper;

const { RESOURCE_FETCH_SUCCESS } = constants;

export const getCharacter = async (req, res, next) => {
  try {
    const { query } = req;
    const {
      data: { results: characters },
    } = await makeGetRequest('https://swapi.dev/api/people/');
    let result = characters;
    result = sortOrFilter(query, result);
    const metaData = totalHeight(result);
    return successResponse(res, {
      code: 200,
      message: RESOURCE_FETCH_SUCCESS('Character'),
      data: {
        metaData,
        characters: result,
      },
    });
  } catch (e) {
    logger.error(`GET CHARACTER- ${JSON.stringify(e.message)}`);
    const error = ErrorFactory.resolveError(e);
    return next(error);
  }
};
