import { FocusEvent, MouseEvent, ReactNode, useRef, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import AppBox from "@/components/app-box/AppBox";
import { AppDropdownProps } from "@/components/app-dropdown/AppDropdown.types";
import AppDropdownOptions from "@/components/app-dropdown/components/AppDropdownOptions";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

import "@/components/app-dropdown/AppDropdown.scss";

const AppDropdown = ({
  options,
  onSelect,
  defaultLabel,
  className,
  ...props
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
    if (
      !dropdownRef.current ||
      !dropdownRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  const dropdownContent = isOpen ? (
    <AppDropdownOptions
      handleOptionClick={handleOptionClick}
      options={options}
    />
  ) : null;

  return (
    <AppBox
      ref={dropdownRef}
      className={cn("app-dropdown", className)}
      onClick={handleToggleDropdownClick}
      onBlur={handleBlur}
      tabIndex={0}
      data-testid="app-dropdown"
      {...props}
    >
      <AppBox component="span" className="app-dropdown__selected">
        <AppTypography translationKey="sortBy.label" />
        {selectedLabel}
        {iconConditional}
      </AppBox>
      {dropdownContent}
    </AppBox>
  );
};

export default AppDropdown;
