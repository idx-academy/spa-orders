import { CartManagementParams } from "@/types/cart.types";
import { OrderParams } from "@/types/order.types";

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
    getForUser: ({ userId }: OrderParams) => `/v1/users/${userId}/orders`,
    getForAdmin: "/v1/management/orders",
    post: "/v1/orders"
  },
  cart: {
    post: ({ userId, productId }: CartManagementParams) =>
      `/v1/users/${userId}/cart/${productId}`,
    delete: ({ userId, productId }: CartManagementParams) =>
      `/v1/users/${userId}/cart/items/${productId}`
  }
} as const;
