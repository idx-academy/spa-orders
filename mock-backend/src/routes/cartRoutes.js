const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCartItems,
  updateCartItemQuantity
} = require("../controllers/cartController");

const router = express.Router();

router.post("/users/:userId/cart/:productId", addToCart);
router.delete("/users/:userId/cart/items/:productId", removeFromCart);
router.get("/users/:userId/cart/items", getCartItems);
router.patch("/users/:userId/cart/:productId/setquantity", updateCartItemQuantity);

module.exports = router;
