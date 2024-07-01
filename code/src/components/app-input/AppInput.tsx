import TextField from "@mui/material/TextField";
import AppBox from "@/components/app-box/AppBox";
import { AppInputProps } from "@/components/app-input/AppInput.types";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/components/app-input/AppInput.scss";

const AppInput = ({ labelTranslationKey, ...props }: AppInputProps) => {
  const translatedLabel = labelTranslationKey ? (
    <AppTypography translationKey={labelTranslationKey} />
  ) : undefined;

  return (
    <AppBox>
      <TextField
        size="medium"
        label={translatedLabel}
        className="spa-app-input__textfield"
        {...props}
      />
    </AppBox>
  );
};

export default AppInput;
