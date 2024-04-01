const express = require("express");
const router = express.Router();
const anprControllers = require("../controllers/anprControllers");

router.post(
  "/get-vehicle-visit-report",
  anprControllers.getDetailedVehicleVisitReport
);
router.post(
  "/create-detailed-vehicle-visit",
  anprControllers.createDetailedVehicleVisit
);
router.post("/create-visit-image", anprControllers.createVisitImage);
router.post("/create-gate", anprControllers.createGate);

module.exports = router;
