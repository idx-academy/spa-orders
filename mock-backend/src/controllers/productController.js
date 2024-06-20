const products = require("../services/mokedData");

const getAllProducts = (req, res) => {
  res.json(products);
};

module.exports = { getAllProducts };
