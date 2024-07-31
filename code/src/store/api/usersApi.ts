import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import { GetUsersForAdminResponse } from "@/types/user.types";

const usersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersForAdminDashboard: build.query<GetUsersForAdminResponse, void>({
      query: () => URLS.users.getForAdmin
    })
  })
});

export const { useGetUsersForAdminDashboardQuery } = usersApi;
