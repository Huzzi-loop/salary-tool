const express = require("express");
const router = express.Router();

const employeeController = require("./employee.controller");

router.post("/", employeeController.createEmployee);

module.exports = router;
