import Badge from "@mui/material/Badge";
import { AppBadgeProps } from "@/components/app-badge/AppBadge.types";
import cn from "@/utils/cn";

import "@/components/app-badge/AppBadge.scss";

const AppBadge = ({
  className,
  isRounded = true,
  size = "medium",
  color = "contained",
  ...props
}: AppBadgeProps) => {
  return (
    <Badge
      className={cn(
        "spa-badge",
        `spa-badge__${color}`,
        !isRounded && "spa-badge__no-rounded",
        `spa-badge__${size}`,
        className
      )}
      {...props}
    />
  );
};

export default AppBadge;
