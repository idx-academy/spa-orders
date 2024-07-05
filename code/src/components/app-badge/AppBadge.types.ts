import { BadgeProps } from "@mui/material/Badge";

export type AppBadgeColorVariant =
  | "contained"
  | "dark"
  | "danger"
  | "light"
  | "success"
  | "pending"
  | "info";

export type AppBadgeSizeVariant = "small" | "medium" | "large" | "extra-large";

export type AppBadgeProps = Omit<BadgeProps, "color" | "variant"> & {
  variant?: AppBadgeColorVariant;
  size?: AppBadgeSizeVariant;
  isRounded?: boolean;
};
