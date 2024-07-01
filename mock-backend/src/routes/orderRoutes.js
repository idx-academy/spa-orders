const express = require("express");
const { getAllOrders } = require("../controllers/orderConroller");

const router = express.Router();

router.get("/orders/user/:userId", getAllOrders);

module.exports = router;
