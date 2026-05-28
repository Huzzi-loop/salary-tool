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

function getEmployees({ limit, offset, search, country, department }) {
  let where = "WHERE is_active = 1";
  const params = [];

  if (search) {
    where += " AND (first_name LIKE ? OR last_name LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  if (country) {
    where += " AND country = ?";
    params.push(country);
  }

  if (department) {
    where += " AND department = ?";
    params.push(department);
  }

  const dataQuery = `
    SELECT * FROM employees
    ${where}
    LIMIT ? OFFSET ?
  `;

  const totalQuery = `
    SELECT COUNT(*) as total FROM employees
    ${where}
  `;

  const data = db.prepare(dataQuery).all(...params, limit, offset);
  const total = db.prepare(totalQuery).get(...params).total;

  return { data, total };
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
