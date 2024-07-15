import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import AppBox from "@/components/app-box/AppBox";
import { AppCheckboxProps } from "@/components/app-checkbox/AppCheckbox.types";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/components/app-checkbox/AppCheckbox.scss";

const AppCheckbox = ({
  labelTranslationKey,
  label,
  icon,
  className,
  variant = "contained",
  ...props
}: AppCheckboxProps) => {
  const labelElement = labelTranslationKey ? (
    <AppTypography component="span" translationKey={labelTranslationKey} />
  ) : (
    label
  );

  return (
    <FormControlLabel
      className={cn("spa-checkbox", `spa-checkbox__${variant}`, className)}
      control={<Checkbox />}
      label={
        <AppBox className="spa-checkbox__label" component="span">
          {icon}
          {labelElement}
        </AppBox>
      }
      {...props}
    />
  );
};

export default AppCheckbox;
