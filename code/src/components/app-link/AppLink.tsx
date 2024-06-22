import {
  Link as ReactRouterDomLink,
  NavLink,
  NavLinkProps
} from "react-router-dom";
import MuiLink from "@mui/material/Link";
import "@/components/app-link/AppLink.scss";
import { AppLinkProps, NavLinkRenderProps } from "./AppLink.types";
import { forwardRef } from "react";

const NavLinkWrapper = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, ...props }, ref) => {
    const classNameCallback = ({ isActive }: NavLinkRenderProps) =>
      `${className} ${isActive ? "spa-link--active" : ""}`;

    return <NavLink ref={ref} className={classNameCallback} {...props} />;
  }
);

NavLinkWrapper.displayName = "NavLinkWrapper";

const AppLink = ({
  variant = "default",
  isNavLink = false,
  ...props
}: AppLinkProps) => {
  const component = isNavLink ? NavLinkWrapper : ReactRouterDomLink;

  return (
    <MuiLink
      component={component}
      className={`spa-link spa-link__${variant}`}
      {...props}
    />
  );
};

export default AppLink;
