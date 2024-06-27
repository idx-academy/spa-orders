const products = require("../data/mokedData");

const ITEMS_PER_PAGE = 10;

const validatePage = (page) => (page && !Number.isNaN(page) ? Number(page) : 1);

const getAllProducts = (req, res) => {
  const page = validatePage(req.query.page);

  const skip = (page - 1) * ITEMS_PER_PAGE;
  const limit = page * ITEMS_PER_PAGE;

  const slicedProducts = products.slice(skip, limit);

  const response = {
    items: slicedProducts,
    pagesCount: Math.ceil(products.length / ITEMS_PER_PAGE),
    itemsCount: products.length
  };

  res.json(response);
};

module.exports = { getAllProducts };
