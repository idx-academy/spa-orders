import { BadgeProps } from "@mui/material/Badge";

export type AppBadgeColorVariant = "contained" | "dark" | "danger" | "light";

export type AppBadgeSizeVariant = "small" | "medium" | "large" | "extra-large";

export type AppBadgeProps = Omit<BadgeProps, "color" | "variant"> & {
  color?: AppBadgeColorVariant;
  size?: AppBadgeSizeVariant;
  isRounded?: boolean;
};
