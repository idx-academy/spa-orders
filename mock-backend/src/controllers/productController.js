const products = require("../data/mokedData");

const itemsPerPage = 4;

const validatePage = (page) => (page && !Number.isNaN(page) ? Number(page) : 1);

const getAllProducts = (req, res) => {
  const page = validatePage(req.query.page);

  const skip = (page - 1) * itemsPerPage;
  const limit = page * itemsPerPage;

  const slicedProducts = products.slice(skip, limit);

  const response = {
    items: slicedProducts,
    pagesCount: Math.ceil(products.length / itemsPerPage)
  };

  res.json(response);
};

module.exports = { getAllProducts };
