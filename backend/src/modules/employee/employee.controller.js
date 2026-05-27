const EmployeeService = require("./employee.service");
const employeeRepository = require("./employee.repository");
const { createEmployeeSchema } = require("./employee.validation");

// instantiate service with repo (DI)
const employeeService = new EmployeeService(employeeRepository);

function createEmployee(req, res) {
  const { error, value } = createEmployeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  try {
    const employee = employeeService.createEmployee(value);
    return res.status(201).json(employee);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

module.exports = {
  createEmployee,
};
