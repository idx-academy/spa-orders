const express = require("express");
const {
  getAllProducts,
  getAllManagerProducts,
  createProduct
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/management/products", getAllManagerProducts);
router.post("/management/products", createProduct);

module.exports = router;
