import { forwardRef, useId } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import { AppSelectProps } from "@/components/app-select/AppSelect.types";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/components/app-select/AppSelect.scss";

const AppSelect = forwardRef(
  (
    {
      label,
      color = "contained",
      className,
      fullWidth = false,
      ...props
    }: AppSelectProps,
    ref
  ) => {
    const labelId = useId();

    return (
      <FormControl fullWidth={fullWidth}>
        {label && (
          <InputLabel
            className={cn("spa-select__label", `spa-select__label--${color}`)}
            id={`spa-select-label-${labelId}`}
            data-testid="spa-select-label"
          >
            <AppTypography translationKey={label} />
          </InputLabel>
        )}
        <Select
          ref={ref}
          className={cn("spa-select", `spa-select--${color}`, className)}
          labelId={`spa-select-label-${labelId}`}
          id={`spa-select-${labelId}`}
          label={label}
          {...props}
        />
      </FormControl>
    );
  }
);

AppSelect.displayName = "AppSelect";

export default AppSelect;
