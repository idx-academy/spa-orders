import {
  Middleware,
  PayloadAction,
  isRejectedWithValue
} from "@reduxjs/toolkit";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

import { ERROR_MESSAGES_BY_STATUS_CODE } from "@/constants/common";
import { SnackbarPayload } from "@/store/api/appApi";
import cartApi from "@/store/api/cartApi";
import { openSnackbarWithTimeout } from "@/store/slices/snackbarSlice";
import { store } from "@/store/store";
import { APIError } from "@/types/common";

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
type StatusCode = keyof typeof ERROR_MESSAGES_BY_STATUS_CODE;

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

  // cart mutations errors are handled separately with custom messages and different logic
  const omittedMutations =
    cartApi.endpoints.addToCart.matchRejected(action) ||
    cartApi.endpoints.removeFromCart.matchRejected(action);

  if (omittedMutations) {
    return next(action);
  }

  const { data } = typedAction.payload;
  const status = data?.status as StatusCode;

  const errorMessageTranslationKey =
    ERROR_MESSAGES_BY_STATUS_CODE[status] ?? "errors.somethingWentWrong";

  store.dispatch(
    openSnackbarWithTimeout({
      messageTranslationKey: errorMessageTranslationKey
    })
  );

  return next(action);
};
