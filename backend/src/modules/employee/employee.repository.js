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

module.exports = {
  createEmployee,
};
