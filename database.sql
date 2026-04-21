-- ============================================
--   database.sql  —  Database Setup
-- ============================================
--   Run this file in phpMyAdmin or MySQL CLI
--   to set up the database before starting
--   the server.
--
--   Steps:
--   1. Open phpMyAdmin → http://localhost/phpmyadmin
--   2. Click "SQL" tab
--   3. Paste this entire file and click "Go"
-- ============================================


-- Step 1: Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS crud_db;

-- Step 2: Select the database to use
USE crud_db;

-- Step 3: Create the students table
CREATE TABLE IF NOT EXISTS students (
  id        INT AUTO_INCREMENT PRIMARY KEY,  -- unique ID, increases automatically
  name      VARCHAR(100) NOT NULL,           -- student name (required)
  email     VARCHAR(100) NOT NULL UNIQUE,    -- email (required, must be unique)
  age       INT,                             -- age (optional)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- auto-filled when row is created
);

-- Step 4: Insert some sample data for testing
INSERT INTO students (name, email, age) VALUES
  ('Alice Rahman',   'alice@example.com',   21),
  ('Bob Hossain',    'bob@example.com',     22),
  ('Sara Begum',     'sara@example.com',    20),
  ('Rahim Chowdury', 'rahim@example.com',   23);

-- Done! You should now see 4 rows in the students table.
SELECT * FROM students;
