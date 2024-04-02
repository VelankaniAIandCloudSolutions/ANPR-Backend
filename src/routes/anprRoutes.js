const express = require("express");
const router = express.Router();
const anprControllers = require("../controllers/anprControllers");
const upload = require("../middlewares/s3UploadMiddleware");

router.post(
  "/get-vehicle-visit-report",
  upload.none(),
  anprControllers.getDetailedVehicleVisitReport
);
router.post(
  "/create-detailed-vehicle-visit",
  upload.none(),
  anprControllers.createDetailedVehicleVisit
);
router.post(
  "/create-visit-image",
  upload.single("image"),
  anprControllers.createVisitImage
);
router.post("/create-gate", upload.none(), anprControllers.createGate);

module.exports = router;
