CREATE TABLE IF NOT EXISTS city_visits (
  city_key TEXT PRIMARY KEY,
  city TEXT,
  region TEXT,
  country TEXT,
  latitude REAL,
  longitude REAL,
  visits INTEGER NOT NULL DEFAULT 0,
  unique_days INTEGER NOT NULL DEFAULT 0,
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS daily_unique_visitors (
  visit_day TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  city_key TEXT NOT NULL,
  PRIMARY KEY (visit_day, visitor_hash)
);

CREATE TABLE IF NOT EXISTS daily_totals (
  visit_day TEXT PRIMARY KEY,
  visits INTEGER NOT NULL DEFAULT 0
);
