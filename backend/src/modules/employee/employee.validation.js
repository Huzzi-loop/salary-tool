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

module.exports = {
  createEmployeeSchema,
};
