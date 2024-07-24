import {
  CartManagementDeleteParams,
  CartManagementGetParams,
  CartManagementPatchParams,
  CartManagementPostParams
} from "@/types/cart.types";
import {
  GetAdminOrderParams,
  GetUserOrderParams,
  OrderPatchParams,
  OrderPostParams
} from "@/types/order.types";
import { GetManagerProductsParams } from "@/types/product.types";
import createUrlPath from "@/utils/create-url-path/createUrlPath";

export const URLS = {
  auth: {
    signUp: "/auth/sign-up",
    signIn: "/auth/sign-in"
  },
  products: {
    getForUser: "/v1/products",
    getForManager: (params: GetManagerProductsParams) =>
      createUrlPath(`/v1/management/products`, undefined, params),
    post: "/v1/management/products",
    put: "/v1/products",
    delete: "/v1/products"
  },
  orders: {
    getForUser: ({ userId, lang }: GetUserOrderParams) =>
      `/v1/users/${userId}/orders?lang=${lang}`,
    getForAdmin: (queryParams: GetAdminOrderParams) =>
      createUrlPath("/v1/management/orders", undefined, queryParams),
    post: ({ userId }: Pick<OrderPostParams, "userId">) =>
      `/v1/users/${userId}/orders`,
    patch: ({ orderId }: Pick<OrderPatchParams, "orderId">) =>
      `/v1/orders/${orderId}/status`
  },
  cart: {
    get: ({ userId, lang }: CartManagementGetParams) =>
      `/v1/users/${userId}/cart/items?lang=${lang}`,
    post: ({ userId, productId }: CartManagementPostParams) =>
      `/v1/users/${userId}/cart/${productId}`,
    delete: ({ userId, productId }: CartManagementDeleteParams) =>
      `/v1/users/${userId}/cart/items/${productId}`,
    patchQuantity: ({
      userId,
      productId,
      quantity
    }: CartManagementPatchParams) =>
      `/v1/users/${userId}/cart/${productId}/setquantity?quantity=${quantity}`
  }
} as const;
