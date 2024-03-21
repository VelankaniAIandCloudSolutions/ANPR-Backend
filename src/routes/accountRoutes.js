const express = require("express");
const router = express.Router();
const accountControllers = require("../controllers/accountControllers");

router.get("/get-companies", accountControllers.getCompanies);

module.exports = router;
