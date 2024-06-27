import { ButtonProps } from "@mui/material/Button";

type ButtonVariant =
  | "contained"
  | "outlined"
  | "text"
  | "danger"
  | "light"
  | "dark"
  | "shadow";
type ButtonSize = "small" | "medium" | "large" | "extra-large";

export type AppButtonProps = Omit<ButtonProps, "variant" | "size"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};
