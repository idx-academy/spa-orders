import { RouteObject } from "react-router-dom";
import { lazy } from "react";

import RootLayout from "@/layouts/root-layout/RootLayout";

import routePaths from "@/constants/routes";

const OrdersPage = lazy(() => import("@/pages/orders/OrdersPage"));
const ErrorPage = lazy(() => import("@/pages/error/ErrorPage"));
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));

const routes: RouteObject[] = [
  {
    path: routePaths.home.path,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: routePaths.products.path, element: <ProductsPage /> },
          { path: routePaths.orders.path, element: <OrdersPage /> }
        ]
      }
    ]
  },
  {
    path: routePaths.any.path,
    element: <NotFoundPage />
  }
];

export default routes;
