const db = require("../../db");

function createEmployee(data) {
  const stmt = db.prepare(`
    INSERT INTO employees 
    (first_name, last_name, email, job_title, department, country, salary)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    data.first_name,
    data.last_name,
    data.email || null,
    data.job_title,
    data.department || null,
    data.country,
    data.salary,
  );

  return db
    .prepare("SELECT * FROM employees WHERE id = ?")
    .get(result.lastInsertRowid);
}

function getEmployees({ limit, offset }) {
  const stmt = db.prepare(`
    SELECT * FROM employees
    WHERE is_active = 1
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `);

  return stmt.all(limit, offset);
}

function getEmployeeById(id) {
  return db.prepare("SELECT * FROM employees WHERE id = ?").get(id);
}

function updateEmployee(id, data) {
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });

  values.push(id);

  const stmt = db.prepare(`
    UPDATE employees
    SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  const result = stmt.run(...values);

  if (result.changes === 0) return null;

  return getEmployeeById(id);
}

function deleteEmployee(id) {
  const stmt = db.prepare(`
    UPDATE employees
    SET is_active = 0, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND is_active = 1
  `);

  const result = stmt.run(id);

  return result.changes > 0;
}

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  getEmployeeById,
  deleteEmployee,
};
