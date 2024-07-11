import { LinkProps as ReactRouterDomLinkProps } from "react-router-dom";

import { IconButtonProps } from "@mui/material/IconButton";
import { LinkProps as MuiLinkProps } from "@mui/material/Link";

export type AppIconButtonProps = IconButtonProps &
  MuiLinkProps &
  Partial<ReactRouterDomLinkProps>;
