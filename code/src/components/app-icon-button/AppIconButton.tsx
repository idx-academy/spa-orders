import IconButton from "@mui/material/IconButton";

import { AppIconButtonProps } from "@/components/app-icon-button/AppIconButton.types";

import cn from "@/utils/cn/cn";

const AppIconButton = ({ className, ...props }: AppIconButtonProps) => {
  return <IconButton className={cn("spa-icon-button", className)} {...props} />;
};

export default AppIconButton;
