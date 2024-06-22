import { Link, LinkProps as ReactRouterDomLinkProps } from "react-router-dom";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import "@/components/app-link/AppLink.scss";

type LinkVariant = "default" | "colored" | "underlined";

type AppLinkProps = ReactRouterDomLinkProps &
  Omit<MuiLinkProps, "variant" | "component"> & {
    variant?: LinkVariant;
  };

const AppLink = ({
  variant = "default",
  className,
  ...props
}: AppLinkProps) => {
  return (
    <MuiLink
      className={`spa-link spa-link__${variant} ${className}`}
      component={Link}
      {...props}
    />
  );
};

export default AppLink;
