const { managerProducts, managerProduct } = require("../data/managerProducts");
const products = require("../data/mokedData");
const { sortProducts } = require("../utils/sortUtils");

const validateNumberQueryParam = (value, defaultValue = 0) => {
  return !isNaN(value) && Number(value) >= 0 ? Number(value) : defaultValue;
};

const getAllProducts = (req, res) => {
  const page = validateNumberQueryParam(req.query.page);
  const size = validateNumberQueryParam(req.query.size, 10);
  const { sort } = req.query;

  let sortedProducts = sort ? sortProducts(products, sort) : products;
  const skip = page * size;
  const limit = (page + 1) * size;

  const slicedProducts = sortedProducts.slice(skip, limit);

  const response = {
    content: slicedProducts,
    totalPages: Math.ceil(products.length / size),
    totalElements: products.length,
  };

  res.json(response);
};

const getProductById = (req, res) => {
  // @TODO: add lang param usage
  const { productId } = req.params;
  const product = products.find((product) => product.id === productId);

  if (!product) {
    res.status(404).json({ status: 404, message: "Product not found" });
    return;
  }

  const transformedProduct = {
    image: product.image,
    quantity: 10,
    price: product.price,
    tags: product.tags,
    name: product.name,
    description: product.description,
  };

  res.json(transformedProduct);
};

const getAllManagerProducts = (req, res) => {
  res.json(managerProducts);
};

const createProduct = (req, res) => {
  res.status(201).json();
};

const getProductByIdForManager = (req, res) => {
  return res.json(managerProduct)
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  getAllManagerProducts,
  getProductByIdForManager
};
