import { apiNames } from "@/store/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/", // example url
    credentials: "include"
  }),
  reducerPath: apiNames.app,
  endpoints: () => ({})
});
