import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import {
  AdminOrderResponse,
  OrderGetParams,
  UserOrderResponse
} from "@/types/order.types";

const ordersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getUserOrders: build.query<UserOrderResponse, OrderGetParams>({
      query: ({ userId }) => URLS.orders.getForUser({ userId })
    }),
    getAdminOrders: build.query<AdminOrderResponse, void>({
      query: () => URLS.orders.getForAdmin
    })
  })
});

export const { useGetUserOrdersQuery, useGetAdminOrdersQuery } = ordersApi;
