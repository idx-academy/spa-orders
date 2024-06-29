const APIError = require("../error/APIError");

module.exports = (err, req, res, next) => {
  console.log(err);

  if (err instanceof APIError) {
    return res.status(err.status).json({
      status: err.status,
      title: err.title,
      detail: err.detail,
    });
  }

  return res.status(500).json({
    status: 500,
    title: "Internal server error",
    detail: "Internal server error",
  });
};
