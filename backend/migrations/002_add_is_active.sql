ALTER TABLE employees ADD COLUMN is_active INTEGER DEFAULT 1;

-- Partial index only for active employees
CREATE INDEX IF NOT EXISTS idx_active_employees 
ON employees(id) 
WHERE is_active = 1;