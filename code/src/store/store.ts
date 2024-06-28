import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import snackbarReducer from "@/store/slices/snackbarSlice";
import { appApi } from "@/store/api/appApi";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    [appApi.reducerPath]: appApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
