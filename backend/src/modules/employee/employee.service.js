class EmployeeService {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  createEmployee(data) {
    if (!data.first_name || !data.last_name) {
      throw new Error("Name is required");
    }

    if (!data.job_title || !data.country) {
      throw new Error("Job title and country are required");
    }

    if (data.salary == null || data.salary < 0) {
      throw new Error("Invalid salary");
    }

    return this.employeeRepository.createEmployee(data);
  }
}

module.exports = EmployeeService;
