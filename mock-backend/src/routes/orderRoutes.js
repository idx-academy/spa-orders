const express = require("express");
const {
  getAdminOrders,
  getUserOrders,
  createOrder,
  changeOrderStatus,
} = require("../controllers/orderConroller");

const router = express.Router();

router.get("/users/:userId/orders", getUserOrders);
router.get("/management/orders", getAdminOrders);
router.post("/users/:userId/orders", createOrder);
router.patch("/orders/:orderId/status", changeOrderStatus);

module.exports = router;
