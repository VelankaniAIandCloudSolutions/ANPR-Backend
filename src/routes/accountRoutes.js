const express = require("express");
const router = express.Router();
const accountControllers = require("../controllers/accountControllers");
const multer = require("multer");
const upload = multer();

router.post(
  "/create-customer",
  upload.none(),
  accountControllers.createCustomer
);
router.post("/create-company", upload.none(), accountControllers.createCompany);

module.exports = router;
