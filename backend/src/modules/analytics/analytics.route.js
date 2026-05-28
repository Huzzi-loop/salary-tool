const express = require("express");
const router = express.Router();
const AnalyticsService = require("./analytics.service");

router.get("/salary-distribution", async (req, res) => {
  try {
    const data = await AnalyticsService.getSalaryDistribution();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/department-comparison", async (req, res) => {
  try {
    const data = await AnalyticsService.getDepartmentComparison();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
