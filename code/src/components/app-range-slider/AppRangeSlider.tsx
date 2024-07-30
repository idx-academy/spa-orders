import { ChangeEvent } from "react";

import Slider from "@mui/material/Slider";

import AppBox from "@/components/app-box/AppBox";
import AppInput from "@/components/app-input/AppInput";
import { AppInputProps } from "@/components/app-input/AppInput.types";
import { AppRangeSliderProps } from "@/components/app-range-slider/AppRangeSlider.types";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/components/app-range-slider/AppRangeSlider.scss";

const AppRangeSlider = ({
  className,
  onChange,
  min = 0,
  max = 20000,
  step,
  value,
  ...props
}: AppRangeSliderProps) => {
  const rangeStart = value?.[0];
  const rangeEnd = value?.[1];
  const range = [rangeStart || min, rangeEnd || max];

  const checkValueValid = (value?: number) => {
    if (value === undefined) {
      return true;
    }

    return value < min || value > max;
  };

  const updateWithValue = (value: number[]) => {
    onChange?.(value);
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    updateWithValue(value as number[]);
  };

  const handleRangeStartChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateWithValue([parseInt(event.target.value), rangeEnd!]);
  };

  const handleRangeEndChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateWithValue([rangeStart!, parseInt(event.target.value)]);
  };

  const rangeStartInputValue = Number.isNaN(rangeStart) ? "" : rangeStart;
  const rangeEndInputValue = Number.isNaN(rangeEnd) ? "" : rangeEnd;

  const isRangeStartInvalid = checkValueValid(rangeStart);
  const isRangeEndInvalid = checkValueValid(rangeEnd);

  const commonInputProps = {
    type: "number",
    fullWidth: true,
    className: cn(className?.toolbarInput)
  } satisfies AppInputProps;

  return (
    <AppBox className={cn("spa-range-slider", className?.root)}>
      <AppBox className={cn("spa-range-slider__toolbar", className?.toolbar)}>
        <AppTypography variant="caption" translationKey="filters.from" />
        <AppInput
          {...commonInputProps}
          inputProps={{
            step,
            "data-testid": "range-start",
            "data-cy": "price-range-from"
          }}
          value={rangeStartInputValue}
          error={isRangeStartInvalid}
          color={isRangeStartInvalid ? "danger" : undefined}
          onChange={handleRangeStartChange}
          placeholder={min.toString()}
        />
        <AppTypography variant="caption" translationKey="filters.to" />
        <AppInput
          {...commonInputProps}
          inputProps={{
            step,
            "data-testid": "range-end",
            "data-cy": "price-range-to"
          }}
          value={rangeEndInputValue}
          error={isRangeEndInvalid}
          color={isRangeEndInvalid ? "danger" : undefined}
          onChange={handleRangeEndChange}
          placeholder={max.toString()}
        />
      </AppBox>
      <Slider
        data-testid="range-slider"
        className={cn("spa-range-slider__range", className?.range)}
        value={range}
        onChange={handleSliderChange}
        step={step}
        min={min}
        max={max}
        {...props}
      />
    </AppBox>
  );
};

export default AppRangeSlider;
