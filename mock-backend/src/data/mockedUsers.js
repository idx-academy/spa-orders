const mockedUsers = {
  content: [
    {
      id: 1,
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "ROLE_USER",
      status: "ACTIVE",
      createdAt: "2024-07-30T08:55:38.751Z",
    },
    {
      id: 2,
      email: "mhevyk@example.com",
      firstName: "Maksym",
      lastName: "Hevyk",
      role: "ROLE_ADMIN",
      status: "ACTIVE",
      createdAt: "2024-07-30T08:55:38.751Z",
    },
    {
      id: 3,
      email: "tymkiv@example.com",
      firstName: "Petro",
      lastName: "Tymkiv",
      role: "ROLE_MANAGER",
      status: "DEACTIVATED",
      createdAt: "2024-07-30T08:55:38.751Z",
    },
  ],
};
module.exports = mockedUsers;
