import { SelectProps } from "@mui/material/Select";

type AppSelectColoVariants =
  | "contained"
  | "success"
  | "danger"
  | "light"
  | "dark";

export type AppSelectProps = Omit<SelectProps, "color" | "label"> & {
  label: string;
  color?: AppSelectColoVariants;
};
