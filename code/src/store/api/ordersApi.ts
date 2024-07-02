import { appApi } from "@/store/api/appApi";

import { URLS } from "@/constants/requests";

import { OrderResponse } from "@/types/order.types";
import { createUrlPath } from "@/utils/createUrlPath";

type userId = {
  id: string;
};
const ordersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<OrderResponse, userId>({
      query: ({ id }) => createUrlPath(URLS.orders.get, id)
    })
  })
});

export const { useGetOrdersQuery } = ordersApi;
