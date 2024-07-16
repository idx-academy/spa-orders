const { userOrders, adminOrders } = require("../data/mokedOrders");

const getUserOrders = (req, res) => {
  res.json(userOrders);
};

const getAdminOrders = (req, res) => {
  res.json(adminOrders);
};

const createOrder = (req, res) => {
  const { body } = req;
  const newOrder = {
    id: Math.floor(Math.random() * 1000),
    ...body,
  };

  setTimeout(() => {
    res.json(newOrder.id);
  }, 1000);
};

module.exports = { getUserOrders, getAdminOrders, createOrder };
