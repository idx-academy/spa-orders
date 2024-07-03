import { z } from "zod";

export const SignInVallidationScheme = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter"
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter"
    })
    .regex(/\d/, { message: "Password must contain at least one digit" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character"
    })
});

export type SignInValidatorType = z.infer<typeof SignInVallidationScheme>;
