const express = require("express");
const router = express.Router();

const employeeController = require("./employee.controller");

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getEmployees);
router.put("/:id", employeeController.updateEmployee);

module.exports = router;
