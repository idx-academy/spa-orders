const routes = {
  home: {
    path: "/"
  },
  products: {
    path: "/products",
    route: "products"
  },
  any: {
    path: "*"
  }
} as const;

export default routes;
