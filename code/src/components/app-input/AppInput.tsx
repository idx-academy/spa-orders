import { forwardRef } from "react";

import TextField from "@mui/material/TextField";

import { AppInputProps } from "@/components/app-input/AppInput.types";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/components/app-input/AppInput.scss";

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ labelTranslationKey, color = "contained", className, ...props }, ref) => {
    const translatedLabel = labelTranslationKey ? (
      <AppTypography translationKey={labelTranslationKey} />
    ) : undefined;

    return (
      <TextField
        size="small"
        label={translatedLabel}
        className={cn("spa-input", `spa-input--${color}`, className)}
        inputRef={ref}
        {...props}
      />
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;
