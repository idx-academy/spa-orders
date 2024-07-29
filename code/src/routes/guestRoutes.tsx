import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import routePaths from "@/constants/routes";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const ProductDetailsPage = lazy(
  () => import("@/pages/product-details/ProductDetailsPage")
);

const guestRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: routePaths.products.path, element: <ProductsPage /> },
  { path: routePaths.productDetails.path(), element: <ProductDetailsPage /> }
];

export default guestRoutes;
