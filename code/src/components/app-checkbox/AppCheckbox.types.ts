import { FormControlLabelProps } from "@mui/material/FormControlLabel";

export type AppCheckboxVariant = "contained" | "dark";

export type AppCheckboxProps = Omit<
  FormControlLabelProps,
  "control" | "label" | "variant"
> & {
  labelTranslationKey: string;
  variant?: AppCheckboxVariant;
};
