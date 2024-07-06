import { forwardRef } from "react";

import TextField from "@mui/material/TextField";

import AppBox from "@/components/app-box/AppBox";
import { AppInputProps } from "@/components/app-input/AppInput.types";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/components/app-input/AppInput.scss";

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ labelTranslationKey, ...props }, ref) => {
    const translatedLabel = labelTranslationKey ? (
      <AppTypography translationKey={labelTranslationKey} />
    ) : undefined;

    return (
      <AppBox>
        <TextField
          size="small"
          label={translatedLabel}
          className="spa-app-input__textfield"
          inputRef={ref}
          {...props}
        />
      </AppBox>
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;
