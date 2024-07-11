const express = require("express");
const {
  getAdminOrders,
  getUserOrders,
} = require("../controllers/orderConroller");

const router = express.Router();

router.get("/users/:userId/orders", getUserOrders);
router.get("/management/orders", getAdminOrders);

module.exports = router;
