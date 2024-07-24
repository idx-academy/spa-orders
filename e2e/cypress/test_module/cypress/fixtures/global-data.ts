export const httpStatusCode = {
  forbidden: 403,
  gatewayTimeout: 504,
  internalServerError: 500,
  notFound: 404,
  ok: 200
} as const;

export const httpMethod = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE"
} as const;

export const ROLES = {
  USER: "ROLE_USER",
  SHOP_MANAGER: "ROLE_MANAGER",
  ADMIN: "ROLE_ADMIN"
} as const;

export const ERRORS = {
  somethingWentWrong: "Something went wrong. Please try again later"
} as const;

export const homePage = {
  headerSearchFieldClearIcon: '[data-testid="ClearIcon"]',
  headerShopingCartIcon: '[data-testid="ShoppingCartIcon"]',
  cartDrawerCloseIcon: '[data-testid="KeyboardArrowRightIcon"]',
  headerMenuList: '[data-testid="menu-item"]'
};
