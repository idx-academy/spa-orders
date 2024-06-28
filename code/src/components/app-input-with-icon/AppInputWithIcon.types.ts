import { InputBaseProps } from "@mui/material";


export type InputWithIconProps = InputBaseProps & {
    onSearch?: () => void;
    onClear?: () => void;
  };