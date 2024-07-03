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
    get: "/v1/orders/user",
    post: "/v1/orders"
  }
} as const;
