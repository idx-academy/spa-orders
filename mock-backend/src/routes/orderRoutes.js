const express = require("express");
const {
  getAdminOrders,
  getUserOrders,
  createOrder,
  changeOrderStatus,
  getAdminOrderById,
} = require("../controllers/orderConroller");

const router = express.Router();

router.get("/users/:userId/orders", getUserOrders);
router.get("/management/orders", getAdminOrders);
router.post("/users/:userId/orders", createOrder);
router.patch("/orders/:orderId/status", changeOrderStatus);
router.get("/management/orders/:orderId", getAdminOrderById);

module.exports = router;
