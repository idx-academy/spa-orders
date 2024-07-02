import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import routePaths from "@/constants/routes";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));

const guestRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: routePaths.products.path, element: <ProductsPage /> }
];

export default guestRoutes;
