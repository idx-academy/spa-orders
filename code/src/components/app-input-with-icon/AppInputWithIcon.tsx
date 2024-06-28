import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import AppIconButton from "@/components/app-icon-button/AppIconButton";
import { InputWithIconProps } from "@/components/app-input-with-icon/AppInputWithIcon.types";

import cn from "@/utils/cn";

import "@/components/app-input-with-icon/AppInputWithIcon.scss";

const AppInputWithIcon = ({
  onSearch,
  onClear,
  value,
  ...props
}: InputWithIconProps) => {
  return (
    <Paper className="spa-search-input">
      <InputBase
        value={value}
        className="spa-search-input__text-field"
        {...props}
      />

      <AppIconButton
        onClick={onClear}
        className={!value ? "spa-search-input__clear-icon" : ""}
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
