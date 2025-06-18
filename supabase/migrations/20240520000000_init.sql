CREATE TABLE memes (
                       id SERIAL PRIMARY KEY,
                       title TEXT NOT NULL,
                       image_url TEXT NOT NULL,
                       tags TEXT[],
                       upvotes INTEGER DEFAULT 0,
                       owner_id TEXT DEFAULT 'cyberpunk420',
                       caption TEXT,
                       vibe TEXT
);

CREATE TABLE bids (
                      id SERIAL PRIMARY KEY,
                      meme_id INTEGER REFERENCES memes(id),
                      user_id TEXT,
                      credits INTEGER
);

CREATE INDEX idx_tags ON memes USING GIN(tags);
CREATE INDEX idx_upvotes ON memes(upvotes DESC);