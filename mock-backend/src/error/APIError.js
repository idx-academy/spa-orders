class APIError extends Error {
  constructor(message, status, title) {
    super(message);
    this.detail = message;
    this.title = title;
    this.status = status;
  }

  static BadRequest() {
    return new APIError(
      "Invalid Request. Please, check the data in the request (QueryString Parameters and/or Body).",
      400,
      "Bad Request"
    );
  }

  static Unauthorized() {
    return new APIError(
      "Unauthorized access to the resource",
      401,
      "Unauthorized"
    );
  }

  static Conflict() {
    return new APIError("The requested has conflict", 409, "Conflict");
  }
}

module.exports = APIError;
