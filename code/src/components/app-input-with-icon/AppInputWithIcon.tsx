import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

import AppIconButton from "@/components/app-icon-button/AppIconButton";
import { InputWithIconProps } from "@/components/app-input-with-icon/AppInputWithIcon.types";

import cn from "@/utils/cn/cn";

import "@/components/app-input-with-icon/AppInputWithIcon.scss";

const AppInputWithIcon = ({
  onSearch,
  onClear,
  value,
  className,
  ...props
}: InputWithIconProps) => {
  return (
    <Paper className="spa-search-input">
      <InputBase
        value={value}
        className={cn("spa-search-input__text-field", className)}
        {...props}
      />

      <AppIconButton
        onClick={onClear}
        className={!value ? "spa-search-input__clear-icon" : undefined}
      >
        <ClearIcon fontSize="small" />
      </AppIconButton>
      <AppIconButton
        onClick={onSearch}
        size="small"
        className="spa-search-input__search-icon"
      >
        <SearchIcon />
      </AppIconButton>
    </Paper>
  );
};

export default AppInputWithIcon;
