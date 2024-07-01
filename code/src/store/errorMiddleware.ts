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
import { BaseQueryApi } from "@reduxjs/toolkit/query";

type ErrorPayload = {
  status: number;
  data: APIError;
};

type ErrorActionMeta = {
  arg: {
    type: BaseQueryApi["type"];
  };
};

type ErrorActionPayload = ErrorPayload & SnackbarPayload;
type ErrorAction = PayloadAction<
  ErrorActionPayload,
  string,
  Partial<ErrorActionMeta>
>;
type StatusCode = keyof typeof ERROR_MESSAGES_BY_STATUS;

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (!isRejectedWithValue(action)) {
    return next(action);
  }

  const typedAction = action as ErrorAction;

  if (typedAction.payload.isSnackbarHidden) {
    return next(action);
  }

  // queries are not triggering a snackbar if isSnackbarHidden is not specified
  if (
    typedAction.payload.isSnackbarHidden === undefined &&
    typedAction.meta?.arg?.type === "query"
  ) {
    return next(action);
  }

  const { data } = typedAction.payload;
  const status = data?.status as StatusCode;

  const errorMessage =
    ERROR_MESSAGES_BY_STATUS[status] ??
    "Something went wrong. Please try again later";

  store.dispatch(
    openSnackbarWithTimeout({
      message: errorMessage
    })
  );

  return next(action);
};
