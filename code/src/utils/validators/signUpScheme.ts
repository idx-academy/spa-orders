import { z } from "zod";

export const SignUpValidationScheme = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name is too short" })
      .max(50, { message: "First name is too long" })
      .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’-]+$/, {
        message: "Latin, Cyrillic, ', - allowed"
      }),
    lastName: z
      .string()
      .min(2, { message: "Last name is too short" })
      .max(50, { message: "Last name is too long" })
      .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'’-]+$/, {
        message: "Latin, Cyrillic, ', - allowed"
      }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
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
      }),
    confirmPassword: z
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
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

export type SignUpValidatorType = z.infer<typeof SignUpValidationScheme>;
