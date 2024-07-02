import { To } from "react-router-dom";
import { ButtonProps } from "@mui/material/Button";

import { AppLinkWithNavLinkProps } from "@/components/app-link/AppLink.types";

type ButtonVariant =
  | "contained"
  | "outlined"
  | "text"
  | "danger"
  | "light"
  | "dark"
  | "shadow";

type ButtonSize = "small" | "medium" | "large" | "extra-large";

type BaseProps = Omit<ButtonProps, "variant" | "size"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

export type AppButtonProps = BaseProps &
  (AppLinkWithNavLinkProps | { isNavLink?: boolean; to?: To });
