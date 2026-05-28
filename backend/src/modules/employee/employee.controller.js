const EmployeeService = require("./employee.service");
const employeeRepository = require("./employee.repository");
const {
  createEmployeeSchema,
  getEmployeesQuerySchema,
  updateEmployeeSchema,
} = require("./employee.validation");

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

function getEmployees(req, res) {
  const { error, value } = getEmployeesQuerySchema.validate(req.query, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      error: error.details.map((e) => e.message),
    });
  }

  try {
    const result = employeeService.getEmployees(value);

    return res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

function updateEmployee(req, res) {
  const id = Number(req.params.id);

  const { error, value } = updateEmployeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const updated = employeeService.updateEmployee(id, value);
    return res.json(updated);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

function deleteEmployee(req, res) {
  const id = Number(req.params.id);

  try {
    employeeService.deleteEmployee(id);
    return res.status(204).send();
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
