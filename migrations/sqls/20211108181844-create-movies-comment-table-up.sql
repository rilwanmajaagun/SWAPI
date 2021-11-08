/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS movies_comment (
id serial unique,
episode_id INTEGER NOT NULL,
comment VARCHAR(500),
commenter_ip VARCHAR NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW() 
);