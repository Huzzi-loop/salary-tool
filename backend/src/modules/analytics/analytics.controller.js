const AnalyticsService = require("./analytics.service");
const analyticsRepository = require("./analytics.repository");
const { getSalaryStatsQuerySchema } = require("./analytics.validation");

const analyticsService = new AnalyticsService(analyticsRepository);

function getSalaryStats(req, res) {
  try {
    const { error, value } = getSalaryStatsQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const stats = analyticsService.getSalaryStats(value);

    return res.json(stats);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  getSalaryStats,
};
