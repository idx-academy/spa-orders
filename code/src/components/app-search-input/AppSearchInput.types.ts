import { InputBaseProps } from "@mui/material/InputBase";

export type AppSearchInputProps = InputBaseProps & {
  onSearch?: () => void;
  onClear?: () => void;
};
