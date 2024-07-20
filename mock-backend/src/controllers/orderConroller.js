const { userOrders, adminOrders } = require("../data/mokedOrders");
const wait = require("../utils/wait");
<<<<<<< HEAD
const { filterOrders } = require("../utils/filterUtils");
=======
const { sortOrders } = require("../utils/sortUtils");
>>>>>>> 837bfaf (back sort)

const getUserOrders = (req, res) => {
  res.json(userOrders);
};

const getAdminOrders = (req, res) => {
<<<<<<< HEAD
  const filteredOrders = filterOrders(adminOrders, req.query);
  res.json(filteredOrders);
=======
  const { sort } = req.query.sort;

  let sortedAdminOrders = sort ? sortOrders(adminOrders, sort) : adminOrders;

  res.json(sortedAdminOrders);
>>>>>>> 837bfaf (back sort)
};

const changeOrderStatus = (req, res) => {
  return res.json();
};

const createOrder = async (req, res) => {
  const { body } = req;
  const newOrder = {
    id: Date.now(),
    ...body,
  };

  await wait(1000);

  res.json(newOrder.id);
};

module.exports = {
  getUserOrders,
  getAdminOrders,
  createOrder,
  changeOrderStatus,
};
