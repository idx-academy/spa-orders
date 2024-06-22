import { LinkProps as ReactRouterDomLinkProps } from "react-router-dom";
import { LinkProps as MuiLinkProps } from "@mui/material/Link";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

type AppIconButtonProps = IconButtonProps &
  MuiLinkProps &
  Partial<ReactRouterDomLinkProps>;

const AppIconButton = (props: AppIconButtonProps) => {
  return <IconButton {...props} />;
};

export default AppIconButton;
