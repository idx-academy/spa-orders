import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { apiNames } from "@/store/constants";
import { RootState } from "@/store/store";

export type SnackbarPayload = {
  isSnackbarHidden?: boolean;
};

type CustomFetchBaseQueryError = FetchBaseQueryError & SnackbarPayload;

type CustomBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  CustomFetchBaseQueryError
>;

const baseQuery: CustomBaseQuery = fetchBaseQuery({
  baseUrl: process.env.API_BASE_PATH,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const userDetails = state.user.userDetails;

    if (userDetails !== null) {
      headers.set("Authorization", `Bearer ${userDetails.token}`);
    }

    return headers;
  }
});

export const appApi = createApi({
  baseQuery,
  reducerPath: apiNames.app,
  endpoints: () => ({})
});
