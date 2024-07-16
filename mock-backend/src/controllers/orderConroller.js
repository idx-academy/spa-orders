const { userOrders, adminOrders } = require("../data/mokedOrders");
const wait = require("../utils/wait");

const getUserOrders = (req, res) => {
  res.json(userOrders);
};

const getAdminOrders = (req, res) => {
  res.json(adminOrders);
};

const changeOrderStatus = (req, res) => {
  return res.json();  
}

const createOrder = async (req, res) => {
  const { body } = req;
  const newOrder = {
    id: Date.now(),
    ...body,
  };

  await  wait(1000)

  res.json(newOrder.id);
};

module.exports = { getUserOrders, getAdminOrders, createOrder, changeOrderStatus };
