import { apiNames } from "@/store/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    // credentials: "include"   to avoid cors errors for mock backend
  }),
  reducerPath: apiNames.app,
  endpoints: () => ({})
});
