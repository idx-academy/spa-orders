const express = require("express");
const { addToCart, removeFromCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/users/:userId/cart/:productId", addToCart);
router.delete("/users/:userId/cart/items/:productId", removeFromCart);

module.exports = router;
