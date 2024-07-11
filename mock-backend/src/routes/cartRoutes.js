const express = require("express");
const { addToCart, removeFromCart, getCartItems } = require("../controllers/cartController");

const router = express.Router();

router.post("/users/:userId/cart/:productId", addToCart);
router.delete("/users/:userId/cart/items/:productId", removeFromCart);
router.get("/users/:userId/cart/items", getCartItems);

module.exports = router;
