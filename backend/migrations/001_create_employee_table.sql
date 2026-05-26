CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  job_title TEXT NOT NULL,
  department TEXT,
  country TEXT NOT NULL,
  salary REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_country ON employees(country);
CREATE INDEX IF NOT EXISTS idx_job_title ON employees(job_title);
CREATE INDEX IF NOT EXISTS idx_department ON employees(department);