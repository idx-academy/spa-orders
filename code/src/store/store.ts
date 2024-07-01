import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import snackbarReducer from "@/store/slices/snackbarSlice";
import userReducer from "@/store/slices/userSlice";
import { appApi } from "@/store/api/appApi";
import { errorMiddleware } from "@/store/errorMiddleware";
import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const middleware = <State>(
  getDefaultMiddleware: GetDefaultMiddleware<State>
) => {
  return getDefaultMiddleware()
    .concat(appApi.middleware)
    .concat(errorMiddleware);
};

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    user: userReducer,
    [appApi.reducerPath]: appApi.reducer
  },
  middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
