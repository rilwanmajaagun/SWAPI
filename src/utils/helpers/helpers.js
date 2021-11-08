import axios from 'axios';
import genericError from '../error/generic';
import constants from '../constants';
import DBError from '../error/db.error';
import ModuleError from '../error/module.error';

const { serverError } = genericError;
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants;

export const successResponse = (
  res,
  { data, message = SUCCESS_RESPONSE, code = 200 },
) => res.status(code).json({
  status: SUCCESS,
  code,
  message,
  data,
});

export const moduleErrLogMessager = (error) => logger.error(`${error.status} - ${error.name} - ${error.message}`);

export const apiErrLogMessager = (error, req) => {
  logger.error(
    `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );
};

export const makeGetRequest = async (url, options = {}) => {
  try {
    const { status, data } = await axios({ url, method: 'GET', ...options });
    return { status, data };
  } catch (e) {
    const status = e.response ? e.response.status : 500;
    const moduleError = new ModuleError({ message: e.message, status });
    moduleErrLogMessager(moduleError);
    throw moduleError;
  }
};

export const filter = (data, key, value) => data.filter((el) => el[key] === value);

export const compareValues = (key, order = 'asc') => function innerSort(a, b) {
  const keys = Object.keys(a);
  if (!keys.includes(key)) {
    return 0;
  }

  const int = ['height'];
  const varA = (!int.includes(key))
    ? a[key].toUpperCase() : Number(a[key]);
  const varB = (!int.includes(key))
    ? b[key].toUpperCase() : Number(b[key]);

  let comparison = 0;
  if (varA > varB) {
    comparison = 1;
  } else if (varA < varB) {
    comparison = -1;
  }
  return (
    (order === 'desc') ? (comparison * -1) : comparison
  );
};

export const filterResponse = (data) => data.map((el) => ({
  title: el.title,
  episode_id: el.episode_id,
  opening_crawl: el.opening_crawl,
  release_date: el.release_date,
  comment_count: el.comment_count,
}));

export const sortByDate = (data) => data.sort((a, b) => {
  const dateA = new Date(a.release_date);
  const dateB = new Date(b.release_date);
  return dateB - dateA;
});

export const updateMoviesCommentCount = (moviesComment, moviesList) => {
  const result = [];
  if (moviesComment.length < 1) {
    moviesList.forEach((movie) => {
      result.push({
        ...movie,
        comment_count: 0,
      });
    });
  } else {
    moviesList.forEach((movie) => {
      const data = moviesComment.find((comment) => comment.episode_id === movie.episode_id);
      result.push(!data ? {
        ...movie,
        comment_count: 0,
      } : {
        ...movie,
        comment_count: Number(data.count),
      });
    });
  }
  return result;
};

export const totalHeight = (result) => {
  const data = result.reduce((acc, cur) => {
    if (!acc.cm) {
      acc.cm = Number(cur.height);
      acc.count = 1;
    } else {
      acc.cm += Number(cur.height);
      acc.count += 1;
    }
    return acc;
  }, {});
  return {
    ...data,
    ft: Math.floor(data.cm / 30.48),
    inches: Number((data.cm / 2.54).toFixed(2)),
  };
};

export const sortOrFilter = (query, data) => {
  const queryParams = Object.keys(query);
  let result = data;
  if (queryParams.includes('sort')) {
    result = data.sort(compareValues(query.sort, query.order));
  }
  if (queryParams.includes('gender')) {
    result = filter(data, 'gender', query.gender);
  }
  return result;
};

export const makeError = ({ error, status }) => {
  const dbError = new DBError({
    status,
    message: error.message,
  });
  moduleErrLogMessager(dbError);
  return dbError;
};

export const errorResponse = (req, res, error) => {
  const aggregateError = { ...serverError, ...error };
  apiErrLogMessager(aggregateError, req);
  return res.status(aggregateError.status).json({
    status: FAIL,
    code: aggregateError.status,
    message: aggregateError.message,
    errors: aggregateError.errors,
  });
};
