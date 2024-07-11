import {
  NavLinkProps,
  LinkProps as ReactRouterDomLinkProps
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

export type AppLinkWithNavLinkProps =
  | ({ isNavLink: true } & NavLinkProps)
  | ({ isNavLink?: false } & ReactRouterDomLinkProps);

export type AppLinkProps = Omit<MuiLinkProps, "variant" | "component"> &
  BaseProps &
  AppLinkWithNavLinkProps;
