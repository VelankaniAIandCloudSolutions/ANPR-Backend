const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.get("/get-orders", ordersController.getOrders);

module.exports = router;
