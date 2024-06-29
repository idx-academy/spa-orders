import {
  isRejectedWithValue,
  Middleware,
  PayloadAction
} from "@reduxjs/toolkit";
import { store } from "@/store/store";
import { openSnackbarWithTimeout } from "@/store/slices/snackbarSlice";
import { APIError } from "@/types/common";
import { ERROR_MESSAGES_BY_STATUS } from "@/constants/common";
import { SnackbarPayload } from "@/store/api/appApi";

type ErrorPayload = {
  status: number;
  data: APIError;
};

type ErrorActionPayload = PayloadAction<ErrorPayload & SnackbarPayload>;
type StatusCode = keyof typeof ERROR_MESSAGES_BY_STATUS;

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const typedAction = action as ErrorActionPayload;

    if (typedAction.payload.isSnackbarHidden) {
      return next(action);
    }

    const { data } = typedAction.payload;
    const status = data.status as StatusCode;

    const errorMessage =
      ERROR_MESSAGES_BY_STATUS[status] ??
      "Something went wrong. Please try again later";

    store.dispatch(
      openSnackbarWithTimeout({
        message: errorMessage
      })
    );
  }

  return next(action);
};
