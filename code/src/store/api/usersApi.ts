import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import {
  GetUsersForAdminParams,
  GetUsersForAdminResponse
} from "@/types/user.types";

const usersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersForAdminDashboard: build.query<
      GetUsersForAdminResponse,
      GetUsersForAdminParams
    >({
      query: (params) => URLS.users.getForAdmin(params)
    })
  })
});

export const { useGetUsersForAdminDashboardQuery } = usersApi;
