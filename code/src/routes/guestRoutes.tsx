import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import routePaths from "@/constants/routes";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const CartPage = lazy(() => import("@/pages/cart/CartPage"));

const guestRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: routePaths.products.path, element: <ProductsPage /> },
  { path: routePaths.cart.path, element: <CartPage /> }
];

export default guestRoutes;
