export const mockData = {};

export const httpStatusCode = {
  forbidden: 403,
  gatewayTimeout: 504,
  internalServerError: 500,
  notFound: 404,
  ok: 200,
} as const;

export const httpMethod = {
  get: "GET",
  post: "POST",
  put: "PUT",
} as const;