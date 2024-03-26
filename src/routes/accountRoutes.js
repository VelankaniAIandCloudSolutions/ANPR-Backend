const express = require("express");
const router = express.Router();
const accountControllers = require("../controllers/accountControllers");

router.post("/create-customer", accountControllers.createCustomer);

module.exports = router;
