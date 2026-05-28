const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./modules/employee/employee.route");
const analyticsRoutes = require("./modules/analytics/analytics.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/employee", employeeRoutes);
app.use("/analytics", analyticsRoutes);

module.exports = app;
