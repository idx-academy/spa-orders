import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import DashboardLayout from "@/layouts/dashboard-layout/DashboardLayout";

import { ROLES } from "@/constants/common";
import routePaths from "@/constants/routes";
import ProtectedRoute from "@/routes/protected-route/ProtectedRoute";

const OrdersPage = lazy(() => import("@/pages/orders/OrdersPage"));
const CartPage = lazy(() => import("@/pages/cart/CartPage"));
const DashboardOrdersPage = lazy(
  () => import("@/pages/dashboard/dashboard-orders/DashboardOrdersPage")
);
const DashboardProductsPage = lazy(
  () => import("@/pages/dashboard/dashboard-products/DashboardProductsPage")
);
const DashboardUsersPage = lazy(
  () => import("@/pages/dashboard/dashboard-users/DashboardUsersPage")
);
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const DashboardNewProductPage = lazy(
  () =>
    import("@/pages/dashboard/dashboard-new-product/DashboardNewProductPage")
);

const protectedRoutes: RouteObject[] = [
  {
    path: routePaths.orders.path,
    element: (
      <ProtectedRoute
        element={<OrdersPage />}
        allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.SHOP_MANAGER]}
      />
    )
  },
  {
    path: routePaths.dashboard.path,
    element: (
      <ProtectedRoute
        element={<DashboardLayout />}
        allowedRoles={[ROLES.ADMIN, ROLES.SHOP_MANAGER]}
      />
    ),
    children: [
      {
        element: <DashboardPage />,
        index: true
      },
      {
        path: routePaths.dashboard.orders.path,
        element: <DashboardOrdersPage />
      },
      {
        path: routePaths.dashboard.products.path,
        element: <DashboardProductsPage />
      },
      {
        path: routePaths.dashboard.users.path,
        element: <DashboardUsersPage />
      },
      {
        path: routePaths.dashboard.products.new.path,
        element: <DashboardNewProductPage />
      }
    ]
  },
  {
    path: routePaths.cart.path,
    element: (
      <ProtectedRoute
        element={<CartPage />}
        allowedRoles={[ROLES.ADMIN, ROLES.SHOP_MANAGER, ROLES.USER]}
      />
    )
  }
];

export default protectedRoutes;
