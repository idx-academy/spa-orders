import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import { apiNames } from "@/store/constants";

export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_BASE_PATH,
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userDetails);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),
  reducerPath: apiNames.app,
  endpoints: () => ({})
});
