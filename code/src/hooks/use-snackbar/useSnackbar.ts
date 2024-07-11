import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import {
  closeSnackbar as closeSnackbarAction,
  openSnackbar as openSnackbarAction,
  openSnackbarWithTimeout as openSnackbarWithTimeoutAction,
  useIsSnackbarOpenSelector,
  useSnackbarConfigSelector
} from "@/store/slices/snackbarSlice";
import {
  BaseSnackbarConfig,
  SnackbarConfigWithTimeout
} from "@/types/snackbar.types";

const useSnackbar = () => {
  const isOpen = useIsSnackbarOpenSelector();
  const config = useSnackbarConfigSelector();
  const dispatch = useAppDispatch();

  const openSnackbar = (config: BaseSnackbarConfig) => {
    dispatch(openSnackbarAction(config));
  };

  const openSnackbarWithTimeout = (config: SnackbarConfigWithTimeout) => {
    dispatch(openSnackbarWithTimeoutAction(config));
  };

  const closeSnackbar = () => {
    dispatch(closeSnackbarAction());
  };

  return {
    isOpen,
    config,
    openSnackbar,
    openSnackbarWithTimeout,
    closeSnackbar
  } as const;
};

export default useSnackbar;
