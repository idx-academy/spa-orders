import { TextFieldProps } from "@mui/material/TextField";

export type AppInputProps = Omit<TextFieldProps, "label"> & {
  labelTranslationKey?: string;
};
