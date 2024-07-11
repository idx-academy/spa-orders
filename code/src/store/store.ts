import { setupListeners } from "@reduxjs/toolkit/query/react";

import { configureStore } from "@reduxjs/toolkit";
import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

import { appApi } from "@/store/api/appApi";
import { errorMiddleware } from "@/store/errorMiddleware";
import { reducer } from "@/store/reducer";

const middleware = <State>(
  getDefaultMiddleware: GetDefaultMiddleware<State>
) => {
  return getDefaultMiddleware()
    .concat(appApi.middleware)
    .concat(errorMiddleware);
};

export const store = configureStore({
  reducer,
  middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
