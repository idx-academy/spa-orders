import { httpMethods } from "@/constants/methods";
import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import {
  AdminOrderResponse,
  OrderGetParams,
  OrderPostParams,
  OrderPostResponse,
  UserOrderResponse
} from "@/types/order.types";

const ordersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getUserOrders: build.query<UserOrderResponse, OrderGetParams>({
      query: ({ userId }) => URLS.orders.getForUser({ userId })
    }),
    getAdminOrders: build.query<AdminOrderResponse, void>({
      query: () => URLS.orders.getForAdmin
    }),
    createOrder: build.mutation<OrderPostResponse, OrderPostParams>({
      query: ({ userId, ...body }) => ({
        url: URLS.orders.post(userId),
        method: httpMethods.post,
        body: body
      })
    })
  })
});

export const {
  useGetUserOrdersQuery,
  useGetAdminOrdersQuery,
  useCreateOrderMutation
} = ordersApi;
