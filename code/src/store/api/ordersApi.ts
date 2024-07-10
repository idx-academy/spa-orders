import { URLS } from "@/constants/requests";
import { appApi } from "@/store/api/appApi";
import { OrderRequest, UserOrderResponse } from "@/types/order.types";
import createUrlPath from "@/utils/create-url-path/createUrlPath";

const ordersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<UserOrderResponse, OrderRequest>({
      query: ({ id }) => createUrlPath(URLS.orders.get, id)
    })
  })
});

export const { useGetOrdersQuery } = ordersApi;
