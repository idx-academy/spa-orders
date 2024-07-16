const express = require("express");
const {
  getAdminOrders,
  getUserOrders,
  createOrder,
} = require("../controllers/orderConroller");

const router = express.Router();

router.get("/users/:userId/orders", getUserOrders);
router.get("/management/orders", getAdminOrders);
router.post("/users/:userId/orders", createOrder);

module.exports = router;
