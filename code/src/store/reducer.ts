import { combineReducers } from "@reduxjs/toolkit";

import snackbarReducer from "@/store/slices/snackbarSlice";
import userReducer from "@/store/slices/userSlice";

import { appApi } from "@/store/api/appApi";

export const reducer = combineReducers({
  snackbar: snackbarReducer,
  user: userReducer,
  [appApi.reducerPath]: appApi.reducer
});
