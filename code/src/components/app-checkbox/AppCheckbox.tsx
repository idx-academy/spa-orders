import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { AppCheckboxProps } from "@/components/app-checkbox/AppCheckbox.types";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/components/app-checkbox/AppCheckbox.scss";

const AppCheckbox = ({
  labelTranslationKey,
  className,
  variant = "contained",
  ...props
}: AppCheckboxProps) => {
  return (
    <FormControlLabel
      className={cn("spa-checkbox", `spa-checkbox__${variant}`, className)}
      control={<Checkbox />}
      label={
        <AppTypography component="span" translationKey={labelTranslationKey} />
      }
      {...props}
    />
  );
};

export default AppCheckbox;
