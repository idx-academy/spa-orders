import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import todoReducer from "@/store/slices/todoSlice"; //this reducer just for example
import { appApi } from "@/store/api/appApi";

export const store = configureStore({
  reducer: {
    todos: todoReducer, //this reducer just for example
    [appApi.reducerPath]: appApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
