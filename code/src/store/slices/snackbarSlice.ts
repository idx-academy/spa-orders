import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sliceNames } from "@/store/constants";
import { useAppSelector } from "@/hooks/use-redux/useRedux";
import { TimerId } from "@/types/common";
import {
  BaseSnackbarConfig,
  SnackbarConfigWithTimeout
} from "@/types/snackbar.types";
import { AppDispatch } from "@/store/store";

const DEFAULT_AUTOHIDE_DURATION = 3000;

type SnackbarState = {
  isOpen: boolean;
  config: BaseSnackbarConfig;
  _timerId?: TimerId;
};

const initialState: SnackbarState = {
  isOpen: false,
  config: {} as BaseSnackbarConfig
};

const snackbarSlice = createSlice({
  name: sliceNames.snackbar,
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<BaseSnackbarConfig>) => {
      state.isOpen = true;
      state.config = action.payload;
      if (state._timerId) {
        clearTimeout(state._timerId);
        delete state._timerId;
      }
    },
    closeSnackbar: (state) => {
      state.isOpen = false;
      if (state._timerId) {
        clearTimeout(state._timerId);
        delete state._timerId;
      }
    },
    _setSnackbarTimerId: (state, action: PayloadAction<TimerId>) => {
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

    const setSnackbarTimerId = snackbarSlice.actions._setSnackbarTimerId;
    dispatch(setSnackbarTimerId(timerId));
  };

export const useIsSnackbarOpenSelector = () =>
  useAppSelector((store) => store.snackbar.isOpen);
export const useSnackbarConfigSelector = () =>
  useAppSelector((store) => store.snackbar.config);

export default snackbarSlice.reducer;
