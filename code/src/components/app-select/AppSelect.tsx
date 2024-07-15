import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import { AppSelectProps } from "@/components/app-select/AppSelect.types";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/components/app-select/AppSelect.scss";

const AppSelect = ({
  label,
  color = "contained",
  ...props
}: AppSelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        className={cn("spa-select__label", `spa-select__label--${color}`)}
        id={`spa-select-label-${label}`}
      >
        <AppTypography translationKey={label} />
      </InputLabel>
      <Select
        className={cn("spa-select", `spa-select--${color}`)}
        labelId={`spa-select-label-${label}`}
        id={`spa-select-${label}`}
        label={label}
        {...props}
      />
    </FormControl>
  );
};

export default AppSelect;
