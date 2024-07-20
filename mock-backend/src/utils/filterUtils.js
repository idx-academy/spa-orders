const filterOrders = (orders, filters) => {
  const {
    deliveryMethods,
    statuses,
    totalMore,
    totalLess,
    createdBefore,
    createdAfter,
    isPaid,
  } = filters;

  return {
    ...orders,
    content: orders.content.filter((item) => {
      const parsedIsPaid = isPaid === "true";

      if (isPaid !== undefined && item.isPaid !== parsedIsPaid) {
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
};

module.exports = { filterOrders };
