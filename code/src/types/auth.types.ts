import { User, UserDetails } from "@/types/user.types";

type Password = {
  password: string;
};

export type SignUpCredentials = Pick<User, "email" | "firstName" | "lastName"> &
  Password;

export type SignInCredentials = Pick<User, "email"> & Password;

export type SignUpResponse = UserDetails;
export type SignInResponse = UserDetails;
