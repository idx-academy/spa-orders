import { TextField, TextFieldProps } from "@mui/material";
import AppBox from "@/components/app-box/AppBox";
import { AppInputProps } from "@/components/app-input/AppInput.types";

const AppInput = (props: AppInputProps) => {
  return (
    <AppBox>
      <TextField
        {...props}
        size="small"
        {...props}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "red"
            }
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "red"
            }
          }
        }}
      />
    </AppBox>
  );
};

export default AppInput;
