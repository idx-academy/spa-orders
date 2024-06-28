import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";

import "@/components/app-snackbar/AppSnackbar.scss";

const AppSnackbar = () => {
  const { isOpen, config, closeSnackbar } = useSnackbar();
  const { message, variant } = config;

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
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
