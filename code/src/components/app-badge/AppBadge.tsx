import Badge from "@mui/material/Badge";
import { AppBadgeProps } from "@/components/app-badge/AppBadge.types";
import cn from "@/utils/cn";

import "@/components/app-badge/AppBadge.scss";

const AppBadge = ({
  className,
  isRounded = true,
  size = "medium",
  color = "contained",
  children,
  ...props
}: AppBadgeProps) => {
  return (
    <Badge
      className={cn(
        "spa-badge",
        `spa-badge__${color}`,
        `spa-badge__${size}`,
        !isRounded && "spa-badge__no-rounded",
        !children && "spa-badge__no-children",
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  );
};

export default AppBadge;
