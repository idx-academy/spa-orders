const routes = {
  home: {
    path: "/"
  },
  products: {
    path: "/products"
  },
  computers: {
    path: "/computers"
  },
  tablets: {
    path: "/tablets"
  },
  mobiles: {
    path: "/mobiles"
  },
  orders: {
    path: "/orders"
  },
  dashboard: {
    path: "/dashboard"
  },
  any: {
    path: "*"
  }
} as const;

export default routes;
