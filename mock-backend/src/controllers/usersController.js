const mockedUsers = require("../data/mockedUsers");
const { parsePageable } = require("../utils/parsePageable");

const getAllUsers = (req, res) => {
  const { size, skip, limit } = parsePageable(req);
  const users = mockedUsers.content;
  const slicedUsersContent = users.slice(skip, limit);

  res.json({
    content: slicedUsersContent,
    totalPages: Math.ceil(users.length / size),
    totalElements: users.length,
  });
};

module.exports = { getAllUsers };
