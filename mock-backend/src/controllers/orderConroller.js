const orders = require("../data/mokedOrders");

const getAllOrders = (req, res) => {
  res.json(orders);
};

module.exports = { getAllOrders };
