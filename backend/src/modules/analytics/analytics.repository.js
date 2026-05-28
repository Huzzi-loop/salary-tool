const db = require("../../db");

function getSalaryStats({ country, department }) {
  let where = "WHERE is_active = 1";
  const params = [];

  if (country) {
    where += " AND country = ?";
    params.push(country);
  }

  if (department) {
    where += " AND department = ?";
    params.push(department);
  }

  const baseQuery = `
    SELECT 
      AVG(salary) as avg_salary,
      MIN(salary) as min_salary,
      MAX(salary) as max_salary
    FROM employees
    ${where}
  `;

  const stats = db.prepare(baseQuery).get(...params);

  return stats;
}

module.exports = {
  getSalaryStats,
};
