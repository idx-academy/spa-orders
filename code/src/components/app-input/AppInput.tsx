import { TextField, TextFieldProps } from "@mui/material";
import AppBox from "@/components/app-box/AppBox";

type AppInputProps = TextFieldProps;

const AppInput = ({ value, ...props }: AppInputProps) => {
  return (
    <AppBox>
      <TextField value={value} size="small" {...props} fullWidth />
    </AppBox>
  );
};

export default AppInput;
