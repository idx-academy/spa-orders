import { ROLES } from "@/constants/common";

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type UserDetails = User & {
  token: string;
};
