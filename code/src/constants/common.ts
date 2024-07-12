export const LOCAL_STORAGE_KEYS = {
  userDetails: "spa-user-details",
  localCart: "spa-local-cart"
} as const;

// status code (key) - translation key (value)
export const ERROR_MESSAGES_BY_STATUS_CODE = {
  400: "errors.badRequest",
  401: "errors.unauthorized",
  409: "errors.conflict"
} as const;

export const ROLES = {
  USER: "ROLE_USER",
  SHOP_MANAGER: "ROLE_MANAGER",
  ADMIN: "ROLE_ADMIN"
} as const;
