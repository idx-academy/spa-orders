import { TextField, TextFieldProps } from "@mui/material";
import AppBox from "@/components/app-box/AppBox";

type AppInputProps = TextFieldProps & {
  onClear?: () => void;
  onSearch?: () => void;
};

const AppInput = ({ onSearch, onClear, value, ...props }: AppInputProps) => {
  return (
    <AppBox>
      <TextField value={value} size="small" {...props} fullWidth />
    </AppBox>
  );
};

export default AppInput;
