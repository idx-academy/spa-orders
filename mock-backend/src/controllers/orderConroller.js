const { userOrders, adminOrders } = require("../data/mokedOrders");
const wait = require("../utils/wait");

const getUserOrders = (req, res) => {
  res.json(userOrders);
};

const getAdminOrders = (req, res) => {
  const {
    deliveryMethods,
    statuses,
    totalMore,
    totalLess,
    createdBefore,
    createdAfter,
    isPaid,
  } = req.query;

  const filteredOrders = {
    ...adminOrders,
    content: adminOrders.content.filter((item) => {
      if (isPaid !== undefined && item.isPaid !== Boolean(isPaid)) {
        return false;
      }

      const createdAtDate = new Date(item.createdAt);
      const createdBeforeDate = new Date(createdBefore);
      const createdAfterDate = new Date(createdAfter);

      if (
        createdBefore !== undefined &&
        createdAfter !== undefined &&
        (createdAtDate > createdBeforeDate || createdAtDate < createdAfterDate)
      ) {
        return false;
      }

      if (
        totalLess !== undefined &&
        totalMore !== undefined &&
        (item.total > Number(totalLess) || item.total < Number(totalMore))
      ) {
        return false;
      }

      if (statuses !== undefined && !statuses.includes(item.orderStatus)) {
        return false;
      }

      if (
        deliveryMethods !== undefined &&
        !deliveryMethods.includes(item.postAddress.deliveryMethod)
      ) {
        return false;
      }

      return true;
    }),
  };

  res.json(filteredOrders);
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

  await wait(1000);

  res.json(newOrder.id);
};

module.exports = { getUserOrders, getAdminOrders, createOrder, changeOrderStatus };
