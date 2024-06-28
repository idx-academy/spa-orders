const products = require("../data/mokedData");

const validateNumberQueryParam = (value, defaultValue = 1) => {
  return isNaN(value) ? Number(value) : defaultValue;
};

const getAllProducts = (req, res) => {
  const page = validateNumberQueryParam(req.query.page);
  const itemsPerPage = validateNumberQueryParam(req.query.itemsPerPage, 10);

  const skip = (page - 1) * itemsPerPage;
  const limit = page * itemsPerPage;

  const slicedProducts = products.slice(skip, limit);

  const response = {
    items: slicedProducts,
    pagesCount: Math.ceil(products.length / itemsPerPage),
    itemsCount: products.length
  };

  res.json(response);
};

module.exports = { getAllProducts };
