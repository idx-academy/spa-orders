import { ButtonProps } from "@mui/material/Button";
import { LinkProps, NavLinkProps, To } from "react-router-dom";

type ButtonVariant =
  | "contained"
  | "outlined"
  | "text"
  | "danger"
  | "light"
  | "dark"
  | "shadow";
type ButtonSize = "small" | "medium" | "large" | "extra-large";

type AppButtonBaseProps = Omit<ButtonProps, "variant" | "size"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

export type AppButtonProps = AppButtonBaseProps &
  (
    | ({ isNavLink: true } & NavLinkProps)
    | ({ isNavLink: false } & LinkProps)
    | { isNavLink?: boolean; to?: To }
  );
