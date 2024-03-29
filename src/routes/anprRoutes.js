const express = require("express");
const router = express.Router();
const anprControllers = require("../controllers/anprControllers");

router.get(
  "/get-vehicle-visit-report",
  anprControllers.getDetailedVehicleVisitReport
);
router.post(
  "/create-detailed-vehicle-visit",
  anprControllers.createDetailedVehicleVisit
);
router.post("/create-gate", anprControllers.createGate);

module.exports = router;
