import { AlertColor } from "@mui/material/Alert";

export type SnackbarVariant = Extract<AlertColor, "success" | "error">;

export type BaseSnackbarConfig = {
  messageTranslationKey: string;
  variant?: SnackbarVariant;
};

export type SnackbarConfigWithTimeout = BaseSnackbarConfig & {
  autohideDuration?: number;
};
