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
    path: "/products?category=computer"
  },
  tablets: {
    path: "/products?category=tablet"
  },
  mobiles: {
    path: "/products?category=mobile"
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
