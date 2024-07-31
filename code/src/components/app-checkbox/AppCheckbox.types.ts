import { ReactNode } from "react";

import { FormControlLabelProps } from "@mui/material/FormControlLabel";

export type AppCheckboxVariant = "contained" | "dark" | "success";

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
    | { labelTranslationKey?: string; label?: never }
  );
