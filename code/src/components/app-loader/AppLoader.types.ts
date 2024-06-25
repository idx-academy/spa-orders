import { CircularProgressProps } from "@mui/material/CircularProgress";

export type AppLoaderVariants =
  | "contained"
  | "danger"
  | "light"
  | "dark"
  | "disabled";

export type AppLoaderSizes = "small" | "medium" | "large" | "extra-large";

export type AppLoaderProps = Omit<CircularProgressProps, "variant"> & {
  variant?: AppLoaderVariants;
  size?: AppLoaderSizes;
};
