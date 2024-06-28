import { useState, useRef, MouseEvent, FocusEvent, ReactNode } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import AppDropdownOptions from "@/components/app-dropdown/components/AppDropdownOptions";
import { AppDropdownProps } from "@/components/app-dropdown/AppDropdown.types";

import "@/components/app-dropdown/AppDropdown.scss";

const AppDropdown = ({
  options,
  onSelect,
  defaultLabel,
  className
}: AppDropdownProps) => {
  const selectedLabelValue = defaultLabel || options[0].label;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] =
    useState<ReactNode>(selectedLabelValue);
  const dropdownRef = useRef<HTMLElement>(null);

  const iconConditional = isOpen ? (
    <KeyboardArrowUpIcon fontSize="medium" />
  ) : (
    <KeyboardArrowDownIcon fontSize="medium" />
  );

  const handleSelect = (value: string, label: ReactNode) => {
    setSelectedLabel(label);
    setIsOpen(false);
    onSelect(value);
  };

  const handleToggleDropdownClick = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const handleOptionClick = (
    event: MouseEvent,
    value: string,
    label: ReactNode
  ) => {
    event.stopPropagation();
    handleSelect(value, label);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  const handleOpenDropdown = () => {
    return (
      isOpen && (
        <AppDropdownOptions
          handleOptionClick={handleOptionClick}
          options={options}
        />
      )
    );
  };

  return (
    <AppBox
      ref={dropdownRef}
      className={`app-dropdown ${className}`}
      onClick={handleToggleDropdownClick}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <AppBox component="span" className="app-dropdown__selected">
        <AppTypography translationKey="sortBy.label" />
        {selectedLabel}
        <AppBox component="span">{iconConditional}</AppBox>
      </AppBox>
      {handleOpenDropdown()}
    </AppBox>
  );
};

export default AppDropdown;
