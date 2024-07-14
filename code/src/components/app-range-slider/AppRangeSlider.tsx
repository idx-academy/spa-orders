import { ChangeEvent, useMemo, useState } from "react";

import Slider from "@mui/material/Slider";

import AppBox from "@/components/app-box/AppBox";
import AppInput from "@/components/app-input/AppInput";
import { AppRangeSliderProps } from "@/components/app-range-slider/AppRangeSlider.types";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/components/app-range-slider/AppRangeSlider.scss";

const AppRangeSlider = ({
  className,
  onChange,
  min = 0,
  max = 20000,
  step = 10,
  value,
  ...props
}: AppRangeSliderProps) => {
  const initialRangeStart = value?.[0] ?? min;
  const initialRangeEnd = value?.[1] ?? max

  const [rangeStart, setRangeStart] = useState(initialRangeStart);
  const [rangeEnd, setRangeEnd] = useState(initialRangeEnd);

  const commonRangeProps = useMemo(
    () => ({ min, max, step }),
    [min, max, step]
  );

  const handleRangeStartChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = parseInt(value);
    const limitedNewValue = Math.max(min, numericValue);

    // needed for typescript, we don't need to pass first parameter at all
    const typedEvent = event as unknown as Event;

    setRangeStart(limitedNewValue);
    onChange?.(typedEvent, [limitedNewValue, rangeEnd]);
  };

  const handleRangeEndChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = parseInt(value);
    const limitedNewValue = Math.min(max, numericValue);

    // needed for typescript, we don't need to pass first parameter at all
    const typedEvent = event as unknown as Event;

    setRangeEnd(limitedNewValue);
    onChange?.(typedEvent, [rangeStart, limitedNewValue]);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const typedNewValue = newValue as number[];

    setRangeStart(typedNewValue[0]);
    setRangeEnd(typedNewValue[1]);
    onChange?.(event, typedNewValue);
  };

  return (
    <AppBox className={cn("spa-range-slider", className?.root)}>
      <AppBox className={cn("spa-range-slider__toolbar", className?.toolbar)}>
        <AppTypography variant="caption" translationKey="filters.from" />
        <AppInput
          type="number"
          fullWidth
          value={rangeStart}
          onChange={handleRangeStartChange}
          className={cn(className?.toolbarInput)}
          inputProps={{ "data-testid": "range-start", ...commonRangeProps }}
        />
        <AppTypography variant="caption" translationKey="filters.to" />
        <AppInput
          type="number"
          fullWidth
          value={rangeEnd}
          onChange={handleRangeEndChange}
          className={cn(className?.toolbarInput)}
          inputProps={{ "data-testid": "range-end", ...commonRangeProps }}
        />
      </AppBox>
      <Slider
        data-testid="range-slider"
        className={cn("spa-range-slider__range", className?.range)}
        value={[rangeStart, rangeEnd]}
        onChange={handleSliderChange}
        {...commonRangeProps}
        {...props}
      />
    </AppBox>
  );
};

export default AppRangeSlider;
