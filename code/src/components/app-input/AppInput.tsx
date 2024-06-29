import TextField from "@mui/material/TextField";
import AppBox from "@/components/app-box/AppBox";
import { AppInputProps } from "@/components/app-input/AppInput.types";

const AppInput = (props: AppInputProps) => {
  return (
    <AppBox>
      <TextField size="small" {...props} />
    </AppBox>
  );
};

export default AppInput;
