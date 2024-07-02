import { UserDetails } from "@/types/user.types";
import { SignInVallidatorType } from "@/utils/validators/signInScheme";
import { SignUpValidatorType } from "@/utils/validators/signUpScheme";

export type SignUpCredentials = Omit<SignUpValidatorType, "confirmPassword">;

export type SignInCredentials = SignInVallidatorType;

export type SignUpResponse = UserDetails;
export type SignInResponse = UserDetails;
