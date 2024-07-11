import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { useAppSelector } from "@/hooks/use-redux/useRedux";
import { sliceNames } from "@/store/constants";
import { AppDispatch } from "@/store/store";
import { TimerId } from "@/types/common";
import {
  BaseSnackbarConfig,
  SnackbarConfigWithTimeout,
  SnackbarVariant
} from "@/types/snackbar.types";

const DEFAULT_AUTOHIDE_DURATION = 3000;
const DEFAULT_VARIANT: SnackbarVariant = "error";

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
      snackbarSlice.caseReducers._clearTimeout(state);
      state.isOpen = true;

      state.config = { variant: DEFAULT_VARIANT, ...action.payload };
    },
    closeSnackbar: (state) => {
      snackbarSlice.caseReducers._clearTimeout(state);
      state.isOpen = false;
    },
    _setSnackbarTimerId: (state, action: PayloadAction<TimerId>) => {
      state._timerId = action.payload;
    },
    _clearTimeout: (state) => {
      if (state._timerId) {
        clearTimeout(state._timerId);
        delete state._timerId;
      }
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
