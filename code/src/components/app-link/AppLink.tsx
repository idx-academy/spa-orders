import { forwardRef } from "react";
import {
  Link as ReactRouterDomLink,
  NavLink,
  NavLinkProps
} from "react-router-dom";
import MuiLink from "@mui/material/Link";
import {
  AppLinkProps,
  NavLinkRenderProps
} from "@/components/app-link/AppLink.types";
import cn from "@/utils/cn/cn";

import "@/components/app-link/AppLink.scss";

const NavLinkWrapper = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, ...props }, ref) => {
    const classNameCallback = ({ isActive }: NavLinkRenderProps) =>
      cn(className, isActive && "spa-link--active");
    return <NavLink ref={ref} className={classNameCallback} {...props} />;
  }
);

NavLinkWrapper.displayName = "NavLinkWrapper";

const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ variant = "default", isNavLink = false, className, ...props }, ref) => {
    const component = isNavLink ? NavLinkWrapper : ReactRouterDomLink;
    return (
      <MuiLink
        component={component}
        className={cn("spa-link", `spa-link__${variant}`, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

AppLink.displayName = "AppLink";

export default AppLink;
