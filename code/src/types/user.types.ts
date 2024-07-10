import { ROLES } from "@/constants/common";
import { ExtractValues } from "@/types/common";

export type UserRole = ExtractValues<typeof ROLES>;

type BaseUser = {
  id: number;
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
