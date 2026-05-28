const Joi = require("joi");

const getSalaryStatsQuerySchema = Joi.object({
  country: Joi.string().trim().optional(),
  department: Joi.string().trim().optional(),
});

module.exports = {
  getSalaryStatsQuerySchema,
};
