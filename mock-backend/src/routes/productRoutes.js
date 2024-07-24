const express = require("express");
const {
  getAllProducts,
  getAllManagerProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/management/products", getAllManagerProducts);

module.exports = router;
