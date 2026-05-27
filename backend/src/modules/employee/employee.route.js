const express = require("express");
const router = express.Router();

const employeeController = require("./employee.controller");

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getEmployees);

module.exports = router;
