import { MouseEvent } from "react";

import AppBox from "@/components/app-box/AppBox";
import { AppDropdownOptionsProps } from "@/components/app-dropdown/AppDropdown.types";

import "@/components/app-dropdown/AppDropdown.scss";

const AppDropdownOptions = ({
  options,
  handleOptionClick
}: AppDropdownOptionsProps) => {
  return (
    <AppBox className="app-dropdown__options">
      {options.map((option) => (
        <AppBox
          key={option.value}
          className="app-dropdown__option"
          onClick={(event: MouseEvent) =>
            handleOptionClick(event, option.value, option.label)
          }
        >
          {option.label}
        </AppBox>
      ))}
    </AppBox>
  );
};

export default AppDropdownOptions;
