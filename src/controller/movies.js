import requestIp from 'request-ip';
import * as services from '../service/movies.service';
import {
  Helper,
  ErrorFactory, DBError, constants,
} from '../utils';

const {
  successResponse, moduleErrLogMessager, makeGetRequest,
  filterResponse, sortByDate, updateMoviesCommentCount,
} = Helper;

const { RESOURCE_FETCH_ERROR_STATUS, RESOURCE_FETCH_SUCCESS, RESOURCE_CREATE_SUCCESS } = constants;

export const getMovies = async (req, res, next) => {
  try {
    const { data: { results: moviesList } } = await makeGetRequest('https://swapi.dev/api/films/');
    const moviesId = moviesList.map((el) => el.episode_id);
    const commentCount = await services.getCommentCount(moviesId);
    const movies = updateMoviesCommentCount(commentCount, moviesList);
    const result = filterResponse(sortByDate(movies));
    return successResponse(res, {
      code: 200,
      message: RESOURCE_FETCH_SUCCESS('Movies'),
      data: result,
    });
  } catch (e) {
    const error = ErrorFactory.resolveError(e);
    const dbError = new DBError({
      status: RESOURCE_FETCH_ERROR_STATUS('COMMENT'),
      message: e.message,
    });
    moduleErrLogMessager(dbError);
    return next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { params: { episodeId }, body: { comment } } = req;
    const ip = requestIp.getClientIp(req);
    const [data] = await services.addComment(episodeId, comment, ip);
    return successResponse(res, {
      code: 201,
      message: RESOURCE_CREATE_SUCCESS('Comment'),
      data,
    });
  } catch (e) {
    const error = ErrorFactory.resolveError(e);
    const dbError = new DBError({
      status: RESOURCE_FETCH_ERROR_STATUS('COMMENT'),
      message: e.message,
    });
    moduleErrLogMessager(dbError);
    return next(error);
  }
};

export const getMoviesComment = async (req, res, next) => {
  try {
    const { params: { episodeId } } = req;
    const data = await services.getComments(episodeId);
    return successResponse(res, {
      code: 200,
      message: RESOURCE_FETCH_SUCCESS('Comment'),
      data,
    });
  } catch (e) {
    const error = ErrorFactory.resolveError(e);
    const dbError = new DBError({
      status: RESOURCE_FETCH_ERROR_STATUS('COMMENT'),
      message: e.message,
    });
    moduleErrLogMessager(dbError);
    return next(error);
  }
};
