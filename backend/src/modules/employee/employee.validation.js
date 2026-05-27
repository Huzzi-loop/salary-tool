const Joi = require("joi");

const createEmployeeSchema = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  email: Joi.string().email().optional(),
  job_title: Joi.string().trim().required(),
  department: Joi.string().trim().optional(),
  country: Joi.string().trim().required(),
  salary: Joi.number().min(0).required(),
});

const getEmployeesQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  offset: Joi.number().integer().min(0).default(0),
});

const updateEmployeeSchema = Joi.object({
  first_name: Joi.string().trim().optional(),
  last_name: Joi.string().trim().optional(),
  email: Joi.string().email().optional(),
  job_title: Joi.string().trim().optional(),
  department: Joi.string().trim().optional(),
  country: Joi.string().trim().optional(),
  salary: Joi.number().min(0).optional(),
}).min(1);

module.exports = {
  createEmployeeSchema,
  getEmployeesQuerySchema,
  updateEmployeeSchema,
};
