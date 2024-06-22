import Badge from "@mui/material/Badge";
import { AppBadgeProps } from "@/components/app-badge/AppBadge.types";

import "@/components/app-badge/AppBadge.scss";

const AppBadge = ({
  className,
  isRounded = true,
  size = "medium",
  color = "contained",
  ...props
}: AppBadgeProps) => {
  const roundVariant = isRounded ? "" : "spa-badge__no-rounded";

  return (
    <Badge
      max={10}
      className={`spa-badge spa-badge__${color} ${roundVariant} spa-badge__${size} ${className}`}
      {...props}
    />
  );
};

export default AppBadge;
