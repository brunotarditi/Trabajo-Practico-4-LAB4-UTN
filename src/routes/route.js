const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/employee", controller.getEmployees);
router.get("/employee/:legajo", controller.getEmployeesXID);
router.post("/employee", controller.createEmployee);
router.put("/employee/:legajo", controller.updateEmployee);
router.delete("/employee/:legajo", controller.deleteEmployee);
module.exports = router;
