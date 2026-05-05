-- MoreYeahs PostgreSQL Schema
-- Run once: psql -U postgres -d moreyeahs -f schema.sql

CREATE TABLE IF NOT EXISTS form_submissions (
  id           SERIAL PRIMARY KEY,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  form_type    TEXT        NOT NULL,           -- 'Contact' | 'Careers' | 'Resource Request'
  name         TEXT,
  email        TEXT        NOT NULL,
  phone        TEXT,
  company      TEXT,
  service      TEXT,                           -- for Contact form
  role         TEXT,                           -- for Careers form
  message      TEXT,
  cover_note   TEXT,                           -- for Careers form
  resource     TEXT,                           -- for Resource form
  extra        TEXT                            -- misc (resume filename, etc.)
);

CREATE INDEX IF NOT EXISTS idx_submissions_form_type  ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_email      ON form_submissions(email);
