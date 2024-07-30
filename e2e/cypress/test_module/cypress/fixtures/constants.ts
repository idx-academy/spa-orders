export const sortingNameParamMap = {
  Recommended: "recommended",
  Newest: "createdAt,desc",
  "Price (low to high)": "price,asc",
  "Price (high to low)": "price,desc",
  "Name A-Z": "name,asc",
  "Name Z-A": "name,desc"
};

export const orderDeliveryStatuses = {
  "In progress": "IN_PROGRESS",
  Shipped: "SHIPPED",
  Delivered: "DELIVERED",
  Canceled: "CANCELED",
  Completed: "COMPLETED"
} as const;

export const deliveryMethods = {
  "Nova Post": "NOVA",
  "Ukr Post": "UKRPOSHTA"
} as const;
