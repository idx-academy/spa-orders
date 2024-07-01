import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import { apiNames } from "@/store/constants";

export type SnackbarPayload = {
  isSnackbarHidden?: boolean;
};

type CustomFetchBaseQueryError = FetchBaseQueryError & SnackbarPayload;

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  CustomFetchBaseQueryError
> = fetchBaseQuery({
  baseUrl: process.env.API_BASE_PATH,
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userDetails);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }
});

export const appApi = createApi({
  baseQuery,
  reducerPath: apiNames.app,
  endpoints: () => ({})
});
