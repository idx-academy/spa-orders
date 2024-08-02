import { ROLES, USER_STATUSES } from "@/constants/common";
import { ExtractValues, PageableResponse } from "@/types/common";

export type UserRole = ExtractValues<typeof ROLES>;
export type UserStatus = ExtractValues<typeof USER_STATUSES>;

export type UserId = number;

type BaseUser = {
  id: UserId;
  firstName: string;
  lastName: string;
};
export type User = BaseUser & {
  role: UserRole;
  email: string;
};

export type UserFromServer = BaseUser & {
  sub: string;
  scope: UserRole;
};

export type TokenPayload = {
  token: string;
};

export type UserDetails = User & TokenPayload;

export type ExtendedUserDetails = User & {
  status: UserStatus;
  createdAt: string;
};

export type GetUsersForAdminResponse = PageableResponse<ExtendedUserDetails[]>;
