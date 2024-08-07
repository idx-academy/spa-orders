import { OrderId } from "@/types/order.types";

const routes = {
  home: {
    path: "/"
  },
  products: {
    path: "/products"
  },
  productDetails: {
    path: (productId = ":productId") => `/products/${productId}`
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
      },
      update: {
        path: (productId: string = ":productId") =>
          `/dashboard/products/${productId}/edit`
      },
      productDetails: {
        path: (productId: string = ":productId") =>
          `/dashboard/products/${productId}`
      }
    },
    users: {
      path: "/dashboard/users"
    },
    orderDetails: {
      path: (orderId: OrderId = ":orderId") => `/dashboard/orders/${orderId}`
    }
  },
  error: {
    notFound: {
      path: "/not-found"
    },
    unknown: {
      path: "/unknown"
    }
  },
  any: {
    path: "*"
  }
} as const;

export default routes;
