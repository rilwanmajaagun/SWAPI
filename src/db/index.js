import commentQuery from './queries/comment';

import db from '../config/db';

const queries = {
  commentQuery,
};

export default {
  transact: (query, data, type) => db.any(queries[type][query], data),
};
