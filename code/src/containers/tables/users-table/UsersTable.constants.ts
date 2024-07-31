import { ROLES, USER_STATUSES } from "@/constants/common";
import { ExtendedUserDetails } from "@/types/user.types";

export const usersTableColumns = [
  "usersTable.columns.name",
  "usersTable.columns.email",
  "usersTable.columns.role",
  "usersTable.columns.createdAt",
  "usersTable.columns.status"
];

export const mockUser: ExtendedUserDetails = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  role: ROLES.ADMIN,
  email: "johndoe@gmail.com",
  createdAt: "2021-01-01",
  status: USER_STATUSES.ACTIVE
};
