/* eslint-disable import/prefer-default-export */
import Db from '../db';

export const getCommentCount = (data) => Db.transact('CommentCount', [data], 'commentQuery');
export const addComment = (id, body, ip) => {
  const payload = [id, body, ip];
  return Db.transact('addComment', payload, 'commentQuery');
};
export const getComments = (id) => Db.transact('getComments', [id], 'commentQuery');
