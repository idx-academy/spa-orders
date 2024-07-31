const mockedUsers = require("../data/mockedUsers");

const getAllUsers = (req, res) => {
  res.json(mockedUsers);
};

module.exports = { getAllUsers };
