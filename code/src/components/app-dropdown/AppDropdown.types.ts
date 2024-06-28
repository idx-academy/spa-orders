import { MouseEvent, ReactNode } from "react";

export type OptionType = {
  value: string;
  label: ReactNode;
};

export type AppDropdownProps = {
  options: OptionType[];
  onSelect: (value: string) => void;
  defaultLabel?: ReactNode;
  className?: string;
};

export type AppDropdownOptionsProps = {
  options: OptionType[];
  handleOptionClick: (
    event: MouseEvent,
    value: string,
    label: ReactNode
  ) => void;
};
