const { userOrders, adminOrders } = require("../data/mokedOrders");

const getUserOrders = (req, res) => {
  res.json(userOrders);
};

const getAdminOrders = (req, res) => {
  res.json(adminOrders);
};

module.exports = { getUserOrders, getAdminOrders };
