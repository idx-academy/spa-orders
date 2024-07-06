import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import routePaths from "@/constants/routes";

const OrdersPage = lazy(() => import("@/pages/orders/OrdersPage"));

const protectedRoutes: RouteObject[] = [
  { path: routePaths.orders.path, element: <OrdersPage /> }
];

export default protectedRoutes;
