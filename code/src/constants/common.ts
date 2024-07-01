export const LOCAL_STORAGE_KEYS = {
  userDetails: "spa-user-details"
} as const;

// @TODO: rewrite with translations
export const ERROR_MESSAGES_BY_STATUS = {
  400: "Invalid input data. Please check it and try again",
  401: "User is not authorized to perform this action",
  409: "Already exists"
} as const;

export const ROLES = {
  USER: "ROLE_USER",
  SHOP_MANAGER: "ROLE_SHOP_MANAGER",
  ADMIN: "ROLE_ADMIN"
} as const;
