export const URLS = {
  products: {
    get: "/products",
    post: "/products",
    put: "/products",
    delete: "/products"
  },
  auth: {
    signUp: "/auth/sign-up",
    signIn: "/auth/sign-in"
  }
} as const;
