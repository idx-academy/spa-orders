import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Paper } from "@mui/material";

import "@/components/app-search-input/AppSearchInput.scss";

import AppIconButton from "../app-icon-button/AppIconButton";
import { AppSearchInputProps } from "./AppSearchInput.types";

const AppSearchInput = ({
  onSearch,
  onClear,
  value,
  className,
  ...props
}: AppSearchInputProps) => {
  return (
    <Paper className="spa-search-input-field">
      <InputBase
        className="spa-search-input-field__input-base"
        value={value}
        {...props}
      />
      <AppIconButton aria-label="clear" onClick={onClear}>
        <ClearIcon fontSize="small" />
      </AppIconButton>
      <AppIconButton aria-label="search" onClick={onSearch}>
        <SearchIcon />
      </AppIconButton>
    </Paper>
  );
};

export default AppSearchInput;
