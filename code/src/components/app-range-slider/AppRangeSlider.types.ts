import { ChangeEvent } from "react";

import { SliderProps } from "@mui/material/Slider";

type AppRangeClassName = "root" | "range" | "toolbar" | "toolbarInput";
type AppRangeClassNames = Partial<Record<AppRangeClassName, string>>;

export type AppRangeSliderProps = Omit<
  SliderProps,
  "className" | "value" | "onChange"
> & {
  className?: AppRangeClassNames;
  value?: number[];
  onChange?: (event: Event, value: number[], activeThumb?: number) => void;
};

export type RangeInputProps = Pick<
  AppRangeSliderProps,
  "min" | "max" | "step"
> & {
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
