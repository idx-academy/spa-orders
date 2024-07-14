import { ChangeEvent } from "react";

import { SliderProps } from "@mui/material/Slider";

type AppRangeClassNames = {
  root: string;
  range: string;
  toolbar: string;
  toolbarInput: string;
};

export type AppRangeSliderProps = Omit<
  SliderProps,
  "className" | "value" | "onChange"
> & {
  className?: Partial<AppRangeClassNames>;
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
