const routes = {
  home: {
    path: "/"
  },
  products: {
    path: "/products"
  },
  any: {
    path: "*"
  }
} as const;

export default routes;
