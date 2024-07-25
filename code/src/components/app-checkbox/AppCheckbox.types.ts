import { ReactNode } from "react";

import { FormControlLabelProps } from "@mui/material/FormControlLabel";

export type AppCheckboxVariant = "contained" | "dark";

export type AppCheckboxProps = Omit<
  FormControlLabelProps,
  "control" | "label" | "variant"
> & {
  variant?: AppCheckboxVariant;
  icon?: ReactNode;
  labelClassName?: string;
} & (
    | { labelTranslationKey: string; label?: never }
    | { labelTranslationKey?: never; label: ReactNode }
  );
