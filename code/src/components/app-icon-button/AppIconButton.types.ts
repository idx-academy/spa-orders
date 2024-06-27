import { LinkProps as ReactRouterDomLinkProps } from "react-router-dom";
import { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { IconButtonProps } from "@mui/material/IconButton";

export type AppIconButtonProps = IconButtonProps &
  MuiLinkProps &
  Partial<ReactRouterDomLinkProps>;
