export const LOCAL_STORAGE_KEYS = {
  userDetails: "spa-user-details"
} as const;

export const ERROR_MESSAGES_BY_STATUS = {
  400: "Invalid input data. Please check it and try again",
  401: "User is not authorized to perform this action",
  409: "Conflict occured"
} as const;
