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
  any: {
    path: "*"
  }
} as const;

export default routes;
