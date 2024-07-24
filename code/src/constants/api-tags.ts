export const rtkQueryTags = {
  CART: "CART",
  USER_ORDERS: "USER_ORDERS",
  ADMIN_ORDERS: "ADMIN_ORDERS",
  ADMIN_PRODUCTS: "ADMIN_PRODUCTS",
  PRODUCTS: "PRODUCTS"
} as const;

export const rtkQueryTagsArray = Object.values(rtkQueryTags);
