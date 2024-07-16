import { rtkQueryTags } from "@/constants/api-tags";
import { httpMethods } from "@/constants/methods";
import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import {
  AdminOrderResponse,
  GetAdminOrderParams,
  GetUserOrderParams,
  OrderPatchParams,
  OrderPostParams,
  OrderPostResponse,
  UserOrderResponse
} from "@/types/order.types";

const ordersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getUserOrders: build.query<UserOrderResponse, GetUserOrderParams>({
      query: ({ userId }) => URLS.orders.getForUser({ userId })
    }),
    getAdminOrders: build.query<AdminOrderResponse, GetAdminOrderParams>({
      query: (filters) => URLS.orders.getForAdmin(filters)
    }),
    createOrder: build.mutation<OrderPostResponse, OrderPostParams>({
      query: ({ userId, ...body }) => ({
        url: URLS.orders.post({ userId }),
        method: httpMethods.post,
        body: body
      }),
      invalidatesTags: [
        rtkQueryTags.CART,
        rtkQueryTags.ADMIN_ORDERS,
        rtkQueryTags.USER_ORDERS
      ]
    }),
    changeOrderStatus: build.mutation<void, OrderPatchParams>({
      query: ({ orderStatus, ...params }) => ({
        url: URLS.orders.patch(params),
        method: httpMethods.patch,
        params: { orderStatus }
      }),
      invalidatesTags: [rtkQueryTags.ADMIN_ORDERS]
    })
  })
});

export const {
  useGetUserOrdersQuery,
  useGetAdminOrdersQuery,
  useCreateOrderMutation,
  useChangeOrderStatusMutation
} = ordersApi;
