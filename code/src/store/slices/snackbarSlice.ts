import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sliceNames } from "@/store/constants";
import { useAppSelector } from "@/hooks/use-redux/useRedux";
import {
  BaseSnackbarConfig,
  SnackbarConfigWithTimeout
} from "@/types/snackbar.types";
import { AppDispatch } from "@/store/store";

const DEFAULT_AUTOHIDE_DURATION = 3000;

type SnackbarState = {
  isOpen: boolean;
  config: BaseSnackbarConfig;
  _timerId: ReturnType<typeof setTimeout> | null;
};

const initialState: SnackbarState = {
  isOpen: false,
  config: {} as BaseSnackbarConfig,
  _timerId: null
};

const snackbarSlice = createSlice({
  name: sliceNames.products,
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<BaseSnackbarConfig>) => {
      state.isOpen = true;
      state.config = action.payload;
      if (state._timerId) {
        clearTimeout(state._timerId);
        state._timerId = null;
      }
    },
    closeSnackbar: (state) => {
      state.isOpen = false;
      if (state._timerId) {
        clearTimeout(state._timerId);
        state._timerId = null;
      }
    },
    setSnackbarTimerId: (
      state,
      action: PayloadAction<ReturnType<typeof setTimeout>>
    ) => {
      state._timerId = action.payload;
    }
  }
});

export const { closeSnackbar, openSnackbar } = snackbarSlice.actions;

export const openSnackbarWithTimeout =
  (config: SnackbarConfigWithTimeout) => (dispatch: AppDispatch) => {
    dispatch(openSnackbar(config));

    const timerId = setTimeout(() => {
      dispatch(closeSnackbar());
    }, config.autohideDuration ?? DEFAULT_AUTOHIDE_DURATION);

    dispatch(snackbarSlice.actions.setSnackbarTimerId(timerId));
  };

export const useIsSnackbarOpenSelector = () =>
  useAppSelector((store) => store.snackbar.isOpen);
export const useSnackbarConfigSelector = () =>
  useAppSelector((store) => store.snackbar.config);

export default snackbarSlice.reducer;
