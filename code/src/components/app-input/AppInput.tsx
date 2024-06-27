import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AppIconButton from "../app-icon-button/AppIconButton";
import AppBox from "../app-box/AppBox";

import "@/components/app-input/AppInput.scss";

type InputVariant = "search" | "regular";

type AppInputProps = Omit<TextFieldProps, "variant"> & {
  variant?: InputVariant;
  onClear?: () => void;
  onSearch?: () => void;
};

const AppInput = ({
  variant = "regular",
  onSearch,
  onClear,
  value,
  ...props
}: AppInputProps) => {
  const startAdornment =
    variant === "search" ? (
      <InputAdornment
        position="start"
        // className={!value ? "spa-input__clear-icon" : ""}
      >
        <AppIconButton onClick={onClear}>
          <ClearIcon fontSize="small" />
        </AppIconButton>
      </InputAdornment>
    ) : null;

  const endAdornment =
    variant === "search" ? (
      <InputAdornment position="end">
        <AppIconButton
          onClick={onSearch}
          size="small"
          className="spa-input__icon-search-button"
        >
          <SearchIcon />
        </AppIconButton>
      </InputAdornment>
    ) : null;

  return (
    <AppBox className="spa-input">
      <TextField
        className={variant === "search" ? "spa-input__search-text-field" : ""}
        value={value}
        InputProps={{
          startAdornment: value ? startAdornment : undefined,
          endAdornment
        }}
        size="small"
        {...props}
        fullWidth
      />
    </AppBox>
  );
};

export default AppInput;
