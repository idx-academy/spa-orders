import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

import { rtkQueryTagsArray } from "@/constants/api-tags";
import { apiNames } from "@/store/constants";
import { RootState } from "@/store/store";

export type SnackbarPayload = {
  isSnackbarHidden?: boolean;
};

type FetchBaseQueryErrorType = FetchBaseQueryError & SnackbarPayload;

type BaseQueryType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryErrorType
>;

const baseQuery: BaseQueryType = fetchBaseQuery({
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
  endpoints: () => ({}),
  tagTypes: rtkQueryTagsArray
});
