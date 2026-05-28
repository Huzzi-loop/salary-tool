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

  getEmployees(params) {
    return this.employeeRepository.getEmployees(params);
  }

  updateEmployee(id, data) {
    if (data.salary != null && data.salary < 0) {
      throw new Error("Invalid salary");
    }

    const updated = this.employeeRepository.updateEmployee(id, data);

    if (!updated) {
      throw new Error("Employee not found");
    }

    return updated;
  }

  deleteEmployee(id) {
    const deleted = this.employeeRepository.deleteEmployee(id);

    if (!deleted) {
      throw new Error("Employee not found");
    }

    return { success: true };
  }
}

module.exports = EmployeeService;
