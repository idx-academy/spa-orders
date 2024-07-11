import { combineReducers } from "@reduxjs/toolkit";

import { appApi } from "@/store/api/appApi";
import snackbarReducer from "@/store/slices/snackbarSlice";
import userReducer from "@/store/slices/userSlice";

export const reducer = combineReducers({
  snackbar: snackbarReducer,
  user: userReducer,
  [appApi.reducerPath]: appApi.reducer
});
