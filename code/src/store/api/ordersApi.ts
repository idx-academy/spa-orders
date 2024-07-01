import { appApi } from "@/store/api/appApi";
import { URLS } from "@/constants/requests";
import { OrderRequest, OrderResponse } from "@/types/order.types";
import { createUrlPath } from "@/utils/createUrlPath";

const ordersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<OrderResponse, OrderRequest>({
      query: ({ id }) => createUrlPath(URLS.orders.get, id)
    })
  })
});

export const { useGetOrdersQuery } = ordersApi;
