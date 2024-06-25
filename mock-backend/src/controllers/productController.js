const products = require("../data/mokedData");

const getAllProducts = (req, res) => {
  res.json(products);
};

module.exports = { getAllProducts };
