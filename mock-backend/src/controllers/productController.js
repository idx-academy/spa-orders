const products = require("../data/mokedData");

const validateNumberQueryParam = (value, defaultValue = 0) => {
  return !isNaN(value) && Number(value) >= 0 ? Number(value) : defaultValue;
};

const getAllProducts = (req, res) => {
  const page = validateNumberQueryParam(req.query.page);
  const size = validateNumberQueryParam(req.query.size, 10);

  const skip = page * size;
  const limit = (page + 1) * size;

  const slicedProducts = products.slice(skip, limit);

  const response = {
    content: slicedProducts,
    totalPages: Math.ceil(products.length / size),
    totalItems: products.length
  };

  res.json(response);
};

module.exports = { getAllProducts };
