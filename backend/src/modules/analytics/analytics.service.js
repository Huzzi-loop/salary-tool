class AnalyticsService {
  constructor(db) {
    this.db = db;
  }

  async getSalaryDistribution() {
    // SQL query to get salary distribution
    const query = `SELECT salary, COUNT(*) as count FROM employees GROUP BY salary`;
    return await this.db.query(query);
  }

  async getDepartmentComparison() {
    // SQL query to compare salaries by department
    const query = `SELECT department, AVG(salary) as average_salary FROM employees GROUP BY department`;
    return await this.db.query(query);
  }
}

module.exports = new AnalyticsService(require("../db"));
