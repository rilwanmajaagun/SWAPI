export default {
  addComment: `
  INSERT INTO movies_comment(
    episode_id,
    comment,
    commenter_ip
  )VALUES($1, $2, $3)
  RETURNING *`,

  CommentCount: `
  SELECT 
  episode_id,
  count(*)
  FROM movies_comment
  WHERE episode_id = ANY($1)
  GROUP BY episode_id
  `,

  getComments: `
  SELECT
  id, 
  episode_id,
  comment,
  commenter_ip,
  created_at,
  updated_at
  FROM movies_comment
  WHERE episode_id = ($1)
  ORDER BY created_at DESC`,
};
