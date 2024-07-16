import {
  CartManagementDeleteParams,
  CartManagementGetParams,
  CartManagementPostParams
} from "@/types/cart.types";
import { OrderGetParams, OrderPostParams } from "@/types/order.types";

export const URLS = {
  auth: {
    signUp: "/auth/sign-up",
    signIn: "/auth/sign-in"
  },
  products: {
    get: "/v1/products",
    post: "/v1/products",
    put: "/v1/products",
    delete: "/v1/products"
  },
  orders: {
    getForUser: ({ userId }: OrderGetParams) => `/v1/users/${userId}/orders`,
    getForAdmin: "/v1/management/orders",
    post: (userId: OrderPostParams["userId"]) => `/v1/users/${userId}/orders`
  },
  cart: {
    get: ({ userId }: CartManagementGetParams) =>
      `/v1/users/${userId}/cart/items`,
    post: ({ userId, productId }: CartManagementPostParams) =>
      `/v1/users/${userId}/cart/${productId}`,
    delete: ({ userId, productId }: CartManagementDeleteParams) =>
      `/v1/users/${userId}/cart/items/${productId}`
  }
} as const;
