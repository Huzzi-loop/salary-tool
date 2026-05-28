const express = require("express");
const router = express.Router();

const controller = require("./analytics.controller");

router.get("/salary", controller.getSalaryStats);

module.exports = router;
