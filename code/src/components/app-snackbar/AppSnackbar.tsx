import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import AppTypography from "@/components/app-typography/AppTypography";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";

import "@/components/app-snackbar/AppSnackbar.scss";

const AppSnackbar = () => {
  const { isOpen, config, closeSnackbar } = useSnackbar();
  const { messageTranslationKey, variant } = config;

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={isOpen}
      onClose={closeSnackbar}
      className="spa-snackbar"
    >
      <Alert
        onClose={closeSnackbar}
        severity={variant}
        variant="filled"
        className="spa-snackbar__alert"
      >
        <AppTypography
          translationKey={messageTranslationKey}
          component="span"
        />
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
