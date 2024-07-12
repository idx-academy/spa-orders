import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { ROLES } from "@/constants/common";
import routePaths from "@/constants/routes";
import ProtectedRoute from "@/routes/protected-route/ProtectedRoute";

const OrdersPage = lazy(() => import("@/pages/orders/OrdersPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const CartPage = lazy(() => import("@/pages/cart/CartPage"));

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
        element={<DashboardPage />}
        allowedRoles={[ROLES.ADMIN, ROLES.SHOP_MANAGER]}
      />
    )
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
