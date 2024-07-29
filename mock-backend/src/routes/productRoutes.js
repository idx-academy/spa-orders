const express = require("express");
const {
  getAllProducts,
  getProductById,
  getAllManagerProducts,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.get("/management/products", getAllManagerProducts);
router.post("/management/products", createProduct);

module.exports = router;
