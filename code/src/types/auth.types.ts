import { TokenPayload } from "@/types/user.types";
import { SignInValidatorType } from "@/utils/validators/signInScheme";
import { SignUpValidatorType } from "@/utils/validators/signUpScheme";

export type SignUpCredentials = Omit<SignUpValidatorType, "confirmPassword">;

export type SignInCredentials = SignInValidatorType;

export type SignUpResponse = TokenPayload;
export type SignInResponse = TokenPayload;
