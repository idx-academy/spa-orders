import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/routes/protected-route/ProtectedRoute";
import routePaths from "@/constants/routes";
import { ROLES } from "@/constants/common";

const OrdersPage = lazy(() => import("@/pages/orders/OrdersPage"));

const protectedRoutes: RouteObject[] = [
  {
    path: routePaths.orders.path,
    element: (
      <ProtectedRoute element={<OrdersPage />} allowedRoles={[ROLES.USER]} />
    )
  }
];

export default protectedRoutes;
