import { TextFieldProps } from "@mui/material/TextField";

export type AppInputProps = Omit<TextFieldProps, "label" | "color"> & {
  labelTranslationKey?: string;
  color?: "contained" | "success" | "danger" | "light" | "dark";
};
