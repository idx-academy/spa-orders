import { InputBaseProps } from "@mui/material/InputBase";

export type InputWithIconProps = InputBaseProps & {
  onSearch?: () => void;
  onClear?: () => void;
};
