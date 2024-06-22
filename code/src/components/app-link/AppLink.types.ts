import {
  NavLinkProps,
  LinkProps as ReactRouterLinkProps
} from "react-router-dom";
import { LinkProps as MuiLinkProps } from "@mui/material/Link";

// Used from react-router-dom
export type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

export type LinkVariant = "default" | "colored" | "underlined";

type BaseProps = {
  variant?: LinkVariant;
};

export type AppLinkProps = Omit<MuiLinkProps, "variant" | "component"> &
  BaseProps &
  (
    | ({ isNavLink: true } & NavLinkProps)
    | ({ isNavLink?: false } & ReactRouterLinkProps)
  );
