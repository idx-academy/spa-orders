const createAPIError = (message, status, title) => {
  const error = new Error(message);
  error.status = status;
  error.title = title;
  error.detail = message;
  return error;
};

module.exports.createBadRequestError = () => {
  return createAPIError(
    "Invalid Request. Please, check the data in the request (QueryString Parameters and/or Body).",
    400,
    "Bad Request"
  );
};

module.exports.createUnauthorizedError = () => {
  return createAPIError(
    "Unauthorized access to the resource",
    401,
    "Unauthorized"
  );
};

module.exports.createConflictError = () => {
  return createAPIError("The requested has conflict", 409, "Conflict");
};
