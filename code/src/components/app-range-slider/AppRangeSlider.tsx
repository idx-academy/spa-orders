import { ChangeEvent } from "react";

import Slider from "@mui/material/Slider";

import AppBox from "@/components/app-box/AppBox";
import AppInput from "@/components/app-input/AppInput";
import { AppRangeSliderProps } from "@/components/app-range-slider/AppRangeSlider.types";
import parseRangeValues from "@/components/app-range-slider/utils/parse-range-values/parseRangeValues";
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
  const rangeStart = value?.[0].toString() ?? "";
  const rangeEnd = value?.[1].toString() ?? "";

  const { sliderRange, inputData } = parseRangeValues({
    rangeStart,
    rangeEnd,
    min,
    max
  });

  const updateWithValue = (value: Array<string | number>) => {
    onChange?.(value as number[]);
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    updateWithValue(value as number[]);
  };

  const handleRangeStartChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateWithValue([event.target.value, rangeEnd]);
  };

  const handleRangeEndChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateWithValue([rangeStart, event.target.value]);
  };

  const isRangeStartInputInvalid = !inputData.start.isValid;
  const isRangeEndInputInvalid = !inputData.end.isValid;

  return (
    <AppBox className={cn("spa-range-slider", className?.root)}>
      <AppBox className={cn("spa-range-slider__toolbar", className?.toolbar)}>
        <AppTypography variant="caption" translationKey="filters.from" />
        <AppInput
          fullWidth
          type="number"
          className={cn(className?.toolbarInput)}
          inputProps={{
            step,
            "data-testid": "range-start",
            "data-cy": "price-range-from"
          }}
          value={inputData.start.value}
          error={isRangeStartInputInvalid}
          color={isRangeStartInputInvalid ? "danger" : undefined}
          onChange={handleRangeStartChange}
          placeholder={min.toString()}
        />
        <AppTypography variant="caption" translationKey="filters.to" />
        <AppInput
          fullWidth
          type="number"
          className={cn(className?.toolbarInput)}
          inputProps={{
            step,
            "data-testid": "range-end",
            "data-cy": "price-range-to"
          }}
          value={inputData.end.value}
          error={isRangeEndInputInvalid}
          color={isRangeEndInputInvalid ? "danger" : undefined}
          onChange={handleRangeEndChange}
          placeholder={max.toString()}
        />
      </AppBox>
      <Slider
        data-testid="range-slider"
        className={cn("spa-range-slider__range", className?.range)}
        value={sliderRange}
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
