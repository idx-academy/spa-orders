export const URLS = {
  auth: {
    signUp: "/auth/sign-up",
    signIn: "/auth/sign-in"
  },
  products: {
    get: "/products",
    post: "/products",
    put: "/products",
    delete: "/products"
  },
  orders: {
    get: "/orders/user",
    post: "/orders"
  }
} as const;
