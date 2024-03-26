const express = require("express");
const router = express.Router();
const anprControllers = require("../controllers/anprControllers");

router.get("/get-vehicle-visit-report", anprControllers.getVehicleVisitReport);

module.exports = router;
