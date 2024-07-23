const routes = {
  home: {
    path: "/"
  },
  products: {
    path: "/products"
  },
  cart: {
    path: "/cart"
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
    path: "/dashboard",
    orders: {
      path: "/dashboard/orders"
    },
    products: {
      path: "/dashboard/products",
      new: {
        path: "/dashboard/products/new"
      }
    },
    users: {
      path: "/dashboard/users"
    }
  },
  any: {
    path: "*"
  }
} as const;

export default routes;
