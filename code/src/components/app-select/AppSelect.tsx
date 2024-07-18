import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import { AppSelectProps } from "@/components/app-select/AppSelect.types";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/components/app-select/AppSelect.scss";

const AppSelect = ({
  label,
  labelId,
  color = "contained",
  className,
  ...props
}: AppSelectProps) => {
  return (
    <FormControl>
      {label && (
        <InputLabel
          className={cn("spa-select__label", `spa-select__label--${color}`)}
          id={`spa-select-label-${labelId}`}
        >
          <AppTypography translationKey={label} />
        </InputLabel>
      )}
      <Select
        className={cn("spa-select", `spa-select--${color}`, className)}
        labelId={`spa-select-label-${labelId}`}
        id={`spa-select-${labelId}`}
        label={label}
        {...props}
      />
    </FormControl>
  );
};

export default AppSelect;
